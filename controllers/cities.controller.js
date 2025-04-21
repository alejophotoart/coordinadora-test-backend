const { response, request } = require("express");
const { where, fn, col, Op } = require("sequelize");

const redisClient = require("../utils/redis");
const { City, State, Country } = require("../models");

const cities = async (req = request, res = response) => {
    
    const { limit = 5, since = 0 } = req.query

    const cacheKey = `cities:since:${since}-limit:${limit}`;
    const cachedStatus = JSON.parse(await redisClient.get(cacheKey));

    if (cachedStatus) {
        return res.status(200).json({
            cities: cachedStatus,
            source: 'redis'
        })
    }
    
    const cities = await City.findAll({
        offset: Number(since), // Desde que registro quiere que se muestra
        limit: Number(limit), // La cantidad que se va a mostrar desde el registro indicado
        order: [['name', 'ASC']],
        include: [
            {
                model: State,
                as: 'state',
                attributes: ['id', 'name'],
                include: [
                    {
                        model: Country,
                        as: 'country',
                        attributes: ['id', 'name']
                    }
                ]
            }
        ]
    })

    await redisClient.set(cacheKey, JSON.stringify(cities), {EX: 120});

    return res.status(200).json({
        cities: JSON.parse(await redisClient.get(cacheKey)),
        source: 'db'
    })
}

const searchCity = async ( req = request, res = response ) => {

    try {
        const { city } = req.params

        const cacheKey = `city:${city}`;
        const cachedCities = JSON.parse(await redisClient.get(cacheKey));
    
        if (cachedCities) {
            return res.status(200).json({
                total: cachedCities.length,
                cities: cachedCities,
                source: 'redis'
            })
        }
    
        const cities = await City.findAll({
            where: where(
                fn('UPPER', col('City.name')),
                {
                    [Op.like]: `%${city.toUpperCase()}%`
                }
            ),
            order: [['name', 'ASC']],
            include: [
                {
                    model: State,
                    as: 'state',
                    attributes: ['id', 'name']
                }
            ]
        })

        await redisClient.set(cacheKey, JSON.stringify(cities), {EX: 120});

        return res.status(200).json({
            total: cities.length,
            cities: JSON.parse(await redisClient.get(cacheKey)),
            source: 'db'
        })

    } catch (error) {

        console.error(error);
        res.status(500).json({ msg: 'Error al buscar ciudades' });
        
    }
}

module.exports = {
    cities,
    searchCity
}
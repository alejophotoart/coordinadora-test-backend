const { request, response } = require("express");
const { Trail, TrailCarrier, Carrier, City, Order } = require("../models");
const { Op } = require("sequelize");

const trails = async (req = request, res = response) => {
    
    const { limit = 5, since = 0 } = req.query
    
    // Ejecutar peticiones a DB de manera simultanea
    const [ total, trails ] = await Promise.all([
        Trail.count(),
        Trail.findAll({
            offset: Number(since), // Desde que registro quiere que se muestra
            limit: Number(limit), // La cantidad que se va a mostrar desde el registro indicado
            order: [['createdAt', 'DESC']], // Ordenar por orden de creacion
            include: [
                {
                    model: City,
                    as: "originCity",
                    attributes: ['name']
                },
                {
                    model: City,
                    as: "destinationCity",
                    attributes: ['name']
                }
            ]
        }) 
    ])

    res.status(200).json({
        total,
        trails
    })
}

const createTrail = async(req = request, res = response) => {

    const { originCityId, destinationCityId, nameTrail } = req.body

    try {

        const routeExists = await Trail.findOne({ 
            where: {
                originCityId: originCityId,
                destinationCityId: destinationCityId
            }
        })
        
        if (routeExists) {
            return res.status(400).json({
                msg: "Esta ruta ya existe"
            })
        }
        
        const trail = Trail.build({
            nameTrail,
            originCityId,
            destinationCityId
        })

        await trail.save()

        return res.status(201).json({
            msg: "Ruta creada exitosamente"
        })

    } catch (error) {
        console.error(error);
        throw new Error("Ocurrio un error al momento de registrar");   
    }
}

const assignCarrierToTrail = async( req = request, res = response ) => {
    
    const { carriers } = req.body
    const { trailId } = req.params

    for (const carrierId of carriers) {

        const carrier = await Carrier.findByPk(carrierId)
        
        await TrailCarrier.create({
            trailId,
            carrierId
        })

        await carrier.update({
            available: false
        })
    }

    res.status(201).json({
        msg: "Transportista asignados correctarmente a la ruta"
    })
}

const deleteCarrierToTrail = async( req = request, res = response ) => {
    
    const { carriers } = req.body
    const { trailId } = req.params

    for (const carrierId of carriers) {

        const carrier = await Carrier.findByPk(carrierId)

        /**
         * Se procede a buscar ese Transportista en dicha ruta en la tabla de ordenes
         * para saber si ya las termino de entregarlas todas y asi sacarlo de esa ruta
         * 
         * Si la respuesta es vacia, significa que ya las entrego todas en esa ruta y se puede sacar de la ruta
         */

        const orders = await Order.findAll({
            where: {
                trailId,
                carrierId,
                orderStatusId: {
                    [Op.ne]: 3
                }
            }
        })

        if (orders) {            
            return res.status(401).json({
                msg: `El transportista ${ carrier.fullName } tiene aun ordenes pendientes, no puedes sacarlo de esta ruta`
            })
        }
        
        await TrailCarrier.destroy({
            where: {
                trailId,
                carrierId
            }
        })

        await carrier.update({
            available: true
        })
    }

    res.status(201).json({
        msg: "Sacaste al transportista de esta ruta"
    })
}

module.exports = {
    trails,
    createTrail,
    assignCarrierToTrail,
    deleteCarrierToTrail
}
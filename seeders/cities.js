require('dotenv').config();
const sequelize = require('../database/sequelize');

const { City } = require('../models');

const seedCities = async() => {
    
    try {
        await sequelize.authenticate();

        const cities = require('../data/cities.json');
        
        for (const city of cities) {
            
            const { name, stateId } = city
            await City.findOrCreate({
                where: { name },
                defaults: { stateId }
            });
        }

        console.log('Ciudades insertados correctamente');
        
    } catch (error) {

        console.error('Error al insertar paises:', error);
        process.exit(1);
    } finally {
        
        await sequelize.close();
        console.log('Conexión terminada.');
        process.exit();
    }
}

seedCities();
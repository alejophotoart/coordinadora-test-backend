require('dotenv').config();
const sequelize = require('../database/sequelize');

const { Country } = require('../models');

const seedCountries = async() => {
    
    try {
        await sequelize.authenticate();

        const countries = require('../data/countries.json');
        
        for (const country of countries) {

            const { name, flagUrl } = country
            
            await Country.findOrCreate({
                where: { name },
                defaults: { flagUrl }
            });
        }

        console.log('Paises insertados correctamente');
        
    } catch (error) {

        console.error('Error al insertar paises:', error);
        process.exit(1);
    } finally {
        
        await sequelize.close();
        console.log('Conexión terminada.');
        process.exit();
    }
}

seedCountries();
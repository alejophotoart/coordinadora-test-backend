require('dotenv').config();
const sequelize = require('../database/sequelize');

const { State } = require('../models');

const seedStates = async() => {
    
    try {
        await sequelize.authenticate();

        const states = require('../data/states.json');
        
        for (const state of states) {

            const { name, countryId } = state
            await State.findOrCreate({
                where: { name },
                defaults: { countryId }
            });
        }

        console.log('Departamentos insertados correctamente');
        
    } catch (error) {

        console.error('Error al insertar paises:', error);
        process.exit(1);
    } finally {
        
        await sequelize.close();
        console.log('Conexión terminada.');
        process.exit();
    }
}

seedStates();
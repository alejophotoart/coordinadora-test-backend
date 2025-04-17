require('dotenv').config();
const sequelize = require('../database/sequelize');

// Importar modelos para sincronizacion
const { User, Role } = require('../models')

const seedRoles = async() => {
    
    try {
        await sequelize.sync({ alter: true });

        console.log('Tablas sincronizadas');
    } catch (error) {

        console.error('Error al sincronizar tablas:', error);
        process.exit(1);
    } finally {

        await sequelize.close();
        console.log('Conexión terminada.');
        process.exit();
    }
}

seedRoles();
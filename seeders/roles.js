require('dotenv').config();
const sequelize = require('../database/sequelize');
const { Role } = require('../models');

const seedRoles = async() => {
    
    try {
        await sequelize.authenticate();

        const roles = ['admin', 'moderator', 'user'];

        for (const name of roles) {
            await Role.findOrCreate({ where: { name } });
        }

        console.log('Roles insertados correctamente');
        
    } catch (error) {

        console.error('Error al insertar roles:', error);
        process.exit(1);
    } finally {
        
        await sequelize.close();
        console.log('Conexión terminada.');
        process.exit();
    }
}

seedRoles();
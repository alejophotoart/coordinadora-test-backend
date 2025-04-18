require('dotenv').config();
const sequelize = require('../database/sequelize');
const { OrderStatus } = require('../models');

const seedOrderStatus = async() => {
    
    try {
        await sequelize.authenticate();

        const orderStatus = ['En espera', 'En tránsito', 'Entregado.'];

        for (const name of orderStatus) {
            await OrderStatus.findOrCreate({ where: { name } });
        }

        console.log('Estados de ordenes insertados correctamente');
        
    } catch (error) {

        console.error('Error al insertar roles:', error);
        process.exit(1);
    } finally {
        
        await sequelize.close();
        console.log('Conexión terminada.');
        process.exit();
    }
}

seedOrderStatus();
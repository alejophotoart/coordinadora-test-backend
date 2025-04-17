const mysql = require('mysql2')
const sequelize = require('./sequelize');

const dbConnection = async() => {
    
    // Implementamos manejo de errores en caso de que la conexion salga mal
    try {

        await sequelize.authenticate();

        console.log("database connected");

    } catch (error) {
        console.log(error);
        throw new Error('error connection database')
    }
}

module.exports = dbConnection
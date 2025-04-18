const { DataTypes } = require('sequelize')
const sequelize = require('../database/sequelize')

const Vehicle = sequelize.define('Vehicle', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reference: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "referencia de la marca ejemplo marca: suzuki, referencia: gixxer 150"
    },
    vehicleType: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Moto, carro, camion, mula, etc."
    },
    vehicleIdentification: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Placa del vehiculo"
    }
}, {
    tableName: 'vehicles',
    timestamps: true,
    underscored: true,
    paranoid: true,
})

module.exports = Vehicle;
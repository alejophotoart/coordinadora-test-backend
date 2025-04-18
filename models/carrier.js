const { DataTypes } = require('sequelize')
const sequelize = require('../database/sequelize')

const Carrier = sequelize.define('Carrier', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    vehicleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'vehicles',
            key: 'id'
        }
    }
}, {
    tableName: 'carriers',
    timestamps: true,
    underscored: true,
    paranoid: true,
})

module.exports = Carrier;
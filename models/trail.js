const { DataTypes } = require('sequelize')
const sequelize = require('../database/sequelize')

const Trail = sequelize.define('Trail', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    originCityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'cities',
            key: 'id'
        }
    },
    destinationCityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'cities',
            key: 'id'
        }
    },
}, {
    tableName: 'trails',
    timestamps: true,
    underscored: true,
    paranoid: true,
})

module.exports = Trail;
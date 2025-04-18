const { DataTypes } = require('sequelize')
const sequelize = require('../database/sequelize')

const TrailCarrier = sequelize.define('TrailCarrier', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    trailId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'trails',
            key: 'id'
        }
    },
    carrierId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'carriers',
            key: 'id'
        }
    },
}, {
    tableName: 'trail_carriers',
    timestamps: true,
    underscored: true,
    paranoid: true,
})

module.exports = TrailCarrier;
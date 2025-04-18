const { DataTypes } = require('sequelize')
const sequelize = require('../database/sequelize')

const State = sequelize.define('State', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    countryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'countries',
            key: 'id'
        }
    }
}, {
    tableName: 'states',
    timestamps: true,
    underscored: true,
    paranoid: true,
})

module.exports = State;
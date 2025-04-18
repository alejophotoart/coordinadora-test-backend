const { DataTypes } = require('sequelize')
const sequelize = require('../database/sequelize')

const Country = sequelize.define('Country', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    flagUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'countries',
    timestamps: true,
    underscored: true,
    paranoid: true,
})

module.exports = Country;
const { DataTypes } = require('sequelize')
const sequelize = require('../database/sequelize')

const OrderStatus = sequelize.define('StatusOrder', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'order_status',
    timestamps: true,
    underscored: true,
})

module.exports = OrderStatus;
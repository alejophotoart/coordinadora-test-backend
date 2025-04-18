const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'orders',
            key: 'id'
        },
    },
    packageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'packages',
            key: 'id'
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
}, {
    tableName: 'order_items',
    timestamps: true,
    underscored: true,
    paranoid: true,
});

module.exports = OrderItem
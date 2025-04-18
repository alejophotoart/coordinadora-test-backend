const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Package = sequelize.define('Package', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "Peso en KG"
    },
    height: {
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "Alto en CM"
    },
    width: {
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "Ancho en CM"
    },
    depth: {
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "Profundidad en CM"
    },
    package_type: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Tipo de paquete"
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    fragile: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    estimated_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        comment: "Valor estimado del paquete $"
    },
}, {
    tableName: 'packages',
    timestamps: true,
    underscored: true,
    paranoid: true,
});

module.exports = Package
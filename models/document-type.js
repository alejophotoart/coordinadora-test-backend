const { DataTypes } = require('sequelize')
const sequelize = require('../database/sequelize')

const DocumentType = sequelize.define('DocumentType', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'document_types',
    timestamps: true,
    underscored: true,
    paranoid: true,
})

module.exports = DocumentType;
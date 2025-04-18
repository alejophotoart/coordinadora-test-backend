const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize'); // Ajusta según tu proyecto

const Recipient = sequelize.define('Recipient', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    fullName: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    documentTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'document_types',
            key: 'id'
        }
    },
    documentNumber: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    }
}, {
    tableName: 'recipients',
    timestamps: true,
    underscored: true,
});

module.exports = Recipient;

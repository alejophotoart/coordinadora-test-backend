const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize'); // Ajusta si tu conexión está en otro archivo

const Sender = sequelize.define('Sender', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    full_name: {
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
    document_number: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
    }
}, {
    tableName: 'senders',
    timestamps: true,
    paranoid: true,
    underscored: true,
});

module.exports = Sender;

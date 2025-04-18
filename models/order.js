const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    senderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'senders',
            key: 'id'
        },
        comment: "Remitente"
    },
    recipientId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'recipients',
            key: 'id'
        },
        comment: "Destinatario"
    },
    orderStatusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
            model: 'order_status',
            key: 'id'
        }
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
    trailId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Id de la ruta asignada",
        references: {
            model: 'trails',
            key: 'id'
        }
    },
    carrierId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Id del transportiste asignado",
        references: {
            model: 'carriers',
            key: 'id'
        }
    },
    guideNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "Numero de guia"
    },
    priceDelivery: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
    },
    estimatedDate: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    addressDetail: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "Detalles de la direccion ejemplo: Apto 202 Bloque A - Unidad Residencial Las palmas"
    }
}, {
    tableName: 'orders',
    timestamps: true,
    underscored: true,
    paranoid: true
})

module.exports = Order
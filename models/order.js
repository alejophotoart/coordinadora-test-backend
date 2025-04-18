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
    guideNumber: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true,
        comment: "Numero de guia"
    },
    priceDelivery: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    estimatedDate: {
        type: DataTypes.DATE,
        allowNull: true
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
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'orders',
    timestamps: true,
    underscored: true,
    paranoid: true
})

module.exports = Order
const City = require('./city')
const Country = require('./country')
const DocumentType = require('./document-type')
const Order = require('./order')
const OrderItem = require('./order-item')
const OrderStatus = require('./order-status')
const Package = require('./package')
const Recipient = require('./recipient')
const Role = require('./role')
const Sender = require('./sender')
const State = require('./state')
const User = require('./user')


// Relacion con Roles a Users
User.belongsTo(Role, { foreignKey: 'roleId' });

// Relacion de Orders con OrderItems
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

// Relacion de Packages con orderItems
Package.hasMany(OrderItem, { foreignKey: 'packageId' });
OrderItem.belongsTo(Package, { foreignKey: 'packageId' });

// Relacion con origin city a cities
Order.belongsTo(City, { foreignKey: 'originCityId' });

// Relacion con destination city a cities
Order.belongsTo(City, { foreignKey: 'destinationCityId' });

// Relacion con status order
Order.belongsTo(OrderStatus, { foreignKey: 'orderStatusId' });

// Relacion con countries a states
State.belongsTo(Country, { foreignKey: 'countryId' });

// Relacion con states a cities
City.belongsTo(State, { foreignKey: 'stateId' });

// Relacion con Roles a Users
Sender.belongsTo(DocumentType, { foreignKey: 'documentTypeId' });

// Relacion con Roles a Users
Recipient.belongsTo(DocumentType, { foreignKey: 'documentTypeId' });

module.exports = {
    City,
    Country,
    DocumentType,
    Order,
    OrderItem,
    OrderStatus,
    Package,
    Recipient,
    Role,
    State,
    User,
}
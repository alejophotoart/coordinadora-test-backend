const Carrier      = require('./carrier')
const City         = require('./city')
const Country      = require('./country')
const DocumentType = require('./document-type')
const Order        = require('./order')
const OrderItem    = require('./order-item')
const OrderStatus  = require('./order-status')
const Package      = require('./package')
const Recipient    = require('./recipient')
const Role         = require('./role')
const Sender       = require('./sender')
const State        = require('./state')
const Trail        = require('./trail')
const TrailCarrier = require('./trail-carrier')
const User         = require('./user')
const Vehicle      = require('./vehicle') 


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

Order.belongsTo(Carrier, { foreignKey: 'carrierId', as: 'carrier' })

// Relacion con countries a states
State.belongsTo(Country, { foreignKey: 'countryId' });

// Relacion con states a cities
City.belongsTo(State, { foreignKey: 'stateId' });

// Relacion con document type a Senders
Sender.belongsTo(DocumentType, { foreignKey: 'documentTypeId' });
DocumentType.hasMany(Sender, { foreignKey: 'documentTypeId' });

// Relacion con Roles a Users
Recipient.belongsTo(DocumentType, { foreignKey: 'documentTypeId' });

//Relacion de trails con carriers asignados 
Trail.belongsToMany(Carrier, {
  through: 'TrailCarrier',
  foreignKey: 'trailId',
  otherKey: 'carrierId',
  as: 'carriers'
});

// Relacion de trails con cities
Trail.belongsTo(City, { foreignKey: 'originCityId', as: "originCity" })
Trail.belongsTo(City, { foreignKey: 'destinationCityId', as: "destinationCity" })

// Relacion de carrier con vehicle
Carrier.belongsTo(Vehicle, {foreignKey: 'vehicleId', as: 'vehicle'});

module.exports = {
    Carrier,
    City,
    Country,
    DocumentType,
    Order,
    OrderItem,
    OrderStatus,
    Package,
    Recipient,
    Role,
    Sender,
    State,
    Trail,
    TrailCarrier,
    User,
    Vehicle,
}
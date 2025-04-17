const User = require('./user')
const Role = require('./role')

// Relacion con roles a usuarios
User.belongsTo(Role, { foreignKey: 'roleId' });

module.exports = {
    User,
    Role
}
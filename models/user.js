const { DataTypes } = require('sequelize')
const sequelize = require('../database/sequelize');
const bcrypt = require('sequelize-bcrypt');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3,
        references: {
            model: 'roles',
            key: 'id'
        }
    }
}, {
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    underscored: true
})

// Implementar el bcrypt con sequelize
const options = {
    field: 'password',
    rounds: 15, 
    compare: 'authenticate',
}
bcrypt(User, options)

// Devolver respuesta perzonalizada de User 
User.prototype.toJSON = function () {
    let { id, password, deletedAt, ...user } = this.get();
    return user;
};

module.exports = User
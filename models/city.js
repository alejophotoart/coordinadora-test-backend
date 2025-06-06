const { DataTypes } = require('sequelize')
const sequelize = require('../database/sequelize')

const City = sequelize.define('City', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    stateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'states',
            key: 'id'
        }
    }
}, {
    tableName: 'cities',
    timestamps: true,
    underscored: true,
    paranoid: true,
})

City.prototype.toJSON = function () {
    let { stateId, createdAt, updatedAt, deletedAt, ...city } = this.get();
    return city;
};

module.exports = City;
const sequelize = require('./db');
const {DataTypes} = require('sequelize');
const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
    chatID: {type: DataTypes.STRING, unique: true},

})

module.exports = User;
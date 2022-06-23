'use strict';

const sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

const UsersModel = sequelize.define('Users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = UsersModel;
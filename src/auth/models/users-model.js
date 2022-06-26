'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const sequelize = new Sequelize(process.env.DATABASE_URL);

const UsersModel = sequelize.define('Users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.VIRTUAL,
    get() {
      return jwt.sign({username: this.username}, SECRET, {expiresIn: '8640000'});
    },
    set(payload){
      return jwt.sign(payload, SECRET, {expiresIn: '8640000'});
    },
  },
});

module.exports = UsersModel;
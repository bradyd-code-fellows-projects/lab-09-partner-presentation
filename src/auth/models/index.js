'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const TermSchema = require('./glossaryInputModel.js');
const userSchema = require('./users.js');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
} : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

const TermModel = new TermSchema(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  users: userSchema(sequelize, DataTypes),
  TermModel,
};


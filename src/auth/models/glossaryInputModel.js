'use strict';

const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL);

const TermModel = sequelize.define( 'Entry', {
  termName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  definition: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = TermModel;

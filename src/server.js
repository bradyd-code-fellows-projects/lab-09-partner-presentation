'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const termsRouter = require('../src/routes/glossaryTerms');
const errorHandler = require('./middleware/500');
const notFound = require('./middleware/404');
const authRoutes = require('../src/auth/router/index');

const app = express();

const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);

app.use(termsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: () => {
    app.listen(PORT, () => {
      console.log(`Server Up on ${PORT}`);
    });
  },
};
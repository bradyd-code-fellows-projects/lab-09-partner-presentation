'use strict';

const express = require('express');
const authRouter = express.Router();

const basicAuth = require('../middleware/basic');
const bearerAuth = require('../middleware/bearer');

const {
  handleSignIn,
  handleSignUp,
  handleGetUsers,
  handleSecret,
} = require('./handlers.js');

authRouter.post('/signup', handleSignUp);
authRouter.post('/signin', basicAuth, handleSignIn);
authRouter.get('/users', bearerAuth, handleGetUsers);
authRouter.get('/secret', bearerAuth, handleSecret);

module.exports = authRouter;
'use strict';

const UsersModel = require('../../../src/auth/models/users-model');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

UsersModel.authenticateBearer = async (token) => {
  try {
    let payload = jwt.verify(token, SECRET);
    console.log(payload);
    const user = await UsersModel.findOne({ where: { username: payload.username } });
    if (user){
      return user;
    }
  } catch (e) {
    console.error(e);
    return e;
  }
};

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid Login');
  } else {
    try {
      let token = req.headers.authorization.split(' ').pop();
      console.log('bearer auth token ', token);
      let validUser = await UsersModel.authenticateBearer(token);
      if (validUser){
        req.user = validUser;
        req.token = validUser.token;
        next();
      }
    } catch(e) {
      next(e.message);
    }
  }
};
'use strict';

const base64 = require('base-64');
const UsersModel = require('../../auth/models/users-model');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    next('Not Authorized');
  } else {
    let authStr = req.headers.authorization.split(' ')[1];
    let decodedAuthStr = base64.decode(authStr);
    let [username, password] = decodedAuthStr.split(':');

    let user = await UsersModel.authenticateBasic(username, password);

    if (user) {
      req.user = user;
      next();
    } else {
      next('Not Authorized');
    }
  }
};
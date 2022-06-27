'use strict';

const UsersModel = require('../../../src/auth/models/users-model');
const bcrypt = require('bcrypt');

async function handleSignUp(req, res, next) {
  try{ 
    let { username, password } = req.body;
    let encryptedPassword = await bcrypt.hash(password, 5);
    console.log('username: ', username, 'password: ', password);
    let user = await UsersModel.create({
      username,
      password: encryptedPassword,
    });
    res.status(200).send(user);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleSignIn(req, res, next) {
  try {
    const user = {
      user: req.user,
      token: req.user.token,
    };
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    next();
  }
}

async function handleGetUsers(req, res, next) {
  try {
    const userRecords = await UsersModel.findAll({});
    const list = userRecords.map(user => user.username);
    res.status(200).json(list);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

function handleSecret(req, res, next) {
  res.status(200).send('Welcome to the secret area!');
}

module.exports = {
  handleSignUp,
  handleSignIn,
  handleGetUsers,
  handleSecret,
};

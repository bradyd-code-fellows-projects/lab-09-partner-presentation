'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const termsRouter = require('../src/routes/glossaryTerms');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const UsersModel = require('../src/auth/models/users-model');

const errorHandler = require('./middleware/500');
const notFound = require('./middleware/404');

const app = express();

const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function basicAuth(req, res, next)  {
  // confirm that the headers has an "authorization" property
  let { authorization } = req.headers;
  console.log(authorization); //something like: Basic sdfhsdbsdfblkm=
  if (!authorization){
    res.status(401).send('Not Authorized');
  } else {
    // get rid of 'Basic '
    let authStr = authorization.split(' ')[1];
    console.log('authStr:', authStr); //something like:  sdfhsdbsdfblkm=

    let decodedAuthStr = base64.decode(authStr);
    console.log('decodedAuthStr:', decodedAuthStr); //tester:pass123

    let [ username, password ] = decodedAuthStr.split(':');
    console.log('username:', username);
    console.log('password:', password);

    let user = await UsersModel.findOne({where: {username}});

    if (user){
      let validUser = await bcrypt.compare(password, user.password);
      if (validUser){
        // previously req.user did not exist.  
        // if user is authenticated, let add it
        req.user = user;
        next();
      } else {
        next('Not Authorized');
      }
    }
  }
}

app.post('/signup', async (req, res, next) => {
  let { username, password } = req.body;

  let encryptedPassword = await bcrypt.hash(password, 5);

  let user = await UsersModel.create({
    username,
    password: encryptedPassword,
  });
  res.status(200).send(user);
});

app.get('/hello', basicAuth, (req, res, next) => {
  let { name } = req.query;
  console.log('auth proof', req.user.username);
  res.status(200).send(`Greetings ${name}! this route is now secured by Basic Auth!!!`);
});

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
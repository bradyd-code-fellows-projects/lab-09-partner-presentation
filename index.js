'use strict';

const { start } = require('./src/server');
// Start up DB Server
const { db } = require('./src/auth/models/index');
db.sync()
  .then(() => { console.log('successfully connected to db'); })
  .catch((e) => console.error(e.message));
start();

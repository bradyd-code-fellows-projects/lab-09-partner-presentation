'use strict';

const { sequelize } = require('../src/auth/models/index');
const UsersModel = require('../src/auth/models/users-model');
const jwt = require('jsonwebtoken');
const SECRET = process.env.API_SECRET || 'ThisIsMySecret';

beforeAll (async () => {
  await sequelize.sync();
});

afterAll (async () => {
  await sequelize.close();
});

describe('UsersModel Tests', () => {
  test('User should have a token', async () => {
    const testUser = await UsersModel.create({username: 'JohnnyBravo', password: 'pass123'});
    console.log();
    const { token } = testUser;
    const validToken = jwt.verify(testUser.token , SECRET);

    expect(token).toBeTruthy();
    expect(validToken).toBeTruthy();
  });
});

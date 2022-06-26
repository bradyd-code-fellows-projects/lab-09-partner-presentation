'use strict';

const { db, users } = require('../src/auth/models/index');
const jwt = require('jsonwebtoken');
const SECRET = process.env.API_SECRET || 'ThisIsMySecret';

let userInfo = {
  admin: { username: 'admin', password: 'password' },
};

beforeAll (async () => {
  await db.sync();
  await users.create(userInfo.admin);
});

afterAll (async () => {
  await db.drop();
});

describe('UsersModel Tests', () => {
  test('User should have a token', async () => {
    const testUser = await users.create({username: 'JohnnyBravo', password: 'pass123'});
    const { token } = testUser;
    const validToken = jwt.verify(testUser.token , SECRET);

    expect(token).toBeTruthy();
    expect(validToken).toBeTruthy();
  });
});

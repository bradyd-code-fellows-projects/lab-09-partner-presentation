'use strict';

// const { userSchema } = require('../src/auth/models/users');
const { db, users } = require('../src/auth/models');
const supertest = require('supertest');
const { server } = require('../src/server');
const request = supertest(server);

let testUser;

beforeAll(async () => {
  await db.sync();
  testUser = await users.create({username: 'JohnnyBravo', password: 'pass123', role: 'writer'});
});

afterAll(async () => {
  await db.drop();
});

describe('Access Control Tests', () => {

  test('Authorized to read', async () => {
    let response = await request.get('/read').set('Authorization', `Bearer ${testUser.token}`);
    console.log('read test', testUser);
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('OK! I have read permissions');
  });


  test('Authorized to create', async () => {
    let response = await request.get('/create').set('Authorization', `Bearer ${testUser.token}`);

    expect(response.status).toEqual(200);
    expect(response.text).toEqual('OK! I have create permissions');
  });

  test('Authorized to update', async () => {
    let response = await request.get('/update').set('Authorization', `Bearer ${testUser.token}`);

    expect(response.status).toEqual(403);
    expect(response.text).toEqual('Access Denied');
  });
});
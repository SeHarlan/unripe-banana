const { getStudio, getStudios } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('app routes', () => {
  it('creates a Studio', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'test studio',
        address: {
          city: 'test city',
          state: 'test state',
          country: 'test country'
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'test studio',
          address: {
            city: 'test city',
            state: 'test state',
            country: 'test country'
          },
          _id: expect.any(String),
          __V: 0
        });
      });
  });
 
  //get by id
  //get all
});

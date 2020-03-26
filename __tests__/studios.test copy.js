const { getActor, getActors } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');


describe('actor routes', () => {
  it('creates a Actor', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'test actor',
        dob: mongoose.Schema.Types.Date,
        pob: 'test city'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'test actor',
          dob: expect.any(String),
          pob: 'test city',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  it('gets actor by id', async() => {
    const actor = await getActor();
    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual(actor);
      });
  });
  it('gets all actors', async() => {
    const actors = await getActors();
    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        expect(res.body).toEqual(actors);
      });
  });
});

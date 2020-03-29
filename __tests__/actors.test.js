const { getActor, getActors, getFilms } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');



describe('actor routes', () => {
  it('creates a Actor', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'test actor',
        dob: '02-19-1994',
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
    const films = await getFilms({ 'cast.actor': actor._id }, '_id title released');
  
    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...actor,
          films });
      });
  });
  it('gets all actors', async() => {
    const actors = await getActors({}, '_id name');
    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        expect(res.body).toEqual(actors);
      });
  });
});

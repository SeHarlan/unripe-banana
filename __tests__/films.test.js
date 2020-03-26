const { getFilm, getFilms, getActor, getStudio } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('films tests', () => {
  it('creates a new film', async() => {

    const studio = await getStudio();
    const actor = await getActor();
    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'test film',
        studio: studio._id,
        released: 2000,
        cast: [{
          role: 'test role',
          actor: actor._id
        }]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          title: 'test film',
          studio: expect.any(String),
          released: 2000,
          cast: [{
            _id: expect.any(String),
            role: 'test role',
            actor: expect.any(String)
          }]
        });
      });
  });
  //get all
  //get by id
})
;

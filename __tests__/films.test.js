const { getFilm, getFilms, getActor, getStudio } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('films tests', () => {
  it('creates a new film', async() => {

    const studio = getStudio();
    const actor = getActor();
    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'test film',
        studio: studio._id,
        released: '2000',
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
          studio: studio._id,
          released: '2000',
          cast: [{
            role: 'test role',
            actor: actor._id
          }]
        });
      });
  });
  //get all
  //get by id
  //post
})
;

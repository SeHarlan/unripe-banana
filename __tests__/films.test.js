const { getFilm, getFilms, getActor, getStudio, getActors, getReviews, getStudios } = require('../db/data-helpers');

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
  it('gets Film by id', async() => {
    const film = await getFilm({}, '-_id');
    const studio = await getStudio({ _id: { $in: film.studio } });
    const actors = await getActors({ _id: { $in: film.cast.map(c => c.actor) } });
    const reviews = await getReviews({ film: film._id });
   
    return request(app)
      .get(`/api/v1/films/${film._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...film,
          studio,
          cast: film.cast.map((c, i) => ({
            ...c, actor: actors[i]
          })),
          reviews
        });
      });
  });
  it('gets all Films', async() => {
    const films = await getFilms({}, '-cast');
    const studios = await getStudios({}, '_id name');

    return request(app)
      .get('/api/v1/films')
      .then(res => {
        expect(res.body).toEqual(
          films.map(film => {
            const [curStudio] = studios.filter(studio => (studio._id === film.studio)); 
            return { 
              ...film, 
              studio: curStudio
            };
          })
        );
      });
  });
});

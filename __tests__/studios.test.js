const { getStudio, getStudios } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');


describe('studio routes', () => {
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
          __v: 0
        });
      });
  });
  it('gets studio by id', async() => {
    const studio = await getStudio();
    return request(app)
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual(studio);
      });
  });
  it('gets al studios', async() => {
    const studios = await getStudios();
    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        expect(res.body).toEqual(studios);
      });
  });
});

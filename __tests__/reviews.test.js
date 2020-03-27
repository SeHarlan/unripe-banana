const { getReviews, getFilm, getReviewer, getReview } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('review tests', () => {
  it('creates a new review', async() => {
    const reviewer = await getReviewer();
    const film = await getFilm();
    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 3,
        reviewer: reviewer._id,
        review: 'test review',
        film: film._id
      })
      .then(res => {
        expect(res.body).toEqual({
          rating: 3,
          reviewer: expect.any(String),
          review: 'test review',
          film: expect.any(String),
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  //get top 100
  //delete
})
;

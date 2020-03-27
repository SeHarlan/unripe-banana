const { getReviewer, getReviewers } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');



describe('Reviewer routes', () => {
  it('creates a Reviewer', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'test reviewer',
        company: 'test company'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'test reviewer',
          company: 'test company',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  it('gets Reviewer by id', async() => {
    const reviewer = await getReviewer();
    return request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual(reviewer);
      });
  });
  it('gets all Reviewers', async() => {
    const reviewers = await getReviewers();
    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        expect(res.body).toEqual(reviewers);
      });
  });
  it('updates a reviewer', async() => {
    const reviewer = await getReviewer();
    return request(app)
      .patch(`/api/v1/reviewers/${reviewer._id}`)
      .send({ name: 'updated name' })
      .then(res => {
        expect(res.body).toEqual({
          ...reviewer,
          name: 'updated name'
        });
      });
  });
});

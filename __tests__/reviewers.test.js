const { getReviewer, getReviewers, getReviews, getFilms } = require('../db/data-helpers');
const Review = require('../lib/models/Review');
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
    const reviews = await getReviews({ reviewer: reviewer._id });
    return request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...reviewer,
          reviews });
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
  it('cannot delete a reviewer if they have reviews', async() => {
    const reviewer = await getReviewer();
    return request(app)
      .delete(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({ 'error': 'Cannot be deleted while reviews exist' });
      });
  });
  it('deletes a reviewer when they have no reviews', async() => {
    const reviewer = await getReviewer();
    await Review.deleteMany({ reviewer: reviewer._id }, function(err, result) {
      if(err) {
        console.log('deletemany err: ', err);
      } else {
        console.log('delete many result, ', result);
      }
    });
    return request(app)
      .delete(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...reviewer,
          reviews: [] });
      });
  });
});

const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()
  .post('/', (req, res, next) => {
    Reviewer
      .create(req.body)
      .then(Reviewer => res.send(Reviewer))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Reviewer
      .findById(req.params.id)
      .populate({ 
        path: 'reviews', 
        select: '_id film rating review -reviewer',
        populate: { path: 'film', select: '_id title' }
      })
      .then(Reviewer => res.send(Reviewer))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Reviewer
      .find()
      .then(Reviewers => res.send(Reviewers))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Reviewer
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Reviewer
      .findById(req.params.id)
      .populate('reviews')
      .then(reviewer => {
        if(reviewer.reviews.length) return res.send({ 'error': 'Cannot be deleted while reviews exist' });
        reviewer.deleteOne()
          .then(deleted => res.send(deleted));
      })
      .catch(next);
  });

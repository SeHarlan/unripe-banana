const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router()
  .post('/', (req, res, next) => {
    Film
      .create(req.body)
      .then(film => res.send(film))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Film
      .findById(req.params.id)
      .populate('studio', '_id name')
      .populate('cast.actor', '_id name')
      .populate({ 
        path: 'reviews', 
        select: 'rating review reviewer -film',
        populate: { path: 'reviewer', select: '_id name' }
      })
      .then(film => res.send(film))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Film
      .find()
      .select('-cast')
      .populate('studio', '_id name')
      .then(films => res.send(films))
      .catch(next);
  });

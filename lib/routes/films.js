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
      .populate('studio')
      .populate('cast.actor')
      .populate('reviews')
      .then(film => res.send(film))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Film
      .find()
      .then(films => res.send(films))
      .catch(next);
  });

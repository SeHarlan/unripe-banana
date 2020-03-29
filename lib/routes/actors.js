const { Router } = require('express');
const Actor = require('../models/Actor');

module.exports = Router()
  .post('/', (req, res, next) => {
    Actor
      .create(req.body)
      .then(Actor => res.send(Actor))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Actor
      .findById(req.params.id)
      .populate('films', '_id released title')
      .then(Actor => res.send(Actor))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Actor
      .find()
      .select('_id name')
      .then(Actors => res.send(Actors))
      .catch(next);
  });

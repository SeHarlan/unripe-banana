const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');
const Review = require('../lib/models/Review');
const chance = require('chance').Chance();

module.exports = async() => {
  const studios = await Studio.create([...Array(5)].map(() => ({
    name: chance.company(),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }
  })));

  const actors = await Actor.create([...Array(15)].map(() => ({
    name: chance.name(),
    dob: chance.date(),
    pob: chance.city()
  })));

  const reviewers = await Reviewer.create([...Array(30)].map(() => ({
    name: chance.name(),
    company: chance.company()
  })));

  const films = await Film.create([...Array(20)].map(() => ({
    title: `Your ${chance.profession()} is a ${chance.animal()}?!`,
    studio: chance.pickone(studios)._id,
    released: chance.year(),
    cast: [
      { role: chance.animal(), actor: chance.pickone(actors)._id },
      { role: chance.animal(), actor: chance.pickone(actors)._id }
    ]
  })));
  await Review.create([...Array(130)].map(() => ({
    rating: chance.integer({ min: 1, max: 5 }),
    reviewer: chance.pickone(reviewers)._id,
    review: chance.sentence({ words: 5 }),
    film: chance.pickone(films)._id
  })));
};

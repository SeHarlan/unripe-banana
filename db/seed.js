const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');
const chance = require('chance').Chance();

module.exports = async() => {
  const studios = await Studio.create([...Array(3)].map(() => ({
    name: chance.company(),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }
  })));

  const actors = await Actor.create([...Array(10)].map(() => ({
    name: chance.name(),
    dob: chance.date(),
    pob: chance.city()
  })));

  const reviewers = await Reviewer.create([...Array(10)].map(() => ({
    name: chance.name(),
    company: chance.company()
  })));

  const films = await Film.create([...Array(5)].map(() => ({
    title: `Your ${chance.profession()} is a ${chance.animal()}?!`,
    studio: chance.pickone(studios)._id,
    released: chance.year(),
    cast: [
      { role: chance.animal(), actor: chance.pickone(actors)._id },
      { role: chance.animal(), actor: chance.pickone(actors)._id }
    ]
  })));
};

const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Reviewer = require('../lib/models/Reviewer');
const chance = require('chance').Chance();

module.exports = async() => {
  const studios = await Studio.create([...Array(10)].map(() => ({
    name: chance.company(),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }
  })));

  const actors = await Actor.create([...Array(30)].map(() => ({
    name: chance.name(),
    dob: chance.date(),
    pob: chance.city()
  })));

  const reviewer = await Reviewer.create([...Array(50)].map(() => ({
    name: chance.name(),
    company: chance.company()
  })));
};

const Studio = require('../lib/models/Studio');
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

  
};

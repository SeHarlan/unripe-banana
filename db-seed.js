require('dotenv').config();
require('./lib/utils/connect')();

const seedData = require('./db/seed');

seedData()
  .then(() => console.log('done'));

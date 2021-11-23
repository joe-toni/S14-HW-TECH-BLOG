const { User } = require('../models');

const userData = [
  {
    userName: 'lennard',
    password: 'Password#1'
  },
  {
    userName: 'kenny',
    password: 'Password#2'
  },
  {
    userName: 'mike',
    password: 'Password#3'
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;

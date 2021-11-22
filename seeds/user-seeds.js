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
  },
  {
    userName: 'richard',
    password: 'Password#4'
  },
  {
    userName: 'sammy',
    password: 'Password#5'
  },
  {
    userName: 'denis',
    password: 'Password#6'
  },
  {
    userName: 'emily',
    password: 'Password#7'
  },
  {
    userName: 'chris',
    password: 'Password#8'
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;

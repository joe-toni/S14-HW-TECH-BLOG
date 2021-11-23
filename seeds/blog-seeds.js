const { Blog } = require('../models');

const blogData = [
  {
    userId: 1,
    blogName: 'HTML, CSS and Javascript',
    content: 'This is the first section of a long long long class and is basically teaching the fundemental or the bare bones to starting a full stack site'
  },
  {
    userId: 2,
    blogName: 'Avanced CSS',
    content: 'This section extends our knowledge of css which is how we style our html sheets giving it some kind of flare'
  },
  {
    userId: 3,
    blogName: 'JavaScript',
    content: 'This sections dives into the Javascript programming language which is how we will give commnands to the html elements of our site to perform specific tasks'
  }
];

const seedBlogs = () => Blog.bulkCreate(blogData);

module.exports = seedBlogs;

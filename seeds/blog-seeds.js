const { Blog } = require('../models');

const blogData = [
  {
    userId: 1,
    blogName: 'Name#1',
    description: 'Description#1',
    content: 'Contents of blog post number one'
  },
  {
    userId: 1,
    blogName: 'Name#2',
    description: 'Description#2',
    content: 'Contents of blog post number two'
  },
  {
    userId: 2,
    blogName: 'Name#3',
    description: 'Description#3',
    content: 'Contents of blog post number three'
  },
  {
    userId: 2,
    blogName: 'Name#4',
    description: 'Description#4',
    content: 'Contents of blog post number four'
  },
  {
    userId: 3,
    blogName: 'Name#5',
    description: 'Description#5',
    content: 'Contents of blog post number five'
  },
  {
    userId: 3,
    blogName: 'Name#6',
    description: 'Description#6',
    content: 'Contents of blog post number six'
  },
  {
    userId: 4,
    blogName: 'Name#7',
    description: 'Description#7',
    content: 'Contents of blog post number seven'
  },
  {
    userId: 4,
    blogName: 'Name#8',
    description: 'Description#8',
    content: 'Contents of blog post number eight'
  },
  {
    userId: 5,
    blogName: 'Name#9',
    description: 'Description#9',
    content: 'Contents of blog post number nine'
  },
  {
    userId: 5,
    blogName: 'Name#10',
    description: 'Description#10',
    content: 'Contents of blog post number ten'
  },
  {
    userId: 6,
    blogName: 'Name#11',
    description: 'Description#11',
    content: 'Contents of blog post number eleven'
  },
  {
    userId: 6,
    blogName: 'Name#12',
    description: 'Description#12',
    content: 'Contents of blog post number twelve'
  },
  {
    userId: 7,
    blogName: 'Name#13',
    description: 'Description#13',
    content: 'Contents of blog post number thirteen'
  },
  {
    userId: 7,
    blogName: 'Name#14',
    description: 'Description#14',
    content: 'Contents of blog post number fourteen'
  },
  {
    userId: 8,
    blogName: 'Name#15',
    description: 'Description#15',
    content: 'Contents of blog post number fifthteen'
  },
  {
    userId: 8,
    blogName: 'Name#16',
    description: 'Description#16',
    content: 'Contents of blog post number sixteen'
  }
];

const seedBlogs = () => Blog.bulkCreate(blogData);

module.exports = seedBlogs;

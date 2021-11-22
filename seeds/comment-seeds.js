const { Comment } = require('../models');

const commentData = [
  {
    blogId: 1,
    comment: 'this is a comment of your blog #1'
  },
  {
    blogId: 8,
    comment: 'this is a comment of your blog #1'
  },
  {
    blogId: 7,
    comment: 'this is a comment of your blog #1'
  },
  {
    blogId: 6,
    comment: 'this is a comment of your blog #1'
  },
  {
    blogId: 5,
    comment: 'this is a comment of your blog #1'
  },
  {
    blogId: 4,
    comment: 'this is a comment of your blog #1'
  },
  {
    blogId: 3,
    comment: 'this is a comment of your blog #1'
  },
  {
    blogId: 2,
    comment: 'this is a comment of your blog #1'
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;

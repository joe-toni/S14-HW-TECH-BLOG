const { Comment } = require('../models');

const commentData = [
  {
    blogId: 1,
    commenterId: 2,
    comment: 'It was pretty easy not gonna lie'
  },
  {
    blogId: 1,
    commenterId:3,
    comment: 'This section seemed pretty straigth forward'
  },
  {
    blogId: 2,
    commenterId:1,
    comment: 'Styling is so cool I wonder what else we can make with this.'
  },
  {
    blogId: 2,
    commenterId:3,
    comment: 'This one is pretty cool but im a bit confused on how to manipulate things'
  },
  {
    blogId: 3,
    commenterId:2,
    comment: 'Javascript seems pretty complicated'
  },
  {
    blogId: 3,
    commenterId:1,
    comment: 'I was having trouble understanding this one'
  }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;

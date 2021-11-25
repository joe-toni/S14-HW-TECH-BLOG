// import models
const User = require('./users');
const Blog = require('./blog');
const Comment = require('./comment');

//This index file collects all our established models and creates the associations between them for use by both our server.js and our
//seeds.js files

// Categories have many Products
User.hasMany(Blog, {foreignKey: 'user_id', onDelete: 'CASCADE' , onUpdate:'CASCADE'});
Blog.belongsTo(User, {foreignKey: 'user_id'});

Blog.hasMany(Comment, {foreignKey: 'blog_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
Comment.belongsTo(Blog, {foreignKey: 'blog_id'});

User.hasMany(Comment, {foreignKey: 'commenter_id', as: 'commenter', onDelete: 'CASCADE' , onUpdate:'CASCADE'});
Comment.belongsTo(User, {foreignKey: 'commenter_id'});

module.exports  = {User, Blog, Comment};
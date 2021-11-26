const router = require('express').Router();
const userRoutes = require('./user-routes');
const blogRoutes = require('./blog-routes');
const commentRoutes = require('./comment-routes');

//This index file collects all the router files that are incharge of accessing thier corresponding 
//models.

router.use('/user', userRoutes);
router.use('/blog', blogRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
const router = require('express').Router();
const apiRoutes = require('./api-routes');
const userRoutes = require('./user-routes');
const homeRoutes = require('./home-routes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/user', userRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;
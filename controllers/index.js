const router = require('express').Router();
const apiRoutes = require('./api/index');
const navRoutes = require('./navigation-routes');


//This router is ment to join both the routers  meant to handle the data in our models with the 
//Router that will handle all the pages of our view displays.

router.use('/', navRoutes);
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;
const router = require('express').Router();

const loggedIn = true;

router.get('/', async (req, res) =>
{
    try
    {
        res.render('homepage',{loggedIn});
    }
    catch
    {
        res.status(400);
    }
})

module.exports = router;
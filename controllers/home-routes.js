const router = require('express').Router();
const {User, Blog, Comment} = require('../Models');
const loggedIn = true;

router.get('/', async (req, res) =>
{
    try
    {
       let result = await Blog.findAll({include: {model: User, attributes: ['userName']}});
       let blogs = result.map( (blog) => blog.get({plain: true}));
        res.render('homepage',{blogs, loggedIn});
    }
    catch
    {
        res.status(400);
    }
});

router.get('/create', async (req, res) =>
{
    try
    {
        res.render('createNewPost',{loggedIn});
    }
    catch
    {
        res.status(400);
    }
});

router.get('/blog/:id', async (req, res) =>
{
    try
    {
        let result = await Blog.findByPk(req.params.id, {include: [{model: User, attributes: ['userName']}, {model: Comment}]});
        let blog = result.get({plain: true});
        res.render('viewBlogPost',{blog, loggedIn});
    }
    catch
    {
        res.status(400);
    }
});
module.exports = router;
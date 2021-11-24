const router = require('express').Router();
const {User, Blog, Comment} = require('../Models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) =>
{
    try
    {

       let result = await Blog.findAll({include: {model: User, attributes: ['userName']}});
       let blogs = result.map( (blog) => blog.get({plain: true}));
        res.render('homepage',{blogs, loggedIn: req.session.loggedIn});
    }
    catch
    {
        res.status(400);
    }
});

router.get('/dashboard', async (req, res) =>
{
    try
    {
       let result = await Blog.findAll({include: {model: User, attributes: ['userName']}});
       let blogs = result.map( (blog) => blog.get({plain: true}));
        res.render('dashboard',{blogs, loggedIn:req.session.loggedIn});
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
        res.render('createNewPost',{loggedIn:req.session.loggedIn});
    }
    catch
    {
        res.status(400);
    }
});

router.get('/signup', async (req, res) =>
{
    try
    {
        res.render('signUp',{loggedIn:req.session.loggedIn});
    }
    catch
    {
        res.status(400);
    }
});

router.get('/login', async (req, res) =>
{
    try
    {
        res.render('login',{loggedIn:req.session.loggedIn});
    }
    catch
    {
        res.status(400);
    }
});

router.get('/blog/:id',withAuth, async (req, res) =>
{
    try
    {
        let result = await Blog.findByPk(req.params.id, {include: [{model: User, attributes: ['userName']}, {model: Comment, include: {model: User, attributes: ['userName']}}]});
        let blog = result.get({plain: true});
        res.render('viewBlogPost',{blog, loggedIn: req.session.loggedIn});
    }
    catch
    {
        res.status(400);
    }
});
module.exports = router;
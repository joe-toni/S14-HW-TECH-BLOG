const router = require('express').Router();
const {User, Blog, Comment} = require('../models/index.js');
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

router.get('/dashboard',withAuth, async (req, res) =>
{
    try
    {
        let result = await User.findByPk(req.session.userId, {include:{model: Blog}})
        let user = result.get({plain: true});
        //res.json(user);
       res.render('dashboard', {user, loggedIn: req.session.loggedIn, dashboard: true});
    }
    catch
    {
        res.status(400);
    }
});

router.get('/createpost', withAuth, async (req, res) =>
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

router.get('/editpost/:id', withAuth, async (req, res) =>
{
    try
    {
        let result = await Blog.findByPk(req.params.id, {include: [{model: User, attributes: ['userName']}, {model: Comment, include: {model: User, attributes: ['userName']}}]});
        let blog = result.get({plain: true});
        if(blog.userId === req.session.userId)
        {res.render('editPost',{blog, loggedIn: req.session.loggedIn});}
        else{res.redirect('/')}

    }
    catch
    {
        res.status(400);
    }
});

router.get('/signup', async (req, res) =>
{
    try
    { res.render('signUp',{loggedIn:req.session.loggedIn});}
    catch
    { res.status(400);}
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login', {loggedIn: req.session.loggedIn});
  });
  
router.get('/blog/:id', async (req, res) =>
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

router.get('/blog/:bid/comment/', withAuth ,async (req, res) =>
{
    try
    {
        let result = await Blog.findByPk(req.params.bid, {include: [{model: User, attributes: ['userName']}, {model: Comment, include: {model: User, attributes: ['userName']}}]});
        let blog = result.get({plain: true});
        res.render('addComment',{blog, loggedIn: req.session.loggedIn});
    }
    catch
    {
        res.status(400);
    }
});

router.get('/blog/comment/:id', withAuth, async (req, res) =>
{
    try
    {  
        let commentResult = await Comment.findByPk(req.params.id, {include: [{model: User, attributes: ['userName']}, {model: Blog, include: {model: User}}]});
        let comment = commentResult.get({plain: true});
        if(comment.commenterId === req.session.userId)
        {res.render('editComment',{comment, loggedIn: req.session.loggedIn});}
        else
        { res.redirect(`/blog/${comment.blogId}`);}
    }
    catch
    {
        res.status(400);
    }
});



module.exports = router;
const router = require('express').Router();
const {User, Blog, Comment} = require('../models/index.js');
const withAuth = require('../utils/auth');

//This routes file is meant to handle navigating between all the we've established, any page using the withAuth
//middleware will keep the user from accessing the particular route unless they've succesfully logged in.

//This Route is designated to displaying the homepage and works by finding all the created posts and associated user names then
// passing that simplified array to the homepage view with is set up to repeatedly display the array of given objects.
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


//This route is ment to display all the routes for the currently logged in user finding the user through the saved id or primary key
//initialized when the user either logs in or creates a new account, similarly to the route above it passes in a simplified object
//to the dashboard view with is set up to display its values.
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


//This createpost route can only be accessed once the user has logged in and simply renders  the view with 
//the form designated to create a new post.
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


//This route is meant to access the view with the form that allows for editing and deleting of existing posts it uses the the primary key passed in by the link on the view
//page to load the information of that specific post into the form on the editPost view page.
router.get('/editpost/:id', withAuth, async (req, res) =>
{
    try
    {
        let result = await Blog.findByPk(req.params.id, {include: {model: User, attributes: ['userName']}});
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


//This route renders the login page but only if the a session has not already been established with the 
//logged in attribute set to true.
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('signUp', {loggedIn: req.session.loggedIn});
  });


//This route opperates pretty much the same as the previous one only this one renders the login page instead
// of the sign up page.
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login', {loggedIn: req.session.loggedIn});
  });
  

 //This route loads the data on a specific post and all associated comments, it all finds all the data associated with each comment made as well mainly the user name of the
 // user that made it. The route then passes in a simplified version of the data retrieved to the viewBlogPost view which is set up to display the data in the object. 
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


//This router finds the blog associated by the passed in blog id and presents it in the same page as a form ment to handle the creation of new comments
//on that specific blog.
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


//This route is ment to find a specific comment and its associated blog post. Much like the route before this the information is passed into a view that displays the blog, but this one
//Also populates the form with the existing data and allows for the option to either update or delete the comment.
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
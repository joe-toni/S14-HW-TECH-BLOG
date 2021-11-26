const router = require('express').Router();
const {Blog} = require('../../models/index.js');


//This router is set up  to handle the creating, loggin into, and deleting of user blogs

//This post route takes in the passed in data and uses it, along with the session user id to pass in all the 
// neccessary values into the create method for our Blog model.
router.post('/', async (req, res) => 
{
    try
        {
            let {blogName, content} = req.body;
            const newBlog = await Blog.create({userId: req.session.userId, blogName: blogName, content: content});
            res.status(200).json(newBlog);
        } 
    catch(err)
        {
            console.log(err);
            res.status(400).json(err);
        }
});


//Since our post is found using the id assigned to it at creation we only need to edit the string values belonging
//to the edited post passed into the update method for our blog model. In order to prevent other users from editing
//posts that do not belong to them the page allowing the request is barred unless the it is the original logged in user 
// attempting to access it.
router.put('/:id', async (req, res) => 
{
    try
        {
            let {blogName, content} = req.body;
            let result = await Blog.update({blogName: blogName, content: content}, {where: {id: req.params.id}})
            res.status(200).json(result);
        }
    catch(err)
        {
            console.log(err);
            res.status(400).json(err);
        }
});


//This route finds the post in question using the primary key and passes it into our destroy method for the blog model
// The page allowing this should be barred unless it is the original user logged in, hopefuly ensuring others can not delete posts belonging 
// to someone else.
router.delete('/:id', async (req, res) => 
{
    try
        {
            let result = await Blog.destroy({where: {id: req.params.id}});
            res.status(200).json(result);
        }
    catch(err)
        {
            console.log(err);
            res.status(400).json(err);
        }
});

module.exports = router;

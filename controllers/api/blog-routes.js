const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');




router.get('/', async (req, res) => 
{
    try
        {
          let result = await Blog.findAll({include: [{model: User}, {model: Comment, include: User}]});
          res.status(200).json(result);
        }
    catch(err)
        {
          res.status(400).json(err);
        }
});




router.get('/:id', async (req, res) => 
{
    try
        {
          let result = await Blog.findByPk(req.params.id, {include: [{model: User}, {model: Comment}]});
          res.status(200).json(result);
        }
    catch(err)
        {
          res.status(400).json(err);
        }
});




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
            res.status(400).json(err);
        }
});



router.delete('/:id', async (req, res) => 
{
    try
        {
            let result = await Blog.destroy({where: {id: req.params.id}});
            res.status(200).json(result);
        }
    catch(err)
        {
            res.status(400).json(err);
        }
});

module.exports = router;

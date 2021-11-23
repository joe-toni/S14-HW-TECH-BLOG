const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');




router.get('/', async (req, res) => 
{
    try
        {
          let result = await Blog.findAll({include: {model: User}});
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
            let {userId, blogName, description, content} = req.body;
            await Blog.create({userId: userId, blogName: blogName, description: description, content: content});
            res.status(200).json( await Blog.findOne({where: {blogName: blogName}}));  
        } 
    catch(err)
        {
            res.status(400).json(err);
        }
});



router.put('/:id', async (req, res) => 
{
    try
        {
            let {userId, blogName, description, content} = req.body;
            await Blog.update({blogName: blogName, description: description, content: content}, {where: {id: req.params.id}})
            res.status(200).json(await Blog.findOne({where: {id: req.params.id}}));
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
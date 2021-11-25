const router = require('express').Router();
const { User, Blog, Comment } = require('../../models/index.js');




router.get('/', async (req, res) => 
{
    try
        {
          let result = await User.findAll({include: [{model: Blog, as: "Blogs"}]});
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
          let result = await User.findByPk(req.params.id, {include: [{model: Blog, as: "Blogs"}]});
          res.status(200).json(result);
        }
    catch(err)
        {
          res.status(400).json(err);
        }
});




router.post('/', async (req, res) => {
try
{
    let {blogId, comment} = req.body;
  const newComment = await Comment.create({blogId: blogId, comment: comment, commenterId: req.session.userId});
  res.status(200).json( newComment);  
} 
catch(err)
{
  res.status(400).json(err);
}
  // create a new User
});

router.put('/:id', async (req, res) => {
  try
  {
    await User.update({user_name: req.body.user_name}, {where: {id: req.params.id}})
    res.status(200).json(await User.findOne({where: {id: req.params.id}}));
  }
  catch(err)
  {
    res.status(400).json(err);
  }
  // update a User's name by its `id` value
});

router.delete('/:id', async (req, res) => {
try
{
  let result = await User.destroy({where: {id: req.params.id}});
  res.status(200).json(result);
}
catch(err)
{
  res.status(400).json(err);
}
  // delete on User by its `id` value
});

module.exports = router;

const router = require('express').Router();
const { User, Blog } = require('../../models/index');




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
    let user = req.body;
  await User.create({user_name: user.user_name, password : user.password});
  res.status(200).json( await User.findOne({where: {user_name: user.user_name}}));  
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

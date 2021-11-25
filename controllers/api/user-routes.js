const router = require('express').Router();
const { User, Blog } = require('../../models');

router.get('/', async (req, res) =>
{
    let result = await User.findAll();
    res.json(result);
})


// CREATE new user
router.post('/', async (req, res) => 
{
    try {
      const newUser = await User.create({
        userName: req.body.userName,
        password: req.body.password,
      });

      const result = await User.findOne({where:{userName: newUser.userName}});
  
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.userId = result.id;
        res.status(200).json(newUser);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


// Login
router.post('/login', async (req, res) => {
    try {
      const foundUser = await User.findOne({where: {userName: req.body.userName}});
  
      if (!foundUser)
      {
        res.status(400).json({ message: 'Incorrect  User Name or password. Please try again!' });
        return;
      }
        const validPassword = await foundUser.checkPassword(req.body.password);
  
      if (!validPassword) 
      {
        res.status(400).json({ message: 'Incorrect User Name or password. Please try again!' });
        return;
      }
      req.session.save(() =>
      {
        req.session.loggedIn = true;
        req.session.userId = foundUser.id;
        res.status(200).json({ user: foundUser, message: 'You are now logged in!' });
      });
    } 
    catch (err) 
    {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.post('/logout', (req, res) => 
  {
    if (req.session.loggedIn) 
    {
      req.session.destroy(() => 
      {
        res.status(204).end();
      });
    }
    else 
    {res.status(404).end();}
  });

router.delete('/:id', async (req, res) => 
{
    try
        {
            let result = await User.destroy({where: {id: req.params.id}});
            res.status(200).json(result);
        }
    catch(err)
        {
            res.status(400).json(err);
        }
});

module.exports = router;

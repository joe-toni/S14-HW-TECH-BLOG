const router = require('express').Router();
const {User} = require('../../models/index.js');

//This router is meant to handle the creating, logging in, logging out, and deleting of users.


//This post route takes the passed in body and hands it to the create method for the User model. After the new user has
//created the route then finds the newly created route and passes the generated id to the initialiszed session along with a variable 
//indicating the user has been logged in.
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


  //This post route opperates similarly to the one above, but runs two extra checks after looking for the already existing user.
  //If both finding the existing user and the given password matches the saved one, then a new session will be initialized
  //with the a variable for the user id and a boolean signaling a successfull log in .
router.post('/login', async (req, res) => {
    try 
    {
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

  //This method simply checks to see if the session is initialized with the varaible for logged in set to true
  //If it is then it the session is destroyed.
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

module.exports = router;

const router = require('express').Router();
const {Comment } = require('../../models/index.js');

//This router is designated to the creation, editing and deleting of  instances from our Comment model.


//This post method takes in the passed in values for the blog it belongs to, the actual comment being made, from 
// the body of the fetch request before passing it into the create method which fills in the last attribute with
// the id of the current user logged in, access to the posting page is barred unless logged in to prevent errors in null data for this field.
router.post('/', async (req, res) => 
{
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
});


//This put route allows the current user to update any comments they have made,  since the comment is found using its primary key and no
//Other attributes are reassigned no other attributes are passed in but in order to prevent other uses from altering comments the page allowing
//access to this put route is barred unless the user is logged in and the current user id matches the id of the original commenter.
router.put('/:id', async (req, res) => 
{
    try
      {
          let {comment} = req.body;
          let result = await Comment.update({comment: comment}, {where: {id: req.params.id}});
          res.status(200).json(result);
      }
    catch(err)
      {
          res.status(400).json(err);
      }
});


//This delete route simply deletes the comment with the corresponding primary key but similarly to the method above is only accessable
//To the original user after they've been logged in.
router.delete('/:id', async (req, res) => 
{
  try
    {
      let result = await Comment.destroy({where: {id: req.params.id}});
      res.status(200).json(result);
    }
  catch(err)
    {
      res.status(400).json(err);
    }
});

module.exports = router;

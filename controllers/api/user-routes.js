const router = require('express').Router();
const { User, Blog } = require('../../models');




router.get('/', async (req, res) => 
{
    try
        {
          let result = await User.findAll({include: [{model: Blog}]});
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
          let result = await User.findByPk(req.params.id, {include: [{model: Blog}]});
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
            let user = req.body;
            await User.create({userName: user.userName, password : user.password});
            res.status(200).json( await User.findOne({where: {userName: user.userName}}));  
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
            let user = req.body;
            await User.update({userName: user.userName, password: user.password}, {where: {id: req.params.id}})
            res.status(200).json(await User.findOne({where: {id: req.params.id}}));
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
            let result = await User.destroy({where: {id: req.params.id}});
            res.status(200).json(result);
        }
    catch(err)
        {
            res.status(400).json(err);
        }
});

module.exports = router;

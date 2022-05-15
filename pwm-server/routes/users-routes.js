const express = require('express');

const userController = require('../controllers/users-controller');

const router = express.Router();

//router.get('/getUsers', itemsController.getAllItems);
router.post('/signUp', userController.signUp);
router.post('/login', userController.login);
router.post('/addToWatchList', userController.addToWatch)
router.delete('/removeFromWatch', userController.removeFromWatch);
router.post('/getUserFavorites', userController.getUserFavorites)

module.exports = router;
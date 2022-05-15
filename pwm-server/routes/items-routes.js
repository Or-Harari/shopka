const express = require('express');
const itemsController = require('../controllers/items-controller');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

router.get('/getItems', itemsController.getAllItems);

router.use(checkAuth);

router.post('/createItem', itemsController.createItem);
router.put('/updateUserRating', itemsController.UpdateUserRating)

module.exports = router;
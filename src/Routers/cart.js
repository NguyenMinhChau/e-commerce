const router = require('express').Router();
const CartController = require('../Controllers/cartController');
const checkToken = require('../utils/checkToken');

router.post('/addToCart/:id', checkToken, CartController.addToCart);

module.exports = router;

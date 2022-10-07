const router = require('express').Router();
const StripController = require('../Controllers/stripeController');

router.post('/checkout', StripController.checkout);

module.exports = router;

const router = require('express').Router();
const CheckoutHomeController = require('../Controllers/CheckoutHomeController');

router.post('/sendEmail', CheckoutHomeController.sendEmail);

module.exports = router;

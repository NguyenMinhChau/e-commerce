const router = require('express').Router();
const VnpayController = require('../Controllers/vnpayController');

router.post('/checkout', VnpayController.checkoutVnpay);

module.exports = router;

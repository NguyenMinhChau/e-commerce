const router = require('express').Router();
const ZaloController = require('../Controllers/ZaloController');

router.post('/checkout', ZaloController.checkoutZalo);

module.exports = router;

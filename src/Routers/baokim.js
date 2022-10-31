const router = require('express').Router();
const BaoKimController = require('../Controllers/BaoKimController');

router.post('/checkout', BaoKimController.checkoutBaoKim);

module.exports = router;

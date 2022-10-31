const router = require('express').Router();
const EmailController = require('../Controllers/emailController');

router.post('/sendEmailCheckout', EmailController.sendEmailCheckout);
router.post('/emailMarketing', EmailController.emailMarketing);
router.post('/emailOrder', EmailController.emailOrder);

module.exports = router;

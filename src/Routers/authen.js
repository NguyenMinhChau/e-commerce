const router = require('express').Router();
const checkToken = require('../utils/checkToken');
const authenController = require('../Controllers/authenController');

router.post('/login', authenController.login);
router.post('/register', authenController.register);
router.post('/logout', authenController.logout);
router.post('/refresh_token', authenController.refreshToken);

module.exports = router;

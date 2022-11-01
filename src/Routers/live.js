const router = require('express').Router();
const LiveController = require('../Controllers/liveController');
const checkRole = require('../utils/checkRole');
const checkToken = require('../utils/checkToken');

router.post('/add', checkToken, checkRole, LiveController.addLive);
router.get('/getall', LiveController.getAllLive);
router.delete('/:id', checkToken, checkRole, LiveController.deleteLive);

module.exports = router;

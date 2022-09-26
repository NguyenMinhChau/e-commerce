const router = require('express').Router();
const checkToken = require('../utils/checkToken');
const checkRole = require('../utils/checkRole');
const userController = require('../Controllers/userController');

router.get('/getall', checkRole, userController.getAllUsers);
router.get('/:id', checkToken, checkRole, userController.getUser);
router.put('/:id', checkToken, checkRole, userController.updateUser);
router.delete('/:id', checkToken, checkRole, userController.deleteUser);

module.exports = router;

const router = require('express').Router();
const multer = require('multer');
const checkRole = require('../utils/checkRole');
const checkToken = require('../utils/checkToken');
const ShopController = require('../Controllers/shopController');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/images/shops');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
    },
});
let uploadSingle = multer({
    storage: storage,
}).single('image');

router.post(
    '/add',
    checkToken,
    checkRole,
    uploadSingle,
    ShopController.addShop
);
router.get('/:id', checkToken, checkRole, ShopController.getShop);
router.get('/', checkToken, checkRole, ShopController.getAll);
router.put(
    '/:id',
    checkToken,
    checkRole,
    uploadSingle,
    ShopController.updateShop
);
router.delete('/:id', checkToken, checkRole, ShopController.deleteShop);

module.exports = router;

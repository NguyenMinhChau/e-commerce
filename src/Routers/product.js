const router = require('express').Router();
const multer = require('multer');
const checkRole = require('../utils/checkRole');
const checkToken = require('../utils/checkToken');
const ProductController = require('../Controllers/productController');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/images/products');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
    },
});
let uploadMultiple = multer({
    storage: storage,
}).fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'imagesList', maxCount: 10 },
]);

router.post(
    '/add',
    checkToken,
    checkRole,
    uploadMultiple,
    ProductController.addProduct
);
router.get('/:id', checkToken, checkRole, ProductController.getProduct);
router.get('/', checkToken, checkRole, ProductController.getProducts);
router.put(
    '/:id',
    checkToken,
    checkRole,
    uploadMultiple,
    ProductController.updateProduct
);
router.delete('/:id', checkToken, checkRole, ProductController.deleteProduct);

module.exports = router;

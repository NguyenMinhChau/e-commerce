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
        console.log(file);
        cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
    },
});
let uploadMultiple = multer({
    storage: storage,
}).fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'imagesList', maxCount: 5 },
]);

router.post(
    '/add',
    checkToken,
    checkRole,
    uploadMultiple,
    ProductController.addProduct
);
router.get('/getall', ProductController.getProducts);
router.get('/:slug', ProductController.getProductBySlug);
// router.get('/:id', ProductController.getProductById);
router.put('/:id', checkToken, uploadMultiple, ProductController.updateProduct);

router.delete('/:id', checkToken, checkRole, ProductController.deleteProduct);

module.exports = router;

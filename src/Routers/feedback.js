const router = require('express').Router();
const multer = require('multer');
const checkRole = require('../utils/checkRole');
const checkToken = require('../utils/checkToken');
const FeedbackController = require('../Controllers/feedbackController');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/images/feedbacks');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
    },
});
let uploadMultiple = multer({
    storage: storage,
}).fields([{ name: 'imageList', maxCount: 10 }]);

router.post(
    '/add',
    checkToken,
    checkRole,
    uploadMultiple,
    FeedbackController.addFeedBack
);
router.get('/getall', FeedbackController.getFeedBacks);
router.get('/:id', FeedbackController.getFeedBack);
router.put(
    '/:id',
    checkToken,
    checkRole,
    uploadMultiple,
    FeedbackController.updateFeedBack
);
router.delete('/:id', checkToken, checkRole, FeedbackController.deleteFeedBack);

module.exports = router;

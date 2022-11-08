const router = require('express').Router();
const TkDoanhThu = require('../Controllers/TkDoanhThu');

router.get('/getall', TkDoanhThu.getDoanhThu);

module.exports = router;

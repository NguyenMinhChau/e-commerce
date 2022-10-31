const config = require('config');
const moment = require('moment');
const querystring = require('qs');
const crypto = require('crypto-js');
const open = require('open');

const VnpayController = {
    // [POST] /api/v1/vnpay/checkout
    checkoutVnpay: async (req, res) => {
        const { amount, bankCode, orderDescription, orderType, language } =
            req.body;
        const ipAddr =
            req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        const tmnCode = config.get('vnp_TmnCode');
        const secretKey = config.get('vnp_HashSecret');
        let vnpUrl = config.get('vnp_Url');
        const returnUrl = config.get('vnp_ReturnUrl');

        const date = new Date();

        const createDate = moment(date).format('yyyymmddHHmmss');
        const orderId = moment(date).format('HHmmss');
        let locale = language;
        if (locale === null || locale === '') {
            locale = 'vn';
        }
        const currCode = 'VND';
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = orderInfo;
        vnp_Params['vnp_OrderType'] = orderType;
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if (bankCode !== null && bankCode !== '') {
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);
        const signData = querystring.stringify(vnp_Params, { encode: false });

        const hmac = crypto.createHmac('sha256', secretKey);
        const signed = hmac.update(signData).digest('hex');
        vnp_Params['vnp_SecureHashType'] = 'SHA256';
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: true });

        open(vnpUrl);
    },
};

module.exports = VnpayController;

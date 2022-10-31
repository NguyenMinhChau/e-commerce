require('dotenv').config();
const CryptoJS = require('crypto-js');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const axios = require('axios');
const open = require('open');

const ZaloController = {
    // [POST] /api/v1/zalo/checkout
    checkoutZalo: async (req, res) => {
        try {
            const { itemData, emailUser } = req.body;
            const config = {
                appid: process.env.APP_ID_ZALO,
                key1: process.env.KEY_SECRECT_1,
                key2: process.env.KEY_SECRECT_2,
                endpoint: process.env.ZALO_ENDPOINT,
            };

            const embeddata = {
                promotioninfo: '',
                merchantinfo: 'embeddata',
            };

            const items = itemData;

            const order = {
                appid: config.appid,
                apptransid: `${moment().format('YYMMDD')}_${uuidv4()}`,
                appuser: emailUser,
                apptime: Date.now(),
                item: JSON.stringify(items),
                embeddata: JSON.stringify(embeddata),
                amount: items.reduce((acc, item) => {
                    return acc + item.itemprice * item.itemquantity;
                }, 0),
                description: `Megamart - Thanh toán đơn hàng ${moment().format(
                    'YYMMDD'
                )}_${uuidv4()}`,
                bankcode: 'zalopayapp',
            };

            // appid|apptransid|appuser|amount|apptime|embeddata|item
            const data =
                config.appid +
                '|' +
                order.apptransid +
                '|' +
                order.appuser +
                '|' +
                order.amount +
                '|' +
                order.apptime +
                '|' +
                order.embeddata +
                '|' +
                order.item;
            order.mac = await CryptoJS.HmacSHA256(data, config.key1).toString();
            axios
                .post(config.endpoint, null, { params: order })
                .then((x) => {
                    if (x.data.orderurl) {
                        open(x.data.orderurl);
                    }
                })
                .catch((err) => console.log(err));
        } catch (err) {
            return res.status(500).json({
                message: err.message,
            });
        }
    },
};

module.exports = ZaloController;

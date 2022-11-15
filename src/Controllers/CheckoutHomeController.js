const Product = require('../Models/Product');
const User = require('../Models/User');
const sendMailFunc = require('../utils/sendMail');

const CheckoutHomeController = {
    // [POST] /api/v1/checkoutHome/sendEmail
    sendEmail: async (req, res) => {
        try {
            const { user, dataCart } = req.body;
            const mailContent = `
                <p>Kính gửi: <strong><i>${user?.username}</i></strong></p>
                <p><i>Chúng tôi, bộ phận xử lý đơn hàng <span><a style='color: #ee4d2d' href='https://nguyenminhchau.site/'><u><strong>MEGAMART</strong></u></a></span>. Đơn hàng của bạn đã được ghi nhận thành công.</i></p>
                <h3><b>Thông tin khách hàng</b></h3>
                <div style='border: 1px solid #000; border-radius: 8px; padding: 8px 12px; max-width: 500px'>
                    <p><b>Họ và tên: <i style='color: #ee4d2d'>${
                        user?.username
                    }</i></b></p>
                    <p><b>Địa chỉ giao hàng: <i style='color: #ee4d2d'>${
                        user?.address ? user?.address : 'Không có địa chỉ'
                    }</i></b></p>
                    <p><b>Số điện thoại: <i style='color: #ee4d2d'>${
                        user?.phone ? user?.phone : 'Không có số điện thoại'
                    }</i></b></p>
                    <p><b>Ngày tạo đơn: <i style='color: #ee4d2d'>${new Date().toLocaleString()}</i></b></p>
                    <p><b>Dự kiến giao hàng trước: <i style='color: #ee4d2d'>
                        ${new Date(
                            new Date().getTime() + 3 * 24 * 60 * 60 * 1000
                        ).toLocaleString()}
                    </i></b></p>
                    <p><b>Hình thức thanh toán: <i style='color: #ee4d2d'>Khi nhận hàng</i></b></p>
                </div>
                <h3 style='margin-bottom: 10px'>Chi tiết đơn hàng</h3>
                <table style='border-collapse: collapse; width: 100%;'>
                    <thead>
                        <tr>
                            <th style='border: 1px solid #ddd; padding: 8px; text-align: left'>Ảnh/Video</th>
                            <th style='border: 1px solid #ddd; padding: 8px; text-align: left'>Tên sản phẩm</th>
                            <th style='border: 1px solid #ddd; padding: 8px; text-align: left'>Số lượng</th>
                            <th style='border: 1px solid #ddd; padding: 8px; text-align: left'>Giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${dataCart
                            .map((item) => {
                                return `
                                <tr>
                                <td style='border: 1px solid #ddd; padding: 8px; text-align: left'>
                                <img src='${`https://apimegamart.4eve.site/${item?.thumbnail?.replace(
                                    'src/uploads',
                                    ''
                                )}`}' style='width: 100px; height: 100px; object-fit: cover' />
                                <video src='${`https://apimegamart.4eve.site/${item?.thumbnail?.replace(
                                    'src/uploads',
                                    ''
                                )}`}' style='width: 100px; height: 100px; object-fit: cover' controls></video>
                                </td>
                                    <td style='border: 1px solid #ddd; padding: 8px; text-align: left'; max-width: '300px'>${
                                        item.name
                                    }</td>
                                    <td style='border: 1px solid #ddd; padding: 8px; text-align: left'>${
                                        item.quantity
                                    }</td>
                                    <td style='border: 1px solid #ddd; padding: 8px; text-align: left'>${
                                        item.price
                                            ?.toString()
                                            ?.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            ) + ' VND'
                                    }</td>
                                </tr>
                            `;
                            })
                            .join('')}
                        <tr>
                            <td style='border: 1px solid #ddd; padding: 8px; text-align: left; font-weight: bold'>Tổng tiền</td>
                            <td style='border: 1px solid #ddd; padding: 8px; text-align: left'></td>
                            <td style='border: 1px solid #ddd; padding: 8px; text-align: left'></td>
                            <td style='border: 1px solid #ddd; padding: 8px; text-align: left; font-weight: bold'>${
                                dataCart
                                    ?.reduce(
                                        (acc, item) =>
                                            acc + item.price * item.quantity,
                                        0
                                    )
                                    ?.toString()
                                    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
                                ' VND'
                            }</td>
                        </tr>
                </table>
                <p><b>Vui lòng kiểm tra hàng trước khi thanh toán. Chúc quý khách hàng thật nhiều sức khỏe!</b></p>
                <p><i>Đây là email tự động, vui lòng không trả lời email này.</i></p>

                <p><strong><i>Trân trọng.</i></strong></p>
                <div style='width: 100%; height: 1px; background-color: #ee4d2d; margin-bottom: 12px'></div>
                <p><strong>Sàn giao dịch thương mại: <i><a style='color: #ee4d2d' href='https://nguyenminhchau.site/'>MegaMart</a></i></strong></p>
                <p><strong>Hotline: <i><a style='color: red' href='tel:0398365404'>0398365404</a></i></strong></p>
                <p><strong>Địa chỉ: <i><a style='color: red' href='https://goo.gl/maps/nYe6U42GEZKbSQio8'>Châu Thành - Tiền Giang</a></i></strong></p>
                <p><strong>Slogan: <i style='color: red'>Chất lượng luôn đặt lên hàng đầu</i></strong></p>
                <div style='width: 100%; height: 200px'>
                    <img src='https://images.unsplash.com/photo-1503437313881-503a91226402?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=2000' alt='MegaMart' style='width: 100%; height: 100%; object-fit: contain'/>
                </div>
            `;
            await sendMailFunc(
                user?.email,
                mailContent,
                `MEGAMART - Thông báo mua  đơn hàng thành công`
            );
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
};

module.exports = CheckoutHomeController;

const routers = {
    home: '/',
    help: '/help',
    register: '/register',
    login: '/login',
    forgotPwd: '/forgotPwd',
    getOtp: '/getOTP',
    verifyAccount: '/user/activation_account',
    SendMailReVerify: '/user/send_mail_re_verify',
    cart: '/cart',
    checkout: '/checkout',
    products: '/products',
    productType: 'type',
    productDetail: 'detail',
    livestream: '/live',
    // ADMIN
    tkdt: '/admin/tkdoanhthu',
    tksp: '/admin/thongkesp',
    qlsp: '/admin/quanlysp',
    qlnd: '/admin/quanlyuser',
    qlph: '/admin/quanlyphanhoi',
    // END
    pageNotFound: '*',
};

export default routers;

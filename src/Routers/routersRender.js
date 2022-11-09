import routers from './routers.js';
import {
    Home,
    Login,
    ForgotPwd,
    Register,
    GetOTP,
    DetailProduct,
    CartDetail,
    Checkout,
    Livestream,
    VerifyAccount,
    SendMailReVerify,
} from '../Layouts';
import {
    ThongkeDoanhthu,
    ThongkeSanpham,
    QuanlySanpham,
    QuanlyNguoidung,
    QuanlyPhanhoi,
} from '../Admin';
import { PageNotFound } from '../Components';

const publicRouter = [
    { path: routers.login, component: Login, layout: null },
    { path: routers.register, component: Register, layout: null },
    { path: routers.forgotPwd, component: ForgotPwd, layout: null },
    { path: `${routers.getOtp}/:token`, component: GetOTP, layout: null },
    {
        path: `${routers.SendMailReVerify}`,
        component: SendMailReVerify,
        layout: null,
    },
    {
        path: `${routers.verifyAccount}/:tokenActivation`,
        component: VerifyAccount,
        layout: null,
    },
    { path: routers.pageNotFound, component: PageNotFound, layout: null },
    { path: routers.home, component: Home },
    { path: routers.cart, component: CartDetail },
    { path: routers.livestream, component: Livestream },
    {
        path: `${routers.products}/${routers.productType}/:type`,
        component: Home,
    },
    {
        path: `${routers.products}/${routers.productDetail}/:id`,
        component: DetailProduct,
    },
    { path: routers.pageNotFound, component: PageNotFound, layout: null },
];

const privateRouter = [
    { path: routers.home, component: Home },
    { path: routers.cart, component: CartDetail },
    { path: routers.checkout, component: Checkout },
    { path: routers.livestream, component: Livestream },
    {
        path: `${routers.products}/${routers.productType}/:type`,
        component: Home,
    },
    {
        path: `${routers.products}/${routers.productDetail}/:id`,
        component: DetailProduct,
    },
    { path: routers.pageNotFound, component: PageNotFound, layout: null },
];

const adminRouter = [
    { path: routers.home, component: Home },
    { path: routers.cart, component: CartDetail },
    { path: routers.checkout, component: Checkout },
    { path: routers.livestream, component: Livestream },
    {
        path: `${routers.products}/${routers.productType}/:type`,
        component: Home,
    },
    {
        path: `${routers.products}/${routers.productDetail}/:slug`,
        component: DetailProduct,
    },
    // {
    //     path: `${routers.products}/${routers.productDetail}/:id`,
    //     component: DetailProduct,
    // },
    { path: routers.tkdt, component: ThongkeDoanhthu },
    { path: routers.tksp, component: ThongkeSanpham },
    { path: routers.qlsp, component: QuanlySanpham },
    { path: routers.qlnd, component: QuanlyNguoidung },
    { path: routers.qlph, component: QuanlyPhanhoi },
    { path: routers.pageNotFound, component: PageNotFound, layout: null },
];

export { publicRouter, privateRouter, adminRouter };

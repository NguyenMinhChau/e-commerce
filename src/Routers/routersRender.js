import routers from './routers.js';
import { Home, Login, Register, DetailProduct } from '../Layouts';
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
    { path: routers.pageNotFound, component: PageNotFound, layout: null },
];

const privateRouter = [
    { path: routers.home, component: Home },
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
    {
        path: `${routers.products}/${routers.productType}/:type`,
        component: Home,
    },
    {
        path: `${routers.products}/${routers.productDetail}/:id`,
        component: DetailProduct,
    },
    { path: routers.tkdt, component: ThongkeDoanhthu },
    { path: routers.tksp, component: ThongkeSanpham },
    { path: routers.qlsp, component: QuanlySanpham },
    { path: routers.qlnd, component: QuanlyNguoidung },
    { path: routers.qlph, component: QuanlyPhanhoi },
    { path: routers.pageNotFound, component: PageNotFound, layout: null },
];

export { publicRouter, privateRouter, adminRouter };

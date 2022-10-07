import React from 'react';
import className from 'classnames/bind';
import Badge from '@mui/material/Badge';
import { useAppContext } from '../../utils';
import { ACtoogles, ACsearchs } from '../../app/';
import routers from '../../Routers/routers';
import {
    QrCode,
    Icons,
    Notify,
    SearchHistory,
    CartList,
    Popular,
    AccountMenu,
} from '../../Components';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const cx = className.bind(styles);

function Header() {
    const { state, dispatch } = useAppContext();
    const {
        toogleQrCode,
        toogleNotify,
        search,
        toogleCartList,
        currentUser,
        data: { dataCartList },
    } = state;
    const handleChange = (e) => {
        if (e.target.value.charAt(0) === ' ') {
            return;
        } else {
            dispatch(ACsearchs.setSearchValue(e.target.value));
        }
    };
    const handleToogleQrCodeTrue = () => {
        dispatch(ACtoogles.toogleQrCode(true));
    };
    const handleToogleNotifyTrue = () => {
        dispatch(ACtoogles.toogleNotify(true));
    };
    const handleToogleCartListTrue = () => {
        dispatch(ACtoogles.toogleCartList(true));
    };
    const handleToogleQrCodeFalse = () => {
        dispatch(ACtoogles.toogleQrCode(false));
    };
    const handleToogleNotifyFalse = () => {
        dispatch(ACtoogles.toogleNotify(false));
    };
    const handleToogleCartListFalse = () => {
        dispatch(ACtoogles.toogleCartList(false));
    };
    return (
        <div className={`${cx('container')}`}>
            <div className={`${cx('content')}`}>
                <div className={`${cx('content-top')}`}>
                    <div className={`${cx('content-top-left')}`}>
                        <div
                            className='ps-relative'
                            onMouseOver={handleToogleQrCodeTrue}
                            onMouseLeave={handleToogleQrCodeFalse}
                        >
                            <p className={`${cx('top-text', 'hover')}`}>
                                Shopee Mall
                            </p>
                            {toogleQrCode && <QrCode />}
                        </div>
                        <p className={`${cx('top-text', 'divider')} ml12`}>
                            Kết nối:{' '}
                        </p>
                        <span>
                            <Icons.FacebookIcon
                                className={`${cx('top-icon-social')}`}
                            />
                        </span>
                        <span>
                            <Icons.InstagramIcon
                                className={`${cx('top-icon-social')}`}
                            />
                        </span>
                        <span>
                            <Icons.TwitterIcon
                                className={`${cx('top-icon-social')}`}
                            />
                        </span>
                        <span>
                            <Icons.LinkedlnIcon
                                className={`${cx('top-icon-social')}`}
                            />
                        </span>
                    </div>
                    <div className={`${cx('content-top-right')}`}>
                        <div
                            className='ps-relative'
                            onMouseOver={handleToogleNotifyTrue}
                            onMouseLeave={handleToogleNotifyFalse}
                        >
                            <p className={`${cx('top-text', 'hover')}`}>
                                <Icons.BellIcon /> <span>Thông báo</span>
                            </p>
                            {toogleNotify && <Notify />}
                        </div>
                        <Link
                            to={routers.help}
                            className={`${cx('top-text', 'hover')} ml8`}
                        >
                            <Icons.QuestionIcon /> <span>Trợ giúp</span>
                        </Link>
                        {!currentUser ? (
                            <>
                                <Link
                                    to={routers.register}
                                    className={`${cx('top-text', 'hover')} ml8`}
                                >
                                    Đăng ký
                                </Link>
                                <Link
                                    to={routers.login}
                                    className={`${cx(
                                        'top-text',
                                        'hover',
                                        'divider'
                                    )} ml12`}
                                >
                                    Đăng nhập
                                </Link>
                            </>
                        ) : (
                            <AccountMenu />
                        )}
                    </div>
                </div>
                <div className={`${cx('content-middle')}`}>
                    <div className={`${cx('content-middle-left')}`}>
                        <Link
                            to={routers.home}
                            className={`${cx('content-middle-left-link')}`}
                        >
                            <Icons.LogoShopee
                                className={`${cx('logo-shopee')}`}
                            />
                        </Link>
                    </div>
                    <div className={`${cx('content-middle-middle')}`}>
                        <input
                            type='text'
                            className={`${cx('input-search')}`}
                            placeholder='Tìm kiếm sản phẩm'
                            value={search}
                            name='search'
                            onChange={handleChange}
                        />
                        <button className={`${cx('button-search')}`}>
                            <Icons.SearchIcon />
                        </button>
                        {search && <SearchHistory />}
                    </div>
                    <div className={`${cx('content-middle-right')}`}>
                        <div
                            onMouseOver={handleToogleCartListTrue}
                            onMouseLeave={handleToogleCartListFalse}
                        >
                            <Link
                                to={routers.cart}
                                className={`${cx('content-middle-right-cart')}`}
                            >
                                <Badge
                                    badgeContent={dataCartList?.length}
                                    color='primary'
                                >
                                    <Icons.CartIcon />
                                </Badge>
                            </Link>
                            {toogleCartList && <CartList data={dataCartList} />}
                        </div>
                    </div>
                </div>
                <div className={`${cx('content-bottom')}`}>
                    <Popular />
                </div>
            </div>
        </div>
    );
}

export default Header;

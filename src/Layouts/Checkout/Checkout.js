import React from 'react';
import className from 'classnames/bind';
import styles from './Checkout.module.css';
import {
    moneys,
    cartDetail,
    useAppContext,
    dates,
    indexTable,
} from '../../utils';
import {
    Image,
    TableData,
    CheckoutPaypal,
    CheckoutStripe,
} from '../../Components';

const cx = className.bind(styles);

function Checkout() {
    const { state } = useAppContext();
    const {
        data: { dataCartList },
        pagination: { page, limit },
    } = state;
    const totalBills = () => {
        return dataCartList.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    };
    const RenderBodyTable = ({ data }) => {
        return (
            <>
                {data.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{indexTable(page, limit, index)}</td>
                            <td>
                                <Image
                                    src={`http://localhost:8000/${item?.thumbnail}`}
                                    alt={item?.name}
                                    className={`${cx('image')}`}
                                />
                            </td>
                            <td>{item?.name}</td>
                            <td>{moneys.VND(item?.price)}</td>
                            <td>{item?.quantity}</td>
                            <td>
                                {dates.formatDate(
                                    item?.createdAt,
                                    'DD/MM/YYYY'
                                )}
                            </td>
                        </tr>
                    );
                })}
            </>
        );
    };
    return (
        <>
            <div className={`${cx('container')}`}>
                <div className={`${cx('top')} d-flex`}>
                    <div className={`${cx('title')} ml8 complete`}>
                        Tổng đơn hàng: {moneys.VND(totalBills())}
                    </div>
                </div>
                <TableData
                    headers={cartDetail.headers}
                    data={dataCartList}
                    totalData={dataCartList.length}
                >
                    <RenderBodyTable data={dataCartList} />
                </TableData>
                {console.log(dataCartList)}
                {dataCartList.length > 0 && (
                    <div className={`${cx('paypal-button-container')}`}>
                        <div className={`${cx('paypal-button')}`}>
                            <CheckoutPaypal dataCartList={dataCartList} />
                        </div>
                        <div className={`${cx('paypal-button')}`}>
                            <CheckoutStripe dataCartList={dataCartList} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Checkout;

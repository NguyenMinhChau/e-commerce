import React, { useState } from 'react';
import className from 'classnames/bind';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FormInput, Icons, ModalConfirm, TableData } from '../../Components';
import { moneys, tksp, useAppContext } from '../../utils';
import { ACtoogles } from '../../app/';
import styles from './ThongkeSanpham.module.css';

const cx = className.bind(styles);

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'ThongkeSanpham',
        },
    },
};

const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const DATA = [
    {
        doanhthu: 1000000,
    },
    {
        doanhthu: 2000000,
    },
    {
        doanhthu: 100000,
    },
    {
        doanhthu: 150000,
    },
    {
        doanhthu: 2500000,
    },
    {
        doanhthu: 30000,
    },
    {
        doanhthu: 80000,
    },
    {
        doanhthu: 140000,
    },
    {
        doanhthu: 120000,
    },
    {
        doanhthu: 150000,
    },
    {
        doanhthu: 180000,
    },
    {
        doanhthu: 200000,
    },
];

export const data = {
    labels,
    datasets: [
        {
            label: 'Doanh thu',
            data: DATA.map((item) => item.doanhthu),
            backgroundColor: '#ee4d2d',
        },
    ],
};

function ThongkeSanpham() {
    const [showChart, setShowChart] = useState(false);
    const [idDelete, setIdDelete] = useState(null);
    const { state, dispatch } = useAppContext();
    const { toogleConfirm } = state;
    const handleShowChart = () => {
        setShowChart(!showChart);
    };
    const modalConfirmTrue = (e, id) => {
        e.stopPropagation();
        setIdDelete(id);
        dispatch(ACtoogles.toogleConfirm(true));
    };
    const modalConfirmFalse = (e) => {
        e.stopPropagation();
        dispatch(ACtoogles.toogleConfirm(false));
    };
    const deleteAction = async (id) => {
        try {
            await 1;
            alert('DeleteI id: ' + id);
            dispatch(ACtoogles.toogleConfirm(false));
        } catch (err) {
            console.log(err);
        }
    };
    const RenderBodyTable = ({ data }) => {
        return (
            <>
                {data.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{item.stt}</td>
                            <td>{item.sanpham}</td>
                            <td>{item.ngay}</td>
                            <td>{moneys.VND(item.doanhthu)}</td>
                            <td>{moneys.VND(item.chiphi)}</td>
                            <td>{moneys.VND(item.loinhuan)}</td>
                            <td>
                                <button className='btn-table completebgc'>
                                    <Icons.ViewIcons />
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </>
        );
    };
    return (
        <>
            <div className={`${cx('thongke-container')}`}>
                <h3 className='fz22 mb8'>Thống kê sản phẩm</h3>
                <div className={`${cx('top-container')}`}>
                    <FormInput
                        type='text'
                        name='search'
                        placeholder='Aa...'
                        classNameInput={`${cx('input')}`}
                    />
                    <button
                        className={`${cx('btn')} confirmbgc`}
                        onClick={handleShowChart}
                    >
                        <div className='flex-center'>
                            <Icons.ChartIcon />
                            <span className='ml8'>
                                {!showChart ? 'Show Chart' : 'Hide Chart'}
                            </span>
                        </div>
                    </button>
                </div>
                {showChart ? (
                    <Bar options={options} data={data} />
                ) : (
                    <TableData
                        headers={tksp.headers}
                        data={tksp.data}
                        totalData={tksp.data.length}
                    >
                        <RenderBodyTable data={tksp.data} />
                    </TableData>
                )}
            </div>
            {toogleConfirm && (
                <ModalConfirm
                    titleModal='Delete Confirm'
                    open={modalConfirmTrue}
                    close={modalConfirmFalse}
                    onClick={() => deleteAction(idDelete)}
                >
                    <p className='fz14'>You're sure delete this actions?</p>
                </ModalConfirm>
            )}
        </>
    );
}

export default ThongkeSanpham;

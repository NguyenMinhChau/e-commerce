/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
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
import { FormInput, Icons, TableData, ModalConfirm } from '../../Components';
import { indexTable, moneys, tkdt, useAppContext } from '../../utils';
import { ACtoogles, ACgetalls } from '../../app/';
import styles from './ThongkeDoanhthu.module.css';
import { SVgetallDoanhThu } from '../../services/tkdoanhthu';
import moment from 'moment';

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
            text: 'ThongkeDoanhthu',
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

function ThongkeDoanhthu() {
    const [showChart, setShowChart] = useState(false);
    const [idDelete, setIdDelete] = useState(null);
    const { state, dispatch } = useAppContext();
    const {
        toogleConfirm,
        data: { dataTkDoanhThus },
        pagination: { page, limit },
    } = state;
    useEffect(() => {
        SVgetallDoanhThu({
            dispatch,
            page,
            limit,
            ACgetalls,
        });
    }, [page, limit]);

    const dataDoanhThu = dataTkDoanhThus?.data || [];
    const tongDoanhThu = dataDoanhThu?.reduce((acc, item) => {
        return acc + item.ban;
    }, 0);
    const tongVon = dataDoanhThu?.reduce((acc, item) => {
        return acc + item.von;
    }, 0);
    const tongLoiNhuan = dataDoanhThu?.reduce((acc, item) => {
        return acc + item.loiNhuan;
    }, 0);

    const modalConfirmTrue = (e, id) => {
        e.stopPropagation();
        setIdDelete(id);
        dispatch(ACtoogles.toogleConfirm(true));
    };
    const modalConfirmFalse = (e) => {
        e.stopPropagation();
        dispatch(ACtoogles.toogleConfirm(false));
    };
    const handleShowChart = () => {
        setShowChart(!showChart);
    };
    const RenderBodyTable = ({ data }) => {
        return (
            <>
                {data?.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{indexTable(page, limit, index)}</td>
                            <td>
                                {moment(item.dateImport).format('DD/MM/YYYY')}
                            </td>
                            <td>{moneys.VND(item.von)}</td>
                            <td>{moneys.VND(item.ban)}</td>
                            <td>
                                {item.loiNhuan > 0
                                    ? moneys.VND(item.loiNhuan)
                                    : 'Chưa hoàn vốn'}
                            </td>
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
    const deleteAction = async (id) => {
        try {
            await 1;
            alert('DeleteI id: ' + id);
            dispatch(ACtoogles.toogleConfirm(false));
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <div className={`${cx('thongke-container')}`}>
                <h3 className='fz22 mb8'>Thống kê doanh thu</h3>
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
                <div className={`${cx('info-generality')}`}>
                    <div className={`${cx('info-item')}`}>
                        <div className={`${cx('info-item__title')}`}>
                            Tổng doanh thu
                        </div>
                        <div className={`${cx('info-item__value')}`}>
                            {moneys.VND(tongDoanhThu)}
                        </div>
                    </div>
                    <div className={`${cx('info-item')}`}>
                        <div className={`${cx('info-item__title')}`}>
                            Tổng lợi nhuận
                        </div>
                        <div className={`${cx('info-item__value')}`}>
                            {tongLoiNhuan > 0
                                ? moneys.VND(tongLoiNhuan)
                                : 'Chưa hoàn vốn'}
                        </div>
                    </div>
                    <div className={`${cx('info-item')}`}>
                        <div className={`${cx('info-item__title')}`}>
                            Tổng vốn
                        </div>
                        <div className={`${cx('info-item__value')}`}>
                            {moneys.VND(tongVon)}
                        </div>
                    </div>
                </div>
                {showChart ? (
                    <Bar options={options} data={data} />
                ) : (
                    <TableData
                        headers={tkdt.headers}
                        data={dataDoanhThu}
                        totalData={dataTkDoanhThus?.totalData}
                    >
                        <RenderBodyTable data={dataDoanhThu} />
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

export default ThongkeDoanhthu;

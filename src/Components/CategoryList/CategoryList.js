import React, { useState } from 'react';
import className from 'classnames/bind';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useAppContext } from '../../utils';

import styles from './CategoryList.module.css';
import { Link } from 'react-router-dom';
import { getAllProduct } from '../../services/product';
import { ACgetalls } from '../../app/';

const cx = className.bind(styles);
const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));
const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={
            <ArrowForwardIosSharpIcon
                sx={{
                    fontSize: '1rem',
                    color: 'var(--primary-color)',
                    fontWeight: 'bold',
                }}
            />
        }
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
}));
const DATA = [
    {
        id: 1,
        title: 'Điện thoại & Phụ kiện',
        items: [
            {
                name: 'Điện thoại',
            },
            {
                name: 'Máy tính',
            },
            {
                name: 'Máy tính bảng',
            },
            {
                name: 'Pin sạc dự phòng',
            },
            {
                name: 'Tai nghe',
            },
            {
                name: 'Cáp và bộ sạc',
            },
            {
                name: 'Thẻ nhớ',
            },
            {
                name: 'Ốp lưng, bao da',
            },
            {
                name: 'Phụ kiện khác',
            },
        ],
    },
    {
        id: 2,
        title: 'Thiết bị điện tử',
        items: [
            {
                name: 'Máy ảnh',
            },
            {
                name: 'Máy quay phim',
            },
            {
                name: 'Đồng hồ thông minh',
            },
            {
                name: 'Tivi',
            },
            {
                name: 'Máy lạnh',
            },
            {
                name: 'Máy giặt',
            },
            {
                name: 'Tủ lạnh',
            },
            {
                name: 'Máy hút bụi',
            },
            {
                name: 'Máy sấy quần áo',
            },
            {
                name: 'Máy chiếu',
            },
            {
                name: 'Khác',
            },
        ],
    },
];
function CategoryList() {
    const { state, dispatch } = useAppContext();
    const {
        pagination: { page, limit },
    } = state;
    const [expanded, setExpanded] = useState('');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const handleClickSidebar = async (category) => {
        try {
            getAllProduct({
                page,
                limit,
                category,
                dispatch,
                ACgetalls,
            });
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className={`${cx('container')}`}>
            {DATA.map((item, index) => (
                <div key={index}>
                    <Accordion
                        expanded={expanded === item.id}
                        onChange={handleChange(item.id)}
                    >
                        <AccordionSummary
                            aria-controls='panel1d-content'
                            id='panel1d-header'
                            className='cl-primary'
                        >
                            <Typography className='fwb fz12 text-capitalize'>
                                {item.title}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={`${cx('category-list')}`}>
                                {item.items.map((item, index) => (
                                    <Link
                                        to='#'
                                        className={`${cx('category-item')}`}
                                        onClick={() =>
                                            handleClickSidebar(item?.name)
                                        }
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            ))}
        </div>
    );
}

export default CategoryList;

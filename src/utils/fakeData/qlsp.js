const qlsp = {
    headers: {
        name: 'QuanLySanPham',
        column1: { name: 'STT' },
        column2: { name: 'Sản phẩm' },
        column3: { name: 'Ngày nhập', sort: true },
        column4: { name: 'Giá bán' },
        column5: { name: 'Giá sale' },
        column6: { name: 'Đã bán' },
        column7: { name: 'Tồn kho' },
    },
    data: [
        {
            stt: 'QLSP1',
            sanpham: 'Đồng hồ',
            ngay: '01/01/2021',
            giaban: 1300000,
            giasale: 550000,
            daban: 100,
            tonkho: 560,
        },
        {
            stt: 'QLSP2',
            sanpham: 'Điện thoại',
            ngay: '02/01/2021',
            giaban: 1600000,
            giasale: 580000,
            daban: 200,
            tonkho: 600,
        },
    ],
};
export default qlsp;

const tksp = {
    headers: {
        name: 'ThongKeSanPham',
        column1: { name: 'STT' },
        column2: { name: 'Sản phẩm' },
        column3: { name: 'Ngày', sort: true },
        column4: { name: 'Doanh thu' },
        column5: { name: 'Chi phí' },
        column6: { name: 'Lợi nhuận' },
    },
    data: [
        {
            stt: 'SP1',
            sanpham: 'Đồng hồ',
            ngay: '01/01/2021',
            doanhthu: 1300000,
            chiphi: 550000,
            loinhuan: 560000,
        },
        {
            stt: 'SP2',
            sanpham: 'Điện thoại',
            ngay: '02/01/2021',
            doanhthu: 1600000,
            chiphi: 580000,
            loinhuan: 600000,
        },
    ],
};
export default tksp;

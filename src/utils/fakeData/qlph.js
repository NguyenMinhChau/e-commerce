const qlph = {
    headers: {
        name: 'QuanLyPhanHoi',
        column1: { name: 'STT' },
        column2: { name: 'Sản phẩm' },
        column3: { name: 'Ngày tạo', sort: true },
        column4: { name: 'Tên người dùng' },
        column5: { name: 'Đánh giá' },
        column6: { name: 'Nội dung' },
    },
    data: [
        {
            stt: 'QLPH1',
            sanpham: 'Đồng hồ',
            ngay: '01/01/2021',
            tennguoidung: 'Nguyễn Văn A',
            danhgia: '5',
            noidung: 'Sản phẩm tốt',
        },
        {
            stt: 'QLPH2',
            sanpham: 'Điện thoại',
            ngay: '02/01/2021',
            tennguoidung: 'Nguyễn Văn B',
            danhgia: '4',
            noidung: 'Sản phẩm tốt',
        },
    ],
};
export default qlph;

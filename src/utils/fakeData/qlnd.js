const qlnd = {
    headers: {
        name: 'QuanLyNguoiDung',
        column1: { name: 'STT' },
        column2: { name: 'Họ và tên', sort: true },
        column3: { name: 'Email' },
        column4: { name: 'Ngày tạo' },
        column5: { name: 'Role' },
        column6: { name: 'Rank' },
    },
    data: [
        {
            stt: 'QLND1',
            hoten: 'Nguyễn Văn A',
            email: 'nva@gmail.com',
            ngaytao: '01/01/2021',
            role: 'user',
            rank: 'Pro',
        },
        {
            stt: 'QLND2',
            hoten: 'Nguyễn Văn B',
            email: 'nvb@gmail.com',
            ngaytao: '02/01/2021',
            role: 'admin',
            rank: 'Vip',
        },
    ],
};
export default qlnd;

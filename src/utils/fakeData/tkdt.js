const tkdt = {
    headers: {
        name: 'ThongKeDoanhThu',
        column1: { name: 'STT' },
        column2: { name: 'Ngày', sort: true },
        column3: { name: 'Doanh thu' },
        column4: { name: 'Chi phí' },
        column5: { name: 'Lợi nhuận' },
    },
    data: [
        {
            stt: 'DT1',
            ngay: '01/01/2021',
            doanhthu: 1300000,
            chiphi: 550000,
            loinhuan: 560000,
        },
        {
            stt: 'DT2',
            ngay: '02/01/2021',
            doanhthu: 1600000,
            chiphi: 580000,
            loinhuan: 600000,
        },
    ],
};
export default tkdt;

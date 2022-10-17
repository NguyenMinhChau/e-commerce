require('dotenv').config();
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: process.env.SERVICE_MAIL,
    host: process.env.HOST,
    port: process.env.PORT_MAIL,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.MAIL_PASS,
    },
});

function sendMailFunc(email, message, subject) {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        html: message,
    };
    let p = new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                reject(err);
            }
            resolve({ code: 0, message: 'Send Mail successfully' });
        });
    });

    return p;
}
module.exports = sendMailFunc;

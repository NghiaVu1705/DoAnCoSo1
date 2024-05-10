const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Kết nối đến cơ sở dữ liệu MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1q2q2w3w',
    database: 'Restaurant',
    port: 3306
});

// Middleware để xử lý dữ liệu gửi lên từ biểu mẫu
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Định tuyến cho việc đặt bàn
app.post('/book-table', (req, res) => {
    // Nhận thông tin từ biểu mẫu đặt bàn
    const { name, date, time, guests, comment, email, phone } = req.body;

    // Thêm thông tin đặt bàn vào cơ sở dữ liệu
    const sql = "INSERT INTO bookings (name, date, time, guests, comments, email, phone) VALUES (?, ?, ?, ?, ?, ?, ?)";
    connection.query(sql, [name, date, time, guests, comment, email, phone], (error, results) => {
        if (error) {
            console.error('Lỗi khi thêm thông tin đặt bàn vào cơ sở dữ liệu:', error);
            res.status(500).send('Đã xảy ra lỗi khi đặt bàn.');
            return;
        }

        console.log('Đặt bàn thành công:', results);

        // Gửi email thông báo cho khách hàng
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'your_email@gmail.com', // Thay đổi thành email của bạn
                pass: 'your_password' // Thay đổi thành mật khẩu của bạn
            }
        });

        const mailOptionsCustomer = {
            from: 'your_email@gmail.com', // Thay đổi thành email của bạn
            to: email,
            subject: 'Xác nhận đặt bàn thành công',
            text: `Xin chào ${name},\n\nBạn đã đặt bàn thành công tại nhà hàng của chúng tôi. Dưới đây là thông tin đặt bàn của bạn:\nNgày: ${date}\nGiờ: ${time}\nSố lượng khách: ${guests}\nLời nhắn: ${comment}\n\nCảm ơn bạn đã sử dụng dịch vụ của chúng tôi.`
        };

        transporter.sendMail(mailOptionsCustomer, (error, info) => {
            if (error) {
                console.error('Lỗi khi gửi email thông báo cho khách hàng:', error);
            } else {
                console.log('Email thông báo cho khách hàng đã được gửi:', info.response);
            }
        });

        // Gửi thông báo email cho nhà hàng
        const mailOptionsOwner = {
            from: 'your_email@gmail.com', // Thay đổi thành email của bạn
            to: 'vuhieunghia1705@gmail.com', // Thay đổi thành email của nhà hàng
            subject: 'Thông báo đặt bàn mới',
            text: `Bạn nhận được một đơn đặt bàn mới từ khách hàng ${name}. Thông tin đặt bàn:\nNgày: ${date}\nGiờ: ${time}\nSố lượng khách: ${guests}\nLời nhắn: ${comment}\nEmail: ${email}\nSố điện thoại: ${phone}`
        };

        transporter.sendMail(mailOptionsOwner, (error, info) => {
            if (error) {
                console.error('Lỗi khi gửi email thông báo cho nhà hàng:', error);
            } else {
                console.log('Email thông báo cho nhà hàng đã được gửi:', info.response);
            }
        });

        res.status(200).send('Đặt bàn thành công. Vui lòng kiểm tra email của bạn.');
    });
});

app.listen(port, () => {
    console.log(`App đang lắng nghe tại http://localhost:${port}`);
});

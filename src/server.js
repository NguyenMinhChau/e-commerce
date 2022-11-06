require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const router = require('./Routers');
const db = require('./Utils/connectDB');
const PORT = process.env.PORT || 8000;
const app = express();

db.connect();

app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        origin: true,
        credentials: true,
        optionSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
);
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.static(path.join(__dirname, '/uploads/')));
app.use(morgan('common'));
router(app);

app.listen(PORT, () => {
    console.log(`Server running port ${PORT}`);
});

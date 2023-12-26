const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()

const usersRouter = require('./routes/users');
const usersRefreshToken = require ('./routes/refreshToken');

const app = express();


app.listen(process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT}`);
})
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/refresh-token', usersRefreshToken);

module.exports = app;

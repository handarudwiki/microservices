const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const indexRouter = require('./routes/index');
const mediaRouter = require('./routes/media');

const app = express();
app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false, limit: '50mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/media', mediaRouter);

console.log(process.env.PORT)
app.listen(process.env.PORT, ()=>{
    console.log('listening on port ' + process.env.PORT + Date.now())
})

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const mediaRouter = require('./routes/media');
const authRouter = require('./routes/auth');
const courseRouter = require('./routes/course');
const refreshTokenRouter = require('./routes/refreshToken');
const userRouter = require('./routes/user');
const mentorRouter = require('./routes/mentor');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT,()=>{
  console.log(`listening on ${process.env.PORT}`);
})

app.use('/media', mediaRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/courses', courseRouter);
app.use('/refresh-token', refreshTokenRouter);
app.use('/mentors',mentorRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

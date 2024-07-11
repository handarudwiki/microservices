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
const chapterRouter = require('./routes/chapter')
const lessonRouter = require('./routes/lesson')
const imageCourseRouter = require('./routes/imageCourse')
const myCourseRouter = require('./routes/myCourse')
const reviewRouter = require('./routes/review'); 
const verifyTioken = require('./middleware/verifyTioken');
const can = require('./middleware/permission')
const webhookRouter = require('./routes/webhook')
const orderrouter = require('./routes/order')

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

app.use('/media', verifyTioken,can('admin', 'student'),mediaRouter);
app.use('/users', userRouter);
app.use('/', authRouter);
app.use('/chapters', verifyTioken, can('admin'),chapterRouter)
app.use('/reviews', verifyTioken,can('admin', 'student'),reviewRouter)
app.use('/image-courses', verifyTioken,can('admin'),imageCourseRouter)
app.use('/my-courses',verifyTioken,can('admin', 'student'),myCourseRouter)
app.use('/lessons', verifyTioken,can('admin'),lessonRouter)
app.use('/courses', courseRouter);
app.use('/refresh-token', refreshTokenRouter);
app.use('/mentors',verifyTioken,can('admin'),mentorRouter)
app.use('/webhook', webhookRouter)
app.use('/orders', verifyTioken,can('admin', 'student'),orderrouter)

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

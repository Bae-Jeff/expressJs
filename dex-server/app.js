var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
/** helper  */
require('./helpers/utils');


/** 데이나 베이스 설정 시작*/
var Mysql = require('node-mysql-promise');
global.db = Mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'db_guma'
});
/** 데이나 베이스 설정 끝*/

var app = express();



/** router res 확장 함수*/
app.use((req, res, next) => {
  res.echo = function (params = {}) {

    if (Object.keys(params).length === 0) {
      return res.status(401).json({ status: 0, message: '정확한 포맷데이타를 전달하세요.', code: 'E001' });
    }

    var responseData = {
      state: params.state || 1,
      msg: params.msg || "",
      code: params.code || "0000",
      data: params.data || null,
    }
    const accept = req.get('accept');
    if (accept && accept.includes('application/json')) {
      res.json(responseData);
    } else {
      res.send(responseData);
    }
  };

  res.error = function (params = {}) {

    if (Object.keys(params).length === 0) {
      return res.status(401).json({ status: 0, message: '정확한 ERROR포맷데이타를 전달하세요.', code: 'E002' });
    }
    var responseError = {
      state: params.state || 0,
      msg: params.msg || "",
      code: params.code || "E0003",
      data: params.data || null,
    }
    return res.status(401).json(responseError);
  };

  next();
});
/** outer res 확장 함수 끝*/


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('json spaces', 2); // json output 이쁘게


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var itemRouter = require('./routes/item');
var bbsRouter = require('./routes/bbs');
var mainRouter = require('./routes/main');


/** session 설정 */
app.use(session({
  secret: 'goguma-Server-SessKey-$@#!',
  resave: false,
  saveUninitialized: true
}));
/** seeeion 설정 끝 */


/** cors 설정 */
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인에서 요청 허용
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
/** */

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/item', itemRouter);
app.use('/bbs', bbsRouter);
app.use('/main', mainRouter);
// catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;

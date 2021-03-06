var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var settings = require('./settings');
var flash = require('connect-flash');

var index = require('./routes/index');
// var user = require('./routes/user');
// var post = require('./routes/post');
// var reg = require('./routes/reg');
// var login = require('./routes/login');
// var logout = require('./routes/logout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());
app.use(session({
  secret: settings.cookieSecret,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    url: settings.url
  })
}));

app.use(function (req, res, next) {
  app.locals.user = function () {
    return req.session.user;
  };
  app.locals.regValidate = {
    statusStr: '',
    success: function () {
      var succ = this.statusStr = req.flash('success');
      if (succ.length) {
        return succ;
      } else {
        return null;
      }
    },
    error: function () {
      var err = this.statusStr = req.flash('error');
      if (err.length) {
        return err;
      } else {
        return null;
      }
    }
  };
  next();
});

app.use('/', index);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
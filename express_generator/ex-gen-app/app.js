const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const validator = require('express-validator');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const helloRouter = require('./routes/hello');
const ajaxRouter = require('./routes/ajax');
const feedRouter = require('./routes/feed');
const dbRouter = require('./routes/db');
const bookshelfRouter = require('./routes/bookshelf');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const SESSION_OPTION = {
  secret: 'keybord cat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 }
};
app.use(session(SESSION_OPTION));
app.use(validator());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hello', helloRouter);
app.use('/ajax', ajaxRouter);
app.use('/feed', feedRouter);
app.use('/db', dbRouter);
app.use('/bookshelf', bookshelfRouter);

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

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const todoRouter = require('./routes/todoRouter');
const errorRouter = require('./routes/errorRouter');
const productRouter = require('./routes/products');

// MongoDB 連線
require('dotenv').config();
const { MONGO_ROOT_USERNAME, MONGO_ROOT_PASSWORD } = process.env;
const mongoose = require('mongoose');
const username = encodeURIComponent(MONGO_ROOT_USERNAME);
const password = encodeURIComponent(MONGO_ROOT_PASSWORD);
const dbName = 'docker-sample-products';
const authMechanism = 'DEFAULT';
console.log(MONGO_ROOT_USERNAME, MONGO_ROOT_PASSWORD);
console.log(process.env.MONGODB_URI);
const connectionString =
  process.env.MONGODB_URI ||
  `mongodb://${username}:${password}@localhost:27017/${dbName}?authMechanism=${authMechanism}`;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB 已經連線');
  })
  .catch((err) => console.log(err));
// MongoDB 連線 End

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/todos', todoRouter);
app.use('/error', errorRouter);
app.use('/product', productRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

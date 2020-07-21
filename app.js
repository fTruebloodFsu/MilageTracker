var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var CreateNewUserRouter = require('./routes/CreateNewUser');
var CheckAvailabiltyRouter = require('./routes/CheckUserNameAvailability');
var VerifyUserRouter = require('./routes/verifyUserAndPassword');
var beginTripRouter = require('./routes/startTrip');
var TripsWithNoEndRouter = require('./routes/TripsWithNoEnd');
var UpdateTripRouter = require('./routes/UpdateTrip');
var TripsByDateAndUserRouter = require('./routes/GetTripsByDateAndUser');

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
app.use('/CreateNewUser', CreateNewUserRouter);
app.use('/CheckUserNameAvailability', CheckAvailabiltyRouter);
app.use('/verifyUserAndPassword', VerifyUserRouter);
app.use('/startTrip', beginTripRouter);
app.use('/TripsWithNoEnd', TripsWithNoEndRouter);
app.use('/UpdateTrip', UpdateTripRouter);
app.use('/GetTripsByDateAndUser', TripsByDateAndUserRouter);

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

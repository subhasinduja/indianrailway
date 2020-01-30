var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var request = require('request');
const indexRoutes = require('./routes/index');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

 app.use('/', indexRoutes);
 app.use('/route', indexRoutes);
// app.get('/',function(req,res){
//   res.sendFile(path.join(__dirname+'/public/index.html'));
//   //__dirname : It will resolve to your project folder.
// });
// app.get('/route',function(req,res){
//   res.sendFile(path.join(__dirname+'/public/route.html'));
//   //__dirname : It will resolve to your project folder.
// });
// app.listen('3003', function(){
//   console.log('running on port 5000');
// });
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

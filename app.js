var express = require('express');
var path = require('path');
var http = require('http');
var config = require('config');
var log = require('libs/log')(module);

var app = express();
//app.set('port', config.get('port'));

app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/template');
app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if (app.get('env') == 'development') {
  app.use(express.logger('dev'));
} else {
  app.use(express.logger('default'));
}
app.use(express.bodyParser());
app.use(express.cookieParser('your secret here'));
app.use(app.router);

app.get('/', function(req, res, next) {
  res.render("index", {
    title: 'Моя первая страница',
    body: '<b>Hello</b>'
  });
});

app.use(express.static(path.join(__dirname, 'public')));


// Middleware

app.use(function(err, req, res, next) {
  if (app.get('env') == 'development') {
    var errorHandler = express.errorHandler();
    errorHandler(err, req, res, next);
  } else {
    res.send(500);
  }
});




//var routes = require('./routes');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');
//
//var index = require('./routes/index');
//var users = require('./routes/users');
//
//
//
//// view engine setup
//app.set('port', process.env.PORT || 3000);
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
//
//// uncomment after placing your favicon in /public
////app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
//
//app.use('/', index);
//app.use('/users', users);
//
//// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  next(err);
//});
//
//// error handler
//app.use(function(err, req, res, next) {
//  // set locals, only providing error in development
//  res.locals.message = err.message;
//  res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//  // render the error page
//  res.status(err.status || 500);
//  res.render('error');
//});
//
//module.exports = app;

http.createServer(app).listen(config.get('port'), function() {
  log.info('Express server listening on port ' + app.get('port'));
});

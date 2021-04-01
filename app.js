var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/student', { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) {
        console.log(err)
    } else {
        console.log('database connection successfully!...........');
    }
});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



var users = require('./models/users');
var login = require('./models/login');
var images = require('./models/images');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//extended image size
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '5000mb' })); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ limit: "5000mb", extended: true, parameterLimit: 5000000000 }))
//app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.json()); //Used to parse JSON bodies
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: 'ubuntu',
    saveUninitialized: true,
    resave: true,
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, "public")));
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
    // res.render('error');
});

// app.listen('80',function(req,res){
//   console.log('nodejs running port 80.........')
// });

module.exports = app;
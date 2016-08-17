var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();

var request = require("request");
var HY = require('./model/HY');
var options = {
    method: 'GET',
    url: 'http://120.27.94.166:2999/getRooms',
    qs: {platform: 'huya', topn: '1000'},
    headers: {
        'postman-token': 'c6513da0-504a-e5b0-b078-c2896a19d92e',
        'cache-control': 'no-cache'
    }
};
var time=[];
for(var i=0;i<60;i++){
    time.push(i);
}
rule.second=time;
request(options, function (error, response, body) {
    if (error) {
        return console.log(error.message);
    }
    var parse = JSON.parse(body);
    var data = parse.data;
    var count=0;
    schedule.scheduleJob(rule, function () {
        if(data.length<=count){
            this.cancel();
            return;
        }
        new HY(data[count].room_id);
        count++;
    });

    console.log(body);
});


module.exports = app;

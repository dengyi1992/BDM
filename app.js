var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var EventEmitter = require('events').EventEmitter;
var myEvents = new EventEmitter();
var routes = require('./routes/index');
var users = require('./routes/users');
var request = require("request");
var HashMap = require("hashmap").HashMap;

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
var time = [];
for (var i = 0; i < 60; i += 15) {
    time.push(i);
}
map = new HashMap();
var Bi = require('./model/Bi');
var config = require("./config.js");
var rooms = [];
var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
var time = [];
for (var i = 0; i < 60; i += 15) {
    time.push(i);
}
rule.minute = time;
function startDm() {
    request('http://120.27.94.166:2999/getRooms?platform=bilibli&topn=' + config.topn, function (error, response, body) {
        if (error) {
            return console.log(error)
        }
        var parse = JSON.parse(body);
        for (var i = 0; i < parse.data.length; i++) {
            var roomId = parse.data[i].room_id;
            rooms.push(parseInt(roomId));
        }
        // rooms.push(55041);

        // rooms.push(427434);

        myEvents.on("dengyi", function (room) {
            Bi.Bi(room);
        });
        for (var i = 0; i < rooms.length; i++) {
            console.log("-------------");
            if (map.get(rooms[i]) == undefined || !map.get(rooms[i])) {
                myEvents.emit("dengyi", rooms[i]);
            }

        }
    });
}
schedule.scheduleJob(rule, function () {
    startDm();

});

startDm();


module.exports = app;

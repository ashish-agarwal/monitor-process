"use strict";

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var dbName = "mongodb://localhost/sample-dev";
// Bootstrap db connection
var db = mongoose.connect(dbName);
mongoose.connection.once('open', function callback() {
    console.log("DB connected " + dbName)
});

mongoose.set('debug', true);

mongoose.connection.on('open', function callback() {
});

mongoose.connection.on('error', function () {
    setTimeout(function () {
        if (mongoose.connection.readyState === 0) {
            db = mongoose.connect(dbName);
        }
    }, 1000);
});

mongoose.connection.on('disconnected', function () {
    setTimeout(function () {
        if (mongoose.connection.readyState === 0) {
            db = mongoose.connect(dbName);
        }
    }, 1000);
});

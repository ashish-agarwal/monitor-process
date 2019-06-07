var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var rp = require('request-promise');
var _ = require('lodash');
var globalStatus = require('./../status');
var io = require('./../socket');

var CronJob = require('cron').CronJob;
new CronJob('*/4 * * * * *', getTheStatus, null, true, 'America/Los_Angeles');

function getTheStatus() {
  var promises = {};
  for (var i = 0; i < 5; i++) {
    promises[(3001 + i).toString()] = callServer(3001 + i)
  }
  return Promise.props(promises)
    .then(function (status) {
      globalStatus.status = status;
      if (globalStatus.socket) {

        globalStatus.socket.emit("status", globalStatus.status);
      }
    }).catch(function (err) {
      console.log(err);
    })
}

function callServer(port) {
  var options = {
    uri: 'http://localhost:' + port,
  };

  return rp(options)
    .then(function ($) {
      return Promise.resolve(true);
    })
    .catch(function (err) {
      return Promise.resolve(false);
    });
}


module.exports = function (io) {


  /* GET home page. */
  router.get('/status', function (req, res, next) {
    return res.send(globalStatus.status)
  });

  router.post('/restart', function (req, res, next) {
    res.send(req.body);
  })
  return router
};

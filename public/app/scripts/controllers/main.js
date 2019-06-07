'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('MainCtrl', ["$scope", "StatusServices", "socket", function ($scope, StatusServices, socket) {
    console.log(StatusServices);


    $scope.status = {};
    StatusServices.getStatus()
      .then(function (res) {
        $scope.status = res.data;
      }).catch(function (err) {
        console.log(err)
      });

    socket.on("status", function (data) {
      console.log(data);
      $scope.status = data;
    });

    $scope.restart = function (name) {
      StatusServices.restart({ name })
        .then(function (res) {
          console.log(res);
        })
    }
  }]);

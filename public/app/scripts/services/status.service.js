
'use strict';

angular.module('publicApp')
  .service('StatusServices', function ($http) {
    var status;

    status = {
      getStatus: function () {
        return $http.get('status');
      },
      restart: function (data) {
        return $http.post('restart', data)
      }
    };

    return status;
  });

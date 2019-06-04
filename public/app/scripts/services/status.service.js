
'use strict';

angular.module('publicApp')
    .service('StatusServices', function ($http) {
        var status;

        status = {
            getStatus: function () {
                return $http.get('status');
            }
        };

        return status;
    });

'use strict';

angular.module('lincorFeApp').controller('rootController', ['Profile', '$scope', '$window',
    function(Profile, $scope, $window) {
        $scope.logout = function() {
            $window.localStorage.clear();
            $window.location.href = '/login';
        };

        Profile.getProfile(function(response) {
            
            $scope.user = response;
        })
    }
]);

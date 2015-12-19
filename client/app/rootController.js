'use strict';

angular.module('lincorFeApp.controllers').controller('rootController', ['$scope', '$window',
    function($scope, $window) {
        $scope.logout = function() {
            $window.localStorage.clear();
            $window.location.href = '/login';
        };
    }
]);

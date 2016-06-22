'use strict';

angular.module('myApp.settings')
    .controller('sidebarController', ['$scope','$location',  function($scope, $location) {
        $scope.isActive = function(viewLocation) {
            return $location.path().includes(viewLocation);
        }
    }]);
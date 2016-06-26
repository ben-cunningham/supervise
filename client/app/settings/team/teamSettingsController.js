'use strict';

angular.module('myApp.settings')
    .controller('TeamSettingsController', ['$scope', '$state', 'Team',  function($scope, $state, Team) {
        $scope.team = Team.getTeam(function() {
            console.log($scope.team);
        });

        $scope.onChange = function(property, name) {

        };

    }]);
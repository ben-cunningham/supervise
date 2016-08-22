'use strict';

angular.module('myApp.settings')
    .controller('TeamSettingsController', ['$scope', '$state', 'Team', 'Estimators',
        function($scope, $state, Team, Estimators) {

            $scope.team = Team.getTeam(function() {
            });

            $scope.onChange = function(property, name) {

            };

            Estimators.getEstimators(function (response) {

                $scope.estimators = response;
            });
            
            $scope.submit = function() {

                Team.editTeam($scope.team.name, function(response) {

                    
                }, function() {

                })
            };
    }]);
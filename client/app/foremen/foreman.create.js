'use strict';

angular.module('myApp.foremen')
  .controller('newForemanCtrl', ['$scope', 'Foremen', 'Jobs',  function($scope, Foremen, Jobs) {
      $scope.foreman =  null;
      $scope.submit = function() {
          console.log($scope.foreman);
          Foremen.addForeman($scope.foreman, function() {

          });
      }
  }
]);

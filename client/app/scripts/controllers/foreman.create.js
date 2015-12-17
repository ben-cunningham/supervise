'use strict';

angular.module('lincorFeApp.controllers')
  .controller('newForemanCtrl', ['$scope', 'Foremen', 'Jobs',  function($scope, Foremen, Jobs) {
      $scope.foreman =  null;
      $scope.submit = function() {
          console.log($scope.foreman);
          Foremen.addForeman($scope.foreman, function() {
              // TODO: add redirect to list
          })
      }
  }
]);

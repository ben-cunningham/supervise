'use strict';

angular.module('myApp.settings')
  .controller('newForemanCtrl', ['$scope', 'Foremen',  function($scope, Foremen) {
      $scope.submit = function() {
          Foremen.inviteForeman($scope.email, function() {
              
          });
      }
  }
]);

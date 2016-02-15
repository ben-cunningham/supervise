'use strict';

angular.module('myApp.foremen')
  .controller('newForemanCtrl', ['$scope', 'InviteForeman',  function($scope, InviteForeman) {
      $scope.submit = function() {
          InviteForeman.invite($scope.email, function() {
              
          });
      }
  }
]);

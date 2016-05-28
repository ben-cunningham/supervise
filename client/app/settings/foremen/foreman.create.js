'use strict';

angular.module('myApp.settings')
  .controller('newForemanCtrl', ['$scope', 'InviteForeman',  function($scope, InviteForeman) {
      $scope.submit = function() {
          InviteForeman.invite($scope.email, function() {
              
          });
      }
  }
]);

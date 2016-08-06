'use strict';

angular.module('myApp.settings')
  .controller('newForemanCtrl', ['$scope', 'Foremen', '$state',  function($scope, Foremen, $state) {
      $scope.submit = function() {

          if ($scope.email.length == 0) {
              return;
          }

          Foremen.inviteForeman($scope.email, function() {

              $state.go('jobs');
          });
      }
  }
]);

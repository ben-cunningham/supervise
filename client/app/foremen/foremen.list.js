'use strict';

angular.module('myApp.foremen')
  .controller('manageForemenCtrl', ['$scope', 'Foremen', function($scope, Foremen) {
        $scope.foremen = Foremen.getForemen(null);

      }
 ]);

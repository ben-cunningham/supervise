'use strict';

angular.module('myApp.settings')
  .controller('manageForemenCtrl', ['$scope', 'Foremen', function($scope, Foremen) {
        $scope.foremen = Foremen.getForemen(null);

      }
 ]);

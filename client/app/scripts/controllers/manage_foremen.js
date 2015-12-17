'use strict';

angular.module('lincorFeApp.controllers')
  .controller('manageForemenCtrl', ['$scope', 'Foremen', function($scope, Foremen) {
        $scope.foremen = Foremen.getForemen(null);

      }
 ]);

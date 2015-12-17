'use strict';

angular.module('lincorFeApp.controllers')
  .controller('foremanDetailCtrl', ['$scope', '$stateParams', 'Foremen', 'Jobs',  function($scope, $stateParams, Foremen, Jobs) {
      $scope.foreman = Foremen.getForeman($stateParams.pk, function() {
          $scope.jobs = [];
          for(var i = 0; i < $scope.foreman.jobs; i++) {
              $scope.jobs.push(Jobs.getJob($scope.foreman.jobs[i], function() {
                  // TODO: implement callback
              }));
          }
      });
  }
]);

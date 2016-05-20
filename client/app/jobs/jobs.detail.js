'use strict';

var job_type = {
  "p" : "Paint",
  "pw" : "Pressure Wash",
  "h" : "hourly"
};

angular.module('myApp.jobs')
  .controller('JobDetailCtrl', ['$scope', '$stateParams', 'Jobs', 'Estimator', '$state',
      function($scope, $stateParams, Jobs, Estimator, $state) {
          $scope.job = Jobs.getJob({ pk: $stateParams.pk }, function() {
              console.log($scope.job);
              $scope.data = [$scope.job.current_hours_spent, $scope.job.budget];
              $scope.job_type = job_type[$scope.job.job_type];
          });

          $scope.editJob = function() {
              $state.go("newJob", {
                  data : $scope.job.pk,
                  isQuote : "n"
              });
          };

          $scope.submitCheckIn = function() {
              Jobs.checkIn($scope.job.pk, $scope.checkInText,
                  function(checkIn) {

                  }, function(error) {

                 });
          };

          $scope.labels = ["Budget", "Hours Spent"];
      }
  ]);

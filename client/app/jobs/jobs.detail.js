'use strict';

var job_type = {
  "p" : "Paint",
  "pw" : "Pressure Wash",
  "h" : "hourly"
};

angular.module('myApp.jobs')
  .controller('JobDetailCtrl', ['$scope', '$stateParams', 'Jobs', 'Estimator', '$state', '$uibModal',
      function($scope, $stateParams, Jobs, Estimator, $state, $uibModal) {
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

          $scope.open = function() {

              var modalInstance = $uibModal.open({
                  animation: true,
                  templateUrl: '../static/jobs/CheckOutModal.html',
                  controller: 'ModalController',
                  resolve : {
                      job : function () {
                              return $scope.job;
                      }
                  }
              });

              modalInstance.result.then(function (item) {

              });
          }
      }
  ]);

angular.module('myApp.jobs')
    .controller('ModalController', function ($scope, $uibModalInstance, job, Inventory, Jobs) {
        $scope.items = Inventory.getList(function() {
            
        });

        $scope.checkOut = function(item, quantity) {

            var itemToPost = {
                "material" : item.pk,
                "quantity" : quantity
            };

            Jobs.checkOut(job.pk, itemToPost,
                function(item) {

                }, function(error) {

                }
            );
        };

        $scope.ok = function () {

            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
);

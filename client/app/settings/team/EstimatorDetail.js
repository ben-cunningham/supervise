(function () {
    'use strict';

    angular.module('myApp.settings').controller('EstimatorDetailController', EstimatorDetailController);

    EstimatorDetailController.$inject = ['$scope', '$stateParams', 'Estimators', 'Jobs'];

    function EstimatorDetailController($scope, $stateParams, Estimators, Jobs) {

        Estimators.getEstimator($stateParams.pk, function (response) {

            console.log(response);
            var params = {
                estimator: response.pk,
            };

            Jobs.getJobs(params, function(jobsResponse) {

                $scope.estimator = response;
                $scope.jobs = jobsResponse;
            }, true);
        });
    }
})();
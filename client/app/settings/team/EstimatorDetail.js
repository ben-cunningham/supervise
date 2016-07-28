(function () {
    'use strict';

    angular.module('myApp.settings').controller('EstimatorDetailController', EstimatorDetailController);

    EstimatorDetailController.$inject = ['$scope', '$stateParams', 'Estimators'];

    function EstimatorDetailController($scope, $stateParams, Estimators) {

        Estimators.getEstimator($stateParams.pk, function (response) {

            $scope.estimator = response;
        });
    }
})();
(function() {
    'use strict';

    angular.module('myApp.jobs').controller('JobListCtrl', JobListController);

    JobListController.$inject = ['$scope', '$filter', 'Jobs'];

    function JobListController($scope, $filter, Jobs) {

        Jobs.getJobs(function(jobs) {

            $scope.jobs = $filter('filter')(jobs, { completed : false });
            $scope.completedJobs = $filter('filter')(jobs, { completed : true });

            if($scope.completedJobs.length == 0) {

                $scope.hasCompleted = false;
            } else {
                
                $scope.hasCompleted = true;
            }
        });
    }

})();



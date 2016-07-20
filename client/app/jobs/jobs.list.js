(function() {
    'use strict';

    angular.module('myApp.jobs').controller('JobListCtrl', JobListController);
    
    JobListController.$inject = ['$scope', 'Jobs'];

    function JobListController($scope, Jobs) {

        $scope.jobs = Jobs.getJobs(function() {

        });
    }

})();



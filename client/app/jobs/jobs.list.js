'use strict';

angular.module('myApp.jobs').controller('JobListCtrl', function($scope, Jobs) {
    $scope.jobs = Jobs.getJobs(function() {
        console.log($scope.jobs);
    });
});

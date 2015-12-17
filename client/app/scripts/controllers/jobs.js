'use strict';

angular.module('lincorFeApp.controllers').controller('JobListCtrl', function($scope, Jobs) {
    $scope.jobs = Jobs.getJobs(function() {
        
    });
});
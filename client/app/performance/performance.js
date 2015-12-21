'use strict';

angular.module('lincorFeApp.controllers').controller('PerformanceCtrl', function($scope, Jobs, Estimators) {

    $scope.labels = [];
    var data = [];

    Jobs.getJobs(function(jobs) {

        for(var i = 0; i < jobs.length; i++) {
            var obj = jobs[i];

            $scope.labels.push(obj['address']);
            data.push(obj['budget']);
        }

        $scope.data = [data];
    });

    // $scope.switchCategory = function(type) {
    //     switch(type) {
    //         case "jobs":
    //
    //             break;
    //         case "estimators":
    //
    //             break;
    //         case "foremen": 
    //             
    //             break;
    //     }
    // };
});

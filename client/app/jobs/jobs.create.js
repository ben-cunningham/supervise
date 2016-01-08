'use strict';

angular.module('myApp.jobs').controller('NewJobCtrl', ['$scope', '$stateParams','Jobs', 'Estimators', 'Quote', 'House', 'Foremen',
    function($scope, $stateParams, Jobs, Estimators, Quote, House, Foremen) {
        $scope.estimators = Estimators.getEstimators(function() {});
        $scope.foremen = Foremen.getForemen(function() {});
        $scope.job = {};

        var pk = null;
        if($stateParams.data) {
            pk = $stateParams.data;
        }

        var quote;
        if(pk != null) {  //creating a job from a quote
            if($stateParams.isQuote === "y") {
                quote = Quote.get({ pk: pk }, function() {
                    var house = House.get({ pk: quote.house }, function() {
                        $scope.job.house = house;
                        $scope.job.budget = quote.quote;
                        $scope.job.estimator = quote.estimator;
                    });
                });

                $scope.submit = function() {
                    Quote.update({ pk : pk}, {
                        state : 1
                    }).$promise.then(
                        function(value) {
                            quote.state = 1;
                            $scope.job.foreman = $scope.job.foreman.pk;
                            $scope.job.house = $scope.job.house.pk;
                            $scope.job.estimator = $scope.job.estimator.pk;
                            Jobs.addJob($scope.job);
                        },
                        function(error) {
                            console.log('failure');
                        }
                    );
                };
            } else {
                $scope.job = Jobs.getJob({ pk : pk }, function(job) {
                    console.log(job);
                });

                $scope.submit = function() {
                    var job = {};
                    job.budget = $scope.job.budget;
                    job.completed = $scope.job.completed;
                    job.current_hours_spent = $scope.job.current_hours_spent;
                    job.job_type = $scope.job.job_type;
                    job.house = $scope.job.house.pk;
                    job.foreman = $scope.job.foreman.pk;
                    job.estimator = $scope.job.estimator.pk;
                    Jobs.updateJob(pk, job, function() {

                    });
                };
            }
        } else {  // new job without quote
            $scope.submit = function() {
                Jobs.addJob($scope.job);
            };
        }
    }
]);

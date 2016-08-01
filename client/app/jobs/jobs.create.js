'use strict';

angular.module('myApp.jobs').controller('NewJobCtrl', ['$scope', '$stateParams','Jobs', 'Estimators', 'Quote', 'Houses', 'Foremen',
    function($scope, $stateParams, Jobs, Estimators, Quote, Houses, Foremen) {

        Estimators.getEstimators(function(response) {
            $scope.estimators = response;
        });

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
                    var house = Houses.getHouse(quote.house.pk, function() {
                        $scope.job.house = house;
                        $scope.job.budget = quote.quote;
                        $scope.job.estimator = quote.estimator;
                        $scope.job.description = quote.description;
                    });
                });

                $scope.submit = function() {

                    if(!isValid()) {
                        return;
                    }

                    if($scope.job.foreman) // if a foreman is being assigned to the job
                        $scope.job.foreman = $scope.job.foreman.pk;

                    $scope.job.house = $scope.job.house.pk;
                    $scope.job.estimator = $scope.job.estimator.pk;
                    $scope.job.images = quote.images.urls;

                    Jobs.addJob($scope.job, function() {

                        Quote.update({ pk : pk}, {
                            state : 1
                        }).$promise.then(
                            function(value) {
                                quote.state = 1;
                            },
                            function(error) {
                                console.log('failure');
                            }
                        );
                    }, function() {

                    })
                };
            }
            else {
                
                Jobs.getJob(pk, function(response) {

                    $scope.job = response;
                });


                $scope.submit = function() {

                    if(!isValid()) {
                        return;
                    }

                    var job = {};
                    job.budget = $scope.job.budget;
                    job.completed = $scope.job.completed;
                    job.current_hours_spent = $scope.job.current_hours_spent;
                    job.job_type = $scope.job.job_type;
                    job.house = $scope.job.house.pk;
                    job.foreman = $scope.job.foreman.pk;
                    job.estimator = $scope.job.estimator.pk;
                    job.description = $scope.job.description;
                    Jobs.updateJob(pk, job, function() {

                    });
                };
            }
        } else {  // new job without quote
            alert("No quote found!");
        }

        function isValid() {
            var valid = true;

            if (!$scope.job.budget) {

                $scope.budgetError = "This field is required";
                valid = false;
            } else {

                $scope.budgetError = "";
            }

            if (!$scope.job.current_hours_spent) {

                $scope.currentHoursSpentError = "This field is required.";
                valid = false;
            } else {

                $scope.currentHoursSpentError = "";
            }


            return valid;
        }
    }
]);

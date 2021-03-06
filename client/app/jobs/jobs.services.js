'use strict';

var URL = "/api/";

angular.module('myApp.jobs').factory('Jobs', function($resource, Teams) {
    var jobs = [], initialized;
    var team = Teams.getTeam();
    var resource = $resource(URL +'teams/' +team +'/' +'jobs/:pk/', { pk :'@pk'}, {
                        update : { method: 'PUT' }
                    });

    var getJobs = function(parameters, completion, shouldReload) {

        
        if (!initialized || shouldReload) {

           resource.query(parameters, function(response) {

               if(response.error) {
                   console.log(response);
               }

               else if(response) {
                   completion(response);
               }

           });
        }
        else {

            completion(jobs);
        };
    };

    var addJob = function(job, completion, errorCompletion) {
        resource.save(job).$promise.then(
            function( value ){
                jobs.push(value);
                completion();
            },
            function(error) {
                errorCompletion();
                alert('error');
            }
        );
    };

    var getJob = function(pk, completion) {

        resource.get({ pk : pk}, function(response) {

            if (response) {

                completion(response);
            }

            initialized = false;
        });
    };

    var updateJob = function(pk, job, completion) {

        if(job) {

            resource.update({ pk : pk}, job).$promise.then(

                function(profile){

                    completion(profile);
                },
                function(error){

                    errorCompletion(error);
                }
            );;
        }
    };

    var checkOut = function(pk, item, success, error) {
        if(item) {
            $resource(URL +'teams/' +team +'/' +'jobs/' +pk +'/checked_out_material').save(item).$promise.then(
                function(item) {
                    success(item);
                },
                function(error) {
                    error(error);
                }
            );
        }
    }
    
    var checkIn = function(pk, text, success, error) {
        console.log(pk);
        if(text) {
            $resource(URL +'teams/' +team +'/' +'jobs/' +pk +'/check_in').save({ "text" :text}).$promise.then(
                function(checkIn) {
                    success(checkIn);
                },
                function(error) {
                    error(error);
                }
            );
        }
    };

    return {
        getJobs : getJobs,
        addJob : addJob,
        getJob : getJob,
        updateJob : updateJob,
        checkIn : checkIn,
        checkOut : checkOut,
    };
});

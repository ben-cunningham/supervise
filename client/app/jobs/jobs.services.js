'use strict';

var URL = "/api/";

angular.module('myApp.jobs').factory('Jobs', function($resource, Teams) {
    var jobs = [], initialized;
    var team = Teams.getTeam();
    var resource = $resource(URL +'teams/' +team +'/' +'jobs/:pk/', { pk :'@pk'}, {
                        update : { method: 'PUT' }
                    });

    var getJobs = function(completion, shouldReload) {
        if (!initialized || shouldReload) {
           jobs = resource.query(completion);
           initialized = true;
        }
        else {
            completion(jobs);
        }

        console.log("KJobs" +jobs);
        return jobs;
    };

    var addJob = function(job) {
        resource.save(job).$promise.then(
            function( value ){
                console.log(value);
                jobs.push(value);
            },
            function( error ){
                alert('error');
            }
        );
    };

    var getJob = function(data, completion) {
        return resource.get({ pk : data.pk}, function() {
            completion();
            initialized = false;
        });
    };

    var updateJob = function(pk, job, completion) {
        if(job) {
            resource.update({ pk : pk}, job);
            if(completion)
                completion();
        }
    };

    return {
        getJobs : getJobs,
        addJob : addJob,
        getJob : getJob,
        updateJob : updateJob,
    };
});

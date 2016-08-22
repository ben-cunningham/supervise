'use strict';

angular.module('myApp.settings')
    .factory('Team', function($resource, Teams) {
        var team = Teams.getTeam();
        var resource = $resource(URL +'teams/' +team, null, {
            update: {method: 'PATCH'},
        });

        var getTeam = function(completion) {
            return resource.get(completion);
        };

        var editTeam = function(data, completion, errorCompletion) {

            resource.update(data).$promise.then(

                function(profile){

                    completion(profile);
                },
                function(error){

                    errorCompletion(error);
                }
            );
        }

        return {
            getTeam : getTeam,
            editTeam : editTeam,
        };
    });

(function() {
    angular.module('myApp.settings')
    .factory('Estimators', Estimator);

    function Estimator($resource, Teams) {
        var team = Teams.getTeam();
        var resource = $resource(URL +'teams/' +team +'/estimators/:pk/', null, {
            update: {method: 'PUT'},
        });

        var getEstimators = function(completion) {

            resource.query(function(response) {

                if(response) {

                    completion(response);
                }
            });
        };

        var getEstimator = function(pk, completion, errorCompletion) {

            resource.get({ pk : pk}, function(data) {

                if (data) {
                    
                    completion(data);
                } else {

                    errorCompletion()
                }
            });
        }

        return {
            getEstimators : getEstimators,
            getEstimator: getEstimator
        };
    }
})();



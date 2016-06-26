'use strict';

angular.module('myApp.settings')
    .factory('Team', function($resource, Teams) {
        var team = Teams.getTeam();
        var resource = $resource(URL +'teams/' +team, null, {
            update: {method: 'PUT'},
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




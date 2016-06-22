'use strict';

angular.module('myApp.settings')
    .factory('Profile', function($resource) {

        var resource = $resource('/api/me', null, {
            update: {
                method: 'PUT'
            }
        });

        var getProfile = function(completion) {
            var me = resource.get(completion);
            return me;
        };

        var editProfile = function(data, completion, errorCompletion) {
            resource.update(data).$promise.then(
                function(profile){
                    completion(profile);
                },
                function(error){
                    errorCompletion(error);
                }
            );
        };

        return {
            getProfile : getProfile,
            editProfile : editProfile,
        };
    });




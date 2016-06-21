'use strict';

angular.module('myApp.settings')
    .factory('Profile', function($resource) {

        var getProfile = function(completion) {
            var me = $resource('/api/me').query(completion);
            return me;
        };

        return {
            getProfile : getProfile,
        };
    });




'use strict';

var URL = "/api/";

angular.module('myApp.settings')
    .factory('Inventory', function($resource, Teams) {
        var team = Teams.getTeam();
        var resource = $resource(URL +'teams/' +team +'/' +'material/:pk/', { pk :'@pk'}, {
            update: {method: 'PUT'},
            query: {method: 'GET', isArray:true}
        });

        var getList = function(completion) {
            var jobs = resource.query(completion);
            return jobs;
        };

        return {
            getList : getList,
        };
    });




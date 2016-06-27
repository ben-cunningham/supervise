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

        var addItem = function(item, completion) {
            resource.save(item).$promise.then(
                function(value){
                    completion(value);
                },
                function( error ){
                    alert('error');
                }
            );
        };

        var getUnitList = function(completion) {
            var units = $resource(URL +'teams/' +team +'/unit_list').query(completion);
            return units;
        };

        return {
            getList : getList,
            addItem : addItem,
            getUnitList: getUnitList,
        };
    });




'use strict';

var URL = "/api/";

angular.module('myApp.settings')
    .factory('InviteForeman', function($resource, Teams) {
        var team = Teams.getTeam();
        var invite = function(email) {
            var data = {
                "email" : email
            };

            $resource(URL +'teams/' +team +'/invite').save(data).$promise.then(
                function( value ){
                    console.log(value);
                },
                function( error ){
                    alert('error');
                }
            );
        };

        return {
            invite : invite,
        };
    });

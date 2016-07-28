(function() {

    'use strict';

    var URL = "/api/";
    var foremen = [], initialized;

    angular.module('myApp.settings').factory('Foremen', Foreman)

    function Foreman($resource, Teams) {

        var resource = $resource(URL + 'foreman/:pk/', { pk :'@pk'});
        var team = Teams.getTeam();

        var getForemen = function(completion) {
           if(!initialized) {
               foremen = resource.query(completion);
               initialized = true;
           }
           else {
             if(completion)
                completion(foremen);
           }
           return foremen;
       };

       var getForeman = function(pk, completion) {

           resource.get({ pk : pk }, function(response) {

               if (response) {
                   completion(response);
               }
           });
       };

       var addForeman = function(data, completion) {
           resource.save(data).$promise.then(
               function(value) {
                   foremen.push(value);
                   if(completion)
                       completion();
               },
               function(error) {
                   alert(error);
               }
           );
       }

        var inviteForeman = function(email) {
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
            getForemen: getForemen,
            getForeman: getForeman,
            addForeman: addForeman,
            inviteForeman: inviteForeman
        };
    }
})()




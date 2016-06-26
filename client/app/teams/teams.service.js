'use strict';

var app = angular.module('myApp.teams');

app.factory('Teams', function($resource, $window) {
    var getTeam = function() {
        var team = $window.localStorage.team;
        return team;
    }

    var setTeam = function(pTeam) {
        $window.localStorage.team = pTeam;
    }

    return {
        getTeam : getTeam,
    };
});

app.factory('Houses', function($resource, Teams) {
    var houses = [], initialized;
    var team = Teams.getTeam();

    var getHouses = function(completion) {
        if (!initialized) {
           houses = $resource(URL +'teams/' +team + '/houses/').query(completion);
           initialized = true;
        }
        else {
            completion(houses);
        }

        return houses;
    };

    var addHouse = function(house, completion) {
        $resource(URL +'teams/' +team + '/houses/').save(house).$promise.then(
            function(value){
                houses.push(value);
                completion(value.pk);
            },
            function(error){
                alert('error');
            }
        );
    };

    var getHouse = function(pk, completion) {
        return $resource(URL + 'teams/' +team +'/houses/' +pk+'/').get(completion);
    };

    return {
        getHouses : getHouses,
        getHouse : getHouse,
        addHouse : addHouse
    };
});

app.factory('House', function($resource) {
    var URL = '/api';
    return $resource(URL + '/houses/:pk/', { pk : '@pk' }, {
        update : { method: 'PUT' },
        delete : { method: 'DELETE' }
    });
});
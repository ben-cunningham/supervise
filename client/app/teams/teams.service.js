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

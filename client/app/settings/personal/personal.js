'use strict';

angular.module('myApp.settings')
    .controller('PersonalSettingsController', ['$scope', 'Profile',  function($scope, Profile) {
        $scope.profile = Profile.getProfile(function () {

        })
    }]);
'use strict';

angular.module('myApp.settings')
    .controller('PersonalSettingsController', ['$scope', 'Profile', '$state',  function($scope, Profile, $state) {
        $scope.profile = Profile.getProfile(function () {

        })
        
        $scope.edit = function() {
            $state.go('settings.personalEdit');
        };
    }]);

angular.module('myApp.settings')
    .controller('EditPersonalSettingsController', ['$scope', 'Profile', '$state',  function($scope, Profile, $state) {
        var data = {
            user : {

            }
        };

        $scope.profile = Profile.getProfile(function() {

        });

        $scope.onChange = function(input, value) {

            // TODO: simplify this, could just be data.user[input] = value;
            switch(input) {
                case "username":
                    data.user.username = value;
                    break;
                case "firstName":
                    data.user.first_name = value;
                    break;
                case "lastName":
                    data.user.last_name = value;
                    break;
                case "email":
                    data.user.email = value;
                    break;
            }
        };

        $scope.submit = function() {
            console.log(data);

            Profile.editProfile(data,
                function(profile) {

                }, function(error) {

                }
            );
        };
    }]);
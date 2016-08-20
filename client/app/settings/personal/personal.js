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
    .controller('EditPersonalSettingsController', ['$scope', 'Profile', 'Upload', '$window',  function($scope, Profile, Upload, $window) {
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

        $scope.readURL = function() {

            var token = $window.localStorage.token;

            if(!token) {
                alert("need token");
            }

            Upload.upload({
                url: '/api/upload/',
                data: { key: [$scope.avatar] },
                headers: { 'Authorization': 'JWT' +token }, // only for html5
            }).then(
                function(resp) {
                    var data = {
                        avatar: resp.data.urls[0]
                    };

                    Profile.editProfile(data,
                        function(response) {

                            
                        }, function() {

                    });

                }, function(resp) {
                    console.log(resp);
                    // handle error
                }, function(evt) {
                    // console.log(evt);
                });

        }

        $scope.submit = function() {
            console.log(data);

            Profile.editProfile(data,
                function(profile) {

                }, function(error) {

                }
            );
        };
    }]);
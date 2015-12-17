'use strict';

angular.module('lincorFeApp.controllers').controller('LoginCtrl', ['$scope', '$state', 'Authentication', '$window',
	function($scope, $state, Authentication, $window) {

		if ($window.localStorage.token != null) {
			$state.go('jobs');
		}
		else {
			$scope.login = function() {
				Authentication.login($scope.username, $scope.password, function() {
					$state.go('jobs');
				});
			};
		}
	}
]);

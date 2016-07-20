(function () {
    'use strict';

    angular
        .module('myApp.shared')
        .directive('loadingSpinner', loadingSpinner);

    loadingSpinner.$inject = ['$http', '$rootScope'];

    function loadingSpinner($http, $rootScope) {
        return {
            restrict: 'A',
            template: '<div class="loading-overlay"><div class="loading-spinner"></div></div>',
            link: function (scope, elm, attrs) {

                if (attrs.$attr.usSpinnerStandalone) return;

                $rootScope.spinnerActive = false;
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (loading) {

                    $rootScope.spinnerActive = loading;
                    if (loading) {

                        elm.removeClass('ng-hide');
                    } else {

                        elm.addClass('ng-hide');
                    }
                });
            }
        };
    }

})();
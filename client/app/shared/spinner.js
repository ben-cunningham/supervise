(function () {
    'use strict';

    angular
        .module('myApp.shared')
        .directive('loadingSpinner', loadingSpinner);

    function loadingSpinner() {
        return {
            restrict: 'A',
            template: '<div class="loading-spinner"></div>',
        };
    }

})();
(function () {
    'use strict';

    angular
        .module('myApp.shared')
        .directive('pre-load-image', preloadImage);

    function preloadImage() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                element.bind('load', function() {
                    // TODO: Implement
                });
                element.bind('error', function(){
                    // TODO: Implement
                });
            }
        };
    }

})();
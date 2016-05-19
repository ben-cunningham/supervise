'use strict';

angular.module('lincorFeApp.services', []);
angular.module('myApp.jobs', ['myApp.teams']);
angular.module('myApp.quotes', ['myApp.teams', 'ngFileUpload']);
angular.module('myApp.foremen', ['myApp.teams']);
angular.module('myApp.performance', []);
angular.module('myApp.teams', ['ngResource']);

var myApp = angular
    .module('lincorFeApp', [
        'ngResource',
        'ui.bootstrap',
        'ui.router',
        'chart.js',
        'lincorFeApp.services',
        'myApp.jobs',
        'myApp.quotes',
        'myApp.foremen',
        'myApp.performance',
    ]);

myApp.run(function($rootScope, $window) {
    if(!$window.localStorage.token) {
        $window.location.href = '/login';
    }

    if(!$window.localStorage.team) {
        $window.location.href = '/login';
    }

    if(!$window.localStorage.is_admin) {
        $window.location.href = '/login';
    }



    // if(!hasNecessaryCredentials()) {
    //     // TODO: Try to re-authenticate?
    //     $window.location.href = '/login';
    // }
});

function hasNecessaryCredentials() {
    if(!$window.localStorage.token) {
        return false;
    }

    if(!$window.localStorage.team) {
        return false;
    }

    if(!$window.localStorage.is_admin) {
        return false;
    }

    return true;
}

myApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('quotes', {
                url : '/quotes',
                templateUrl : '../static/quotes/quotes.list.html',
                controller : 'QuotesCtrl',
                resolve : {
                    authenticate : authenticate
                }
            })
            .state('newQuote', {
                url : '/new-quote',
                templateUrl : '../static/quotes/quotes.create.html',
                controller : 'NewQuoteCtrl',
                resolve : {
                    authenticate : authenticate
                }
            })
            .state('manageForemen', {
                url : '/manage-foremen',
                templateUrl : '../static/foremen/foremen.list.html',
                controller : 'manageForemenCtrl',
                resolve : {
                    authenticate : authenticate
                }
            })
            .state('foremanDetail', {
              url : '/foremen/:pk',
              templateUrl : '../static/foremen/foremen.detail.html',
              controller : 'foremanDetailCtrl',
              resolve : {
                authenticate : authenticate
              }
            })
            .state('newForeman', {
                url : '/new-foreman',
                templateUrl : '../static/foremen/foreman.create.html',
                controller : 'newForemanCtrl',
                resolve : {
                    authenticate : authenticate
                }
            })
            .state('performance', {
                url : '/performance',
                templateUrl : '../static/performance/performance.html',
                controller : 'PerformanceCtrl',
                resolve : {
                    authenticate : authenticate
                }
            })

        function authenticate($q, $window, $location, $timeout) {
            if($window.localStorage.token) {
                return $q.when();
            } else {
                $timeout(function() {
                    $window.location.href = '/login';
                })
                return $q.reject();
            }
        }
    }
]);

myApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}]);

myApp.config(['ChartJsProvider',
    function(ChartJsProvider) {
         ChartJsProvider.setOptions({
             colours: ['#FF5252', '#FF8A80'],
             responsive: false
         });

         ChartJsProvider.setOptions('Line', {
            datasetFill: false
         });
    }
]);

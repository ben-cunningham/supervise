'use strict';

angular.module('lincorFeApp.services', []);
angular.module('myApp.jobs', ['myApp.teams', 'ngSanitize', 'ui.bootstrap', 'myApp.settings']);
angular.module('myApp.quotes', ['myApp.teams', 'ngFileUpload']);
angular.module('myApp.settings', ['myApp.teams', 'ui.bootstrap']);
angular.module('myApp.performance', []);
angular.module('myApp.teams', ['ngResource']);

var myApp = angular
    .module('lincorFeApp', [
        'ngResource',
        'ui.bootstrap',
        'ui.router',
        'lincorFeApp.services',
        'myApp.jobs',
        'myApp.quotes',
        'myApp.settings',
        'myApp.performance',
    ]);

myApp.run(function($rootScope, $window, $http) {
    if(!$window.localStorage.token) {
        $window.location.href = '/login';
    }

    if(!$window.localStorage.team) {
        $window.location.href = '/login';
    }

    if(!$window.localStorage.is_admin) {
        $window.location.href = '/login';
    }

    $http({
        method: 'POST',
        url: 'api/verify-token/',
        data: {
            'token' : $window.localStorage.token
        }
    }).then(function successCallback(response) {
        console.log(response);
    }, function errorCallback(response) {
        $window.localStorage.clear();
        $window.location.href = '/login';
    });
});

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
            .state('performance', {
                url : '/performance',
                templateUrl : '../static/performance/performance.html',
                controller : 'PerformanceCtrl',
                resolve : {
                    authenticate : authenticate
                }
            })
            .state('settings', {
                url: '/settings',
                templateUrl : '../static/settings/settings.html'
            })
            .state('settings.personal', {
                url: '/personal',
                templateUrl : '../static/settings/personal/personal.html',
                controller: 'PersonalSettingsController',
                resolve: {
                    authenticate: authenticate
                }
            })
            .state('settings.team', {
                url: '/team',
                templateUrl: '../static/settings/team.html',
            })
            .state('settings.inventory', {
                url: '/inventory',
                templateUrl: '../static/settings/inventory/inventory.html',
                controller: 'InventoryController',
                resolve: {
                    authenticate : authenticate
                }
            })
            .state('settings.manageForemen', {
                url : '/manage-foremen',
                templateUrl : '../static/settings/foremen/foremen.list.html',
                controller : 'manageForemenCtrl',
                resolve : {
                    authenticate : authenticate
                }
            })
            .state('settings.foremanDetail', {
              url : '/foremen/:pk',
              templateUrl : '../static/settings/foremen/foremen.detail.html',
              controller : 'foremanDetailCtrl',
              resolve : {
                authenticate : authenticate
              }
            })
            .state('newForeman', {
                url : '/new-foreman',
                templateUrl : '../static/settings/foremen/foreman.create.html',
                controller : 'newForemanCtrl',
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
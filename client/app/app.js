'use strict';

angular.module('lincorFeApp.controllers', []);
angular.module('lincorFeApp.services', []);
angular.module('myApp.jobs', []);
angular.module('myApp.quotes', []);
angular.module('myApp.foremen', []);


var myApp = angular
    .module('lincorFeApp', [
        'ngResource',
        'ui.router',
        'chart.js',
        'lincorFeApp.services',
        'lincorFeApp.controllers',
        'myApp.jobs',
        'myApp.quotes',
        'myApp.foremen',
    ]);


myApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('jobs', {
                url : '/',
                templateUrl : '../static/jobs/jobs.list.html',
                controller : 'JobListCtrl',
                resolve : {
                    authenticate : authenticate
                }
            })
            .state('quotes', {
                url : '/quotes',
                templateUrl : '../static/quotes/quotes.html',
                controller : 'QuotesCtrl',
                resolve : {
                    authenticate : authenticate
                }
            })
            .state('jobs-detail', {
                url : '/jobs/:pk',
                templateUrl : '../static/jobs/jobs.detail.html',
                controller : 'JobDetailCtrl',
                resolve : {
                    authenticate : authenticate
                }
            })
            .state('newQuote', {
                url : '/new-quote',
                templateUrl : '../static/quotes/new_quote.html',
                controller : 'NewQuoteCtrl',
                resolve : {
                    authenticate : authenticate
                }
            })
            .state('newJob', {
                url : '/new-job?data&isQuote',
                templateUrl : '../static/jobs/new-job.html',
                controller : 'NewJobCtrl',
                resolve : {
                    authenticate : authenticate
                }
            })
            .state('manageForemen', {
                url : '/manage-foremen',
                templateUrl : '../static/foremen/manage_foremen.html',
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
                templateUrl : '../static/views/performance.html',
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

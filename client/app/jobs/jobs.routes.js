'use strict';

angular.module('myApp.jobs').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
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
            .state('jobs-detail', {
                url : '/jobs/:pk',
                templateUrl : '../static/jobs/jobs.detail.html',
                controller : 'JobDetailCtrl',
                resolve : {
                    authenticate : authenticate
                }
            })
            .state('newJob', {
                url : '/new-job?data&isQuote',
                templateUrl : '../static/jobs/jobs.create.html',
                controller : 'NewJobCtrl',
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
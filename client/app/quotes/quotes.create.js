'use strict';

angular.module('myApp.quotes').controller('NewQuoteCtrl',
    ['$scope', '$stateParams','Quotes', 'Houses', 'Estimators', '$location', '$window', 'Upload',
    function($scope, $stateParams, Quotes, Houses, Estimators, $location, $window, Upload) {

        $scope.showNewHouse = true;

        $scope.createQuote = function() {
            // User wants to add a new house
            // instead of selecting an existing one
            if($scope.showNewHouse){
                Houses.addHouse($scope.newHouse, function(id) {
                    $scope.quote.house = id;
                    addQuote($scope.quote, $scope.files);
                });
            }
            else {
                $scope.quote.house = $scope.house;
                addQuote($scope.quote, $scope.files);
            }
        };

        $scope.quote = null;
        $scope.houses = Houses.getHouses(function() {});

        function addQuote(quote, images) {
            var token = $window.localStorage.token;
            if(!token) {
                alert("need token");
            }
            Upload.upload({
                url: '/api/upload/',
                data: { key: images },
                headers: { 'Authorization': 'JWT' +token }, // only for html5
            }).then(
                function(resp) {
                    quote.images = resp.data.urls;
                    Quotes.addQuote(quote,
                        function() {
                            $location.path('/quotes');
                        },
                        function(error) {
                            alert("Encountered error: " +error);
                        });
                }, function(resp) {
                    console.log(resp);
                    // handle error
                }, function(evt) {
                    // console.log(evt);
                });
        };
    }
]);

'use strict';

angular.module('myApp.quotes').controller('NewQuoteCtrl', ['$scope', '$stateParams','Quotes', 'Houses', 'Estimators', '$window',
    function($scope, $stateParams, Quotes, Houses, Estimators, $window) {

        $scope.showNewHouse = true;

        $scope.toggleNewHouse = function() {
            if($scope.showNewHouse){
                angular.element('.new-house').show();
                angular.element('.existing-house').hide();
                $scope.showNewHouse = true;
            }
            else {
                angular.element('.new-house').hide();
                angular.element('.existing-house').show();
                $scope.showNewHouse = false;
            }
        };

        $scope.toggleNewHouse();

        $scope.quote = null;
        $scope.houses = Houses.getHouses(function() {});

        $scope.createQuote = function() {
            // User wants to add a new house
            // instead of selecting an existing one
            console.log("test");
            if($scope.showNewHouse){
                Houses.addHouse($scope.newHouse, function(id) {
                    $scope.quote.house = id;
                    addQuote($scope.quote);
                });
            }
            else {
                $scope.quote.house = $scope.house;
                addQuote($scope.quote);
            }
        };

        function addQuote(quote) {
            Quotes.addQuote(quote,
                function() {
                    $window.location.href = '/quotes'
                    console.log("controller");
                },
                function(error) {
                    handleQuoteError(error);
                }
            );
        };

        function handleError(error) {
            alert("Encountered error: " +error);
        };
    }
]);

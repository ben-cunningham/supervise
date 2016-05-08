'use strict';

angular.module('myApp.quotes').controller('NewQuoteCtrl', ['$scope', '$stateParams','Quotes', 'Houses', 'Estimators', '$location',
    function($scope, $stateParams, Quotes, Houses, Estimators, $location) {

        $scope.showNewHouse = false;

        $scope.toggleNewHouse = function() {
            $scope.showNewHouse = !$scope.showNewHouse;

            if($scope.showNewHouse){
                angular.element('.new-house').show();
                angular.element('.existing-house').hide();
            }
            else {
                angular.element('.new-house').hide();
                angular.element('.existing-house').show();
            }
        };

        $scope.createQuote = function() {
            // User wants to add a new house
            // instead of selecting an existing one
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

        $scope.toggleNewHouse();

        $scope.quote = null;
        $scope.houses = Houses.getHouses(function() {});1

        function addQuote(quote) {
            Quotes.addQuote(quote,
                function() {
                    $location.path('/quotes');
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

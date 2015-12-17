'use strict';

angular.module('lincorFeApp.controllers').controller('NewQuoteCtrl', ['$scope', '$stateParams','Quotes', 'Houses', 'Estimators',
    function($scope, $stateParams, Quotes, Houses, Estimators) {

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
        $scope.houses = Houses.getHouses(function() {

        });

        $scope.createQuote = function() {
            // User wants to add a new house
            // instead of selecting an existing one
            if($scope.showNewHouse){
                Houses.addHouse($scope.newHouse, function(id) {
                    $scope.quote.house = id;
                    Quotes.addQuote($scope.quote);
                });
            }
            else {
                $scope.quote.house = $scope.house;
                Quotes.addQuote($scope.quote);
            }
        };
    }
]);

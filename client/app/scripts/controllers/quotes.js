'use strict';

angular.module('lincorFeApp.controllers').controller('QuotesCtrl', ['$scope','Quotes', 'House', 'Quote', 'Jobs', '$state',
    function($scope, Quotes, House, Quote, Jobs,  $state) {
        $scope.houses = []

        //  TODO:
        //  Ensure every quote has a house

        $scope.quotes = Quotes.getQuotes(function(quotes) {
            for(var i = 0; i < quotes.length; i++) {
               if(quotes[i].house) {
                  $scope.houses.push(House.get({ pk: quotes[i].house }, null));
               }
               else {
                  $scope.houses.push(House.get({ pk: 1 }, null));
               }
            }
        });

        $scope.bidAccepted = function(pk) {
            $state.go('newJob', {
                 data : pk,
                 isQuote : "y"
             });
        };

        $scope.bidDeclined = function(pk) {
            Quote.update({ pk : pk}, {
                state : 2
            }).$promise.then(
                function(value) {
                    var quote = $scope.quotes.filter(function(obj) {
                      return obj.pk == pk;
                    });
                    quote[0].state = 2;
                },
                function( error ) {
                    console.log('failure');
                }
              );
        };
    }
]);

'use strict';

angular.module('myApp.quotes').controller('QuotesCtrl', ['$scope','Quotes', 'House', 'Quote', 'Jobs', '$state',
    function($scope, Quotes, House, Quote, Jobs,  $state) {

        $scope.quotes = Quotes.getQuotes(function(quotes) {
            console.log(quotes);
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

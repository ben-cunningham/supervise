'use strict';

var URL = "/api/";

angular.module('myApp.quotes').factory('Quotes', function($resource, Teams) {
   var quotes = [], initialized;
   var team = Teams.getTeam();

   var getQuotes = function(completion) {
        if (!initialized) {
           quotes = $resource(URL +'teams/' +team +'/' +'quotes/').query(completion);
           initialized = true;
        } else {
            completion(quotes);
        }

        return quotes;
    };

    var addQuote = function(quote) {
        $resource(URL +'teams/' +team +'/' +'quotes/').save(quote).$promise.then(
            function(value) {
                quotes.push(value);
            },
            function( error ){
                console.log(error);
            }
        );
    };

    // var update = function(pk, data, completion) {
    //     $resource(URL +  'jobs/' +pk).update(data)
    // }

    return {
        getQuotes : getQuotes,
        addQuote : addQuote
    };
});

angular.module('myApp.quotes').factory('Quote', function($resource, Teams) {
    var team = Teams.getTeam();

    return $resource(URL +'teams/' +team +'/' +'quotes/:pk/', { pk : '@pk' }, {
        update : { method: 'PATCH' },
        delete : { method: 'DELETE' }
    });
});

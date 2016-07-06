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

    var addQuote = function(quote, success, error) {
        $resource(URL +'teams/' +team +'/' +'quotes/').save(quote).$promise.then(
            function(value) {
                quotes.push(value);
                success();
            },
            function(error){
                error();
            }
        );
    };

    var uploadImages = function(images, success, error) {
        $resource(URL + 'upload/').save(images).$promise.then(
            function(urls) {
                success(urls);
            },
            function(error) {
                error(error);
            }
        );
    };

    // var update = function(pk, data, completion) {
    //     $resource(URL +  'jobs/' +pk).update(data)
    // }

    return {
        getQuotes : getQuotes,
        addQuote : addQuote,
        uploadImages : uploadImages
    };
});

angular.module('myApp.quotes').factory('Quote', function($resource, Teams) {
    var team = Teams.getTeam();

    return $resource(URL +'teams/' +team +'/' +'quotes/:pk/', { pk : '@pk' }, {
        update : { method: 'PATCH' },
        delete : { method: 'DELETE' }
    });
});

angular.module('myApp.quotes').factory('Images', Images);

function Images() {
    var thumbnail = null;
    var images = [];

    return {
        getThumbnail: getThumbnail,
        setThumbnail: setThumbnail,
        getImages: getImages,
        addImage: addImage,
    }

    function setThumbnail(_thumbnail) {
        thumbnail = _thumbnail;
    }

    function getThumbnail() {
        return thumbnail;
    }

    function getImages() {
        return images;
    }

    function addImage(image) {
        images.push(image);
    }
};

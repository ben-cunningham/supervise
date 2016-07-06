'use strict';

angular.module('myApp.quotes').controller('NewQuoteCtrl',
    ['$scope', '$stateParams','Quotes', 'Houses', 'Estimators', '$location', '$window', 'Upload', 'Images',
    function($scope, $stateParams, Quotes, Houses, Estimators, $location, $window, Upload, Images) {

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
        $scope.images = [];

        $scope.readURLs = function(input) {

            if (input.files) {
                var tuple = [];
                var count = 0;

                for (var i = 0; i <= input.files.length; i++) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        
                        tuple.push(e.target.result);
                        // $scope.images.push(e.target.result);
                        count++;
                        if (count % 3 == 0) {
                            $scope.images.push(tuple);
                            tuple = [];
                        }
                    };

                    reader.readAsDataURL(input.files[i]);
                    reader = new FileReader();
                }
            }
        };

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

        function getThumbnail() {
            var thumbnail = Images.getThumbnail();
            var image = (parseInt(thumbnail.outerindex) * 3) + parseInt(thumbnail.innerIndex);
            return image;
        }
    }
]);

angular.module('myApp.quotes').directive('imagePreview', ImagePreview);

ImagePreview.$inject = ['Images'];

function ImagePreview(Images) {
    return {
        restrict: 'EA',
        template: '<img class="img-responsive" ng-src="{{ imgURL }}">',
        replace: true,
        scope: {},
        link: function (scope, element, attrs) {
            scope.imgURL = attrs.imgSrc;
            element.bind('click', function () {
                
                var selectedEl = angular.element(document.querySelector(".selected"));
                if(selectedEl) {
                    selectedEl.removeClass("selected");
                }

                element.addClass("selected");
                Images.setThumbnail({
                    outer: attrs.outerindex,
                    inner: attrs.innerindex,
                });

            });
        }
    };
}

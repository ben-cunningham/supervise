'use strict';

angular.module('myApp.quotes').controller('NewQuoteCtrl',
    ['$scope', '$stateParams','Quotes', 'Houses', 'Estimators', '$location', '$window', 'Upload', 'Images',
    function($scope, $stateParams, Quotes, Houses, Estimators, $location, $window, Upload, Images) {

        $scope.showNewHouse = true;

        $scope.createQuote = function() {
            // User wants to add a new house
            // instead of selecting an existing one

            if(!isValid()) {
                return;
            }

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

        $scope.quote = {};
        $scope.houses = Houses.getHouses(function() {});
        $scope.images = [];

        $scope.readURLs = function($files, $file, $newFiles, $duplicateFiles, $invalidFiles, $event) {

            var input = $files.slice();

            if (input) {
                var tuple = [];
                var count = 0;

                for (var i = 0; i <= input.length; i++) {
                    var reader = new FileReader();

                    reader.onload = (function(theFile) {
                        return function (e) {

                            tuple.push(e.target.result);
                            count++;

                            if (count % 3 == 0) {
                                $scope.images.push(tuple);
                                tuple = [];
                            }

                            if(count == input.length) {
                                $scope.$apply();
                            }
                        }
                    })(input[i]);

                    reader.readAsDataURL(input[i]);
                }
            }
        };

        function addQuote(quote, images) {
            var token = $window.localStorage.token;
            if(!token) {
                alert("need token");
            }

            console.log(images);

            Upload.upload({
                url: '/api/upload/',
                data: { key: images },
                headers: { 'Authorization': 'JWT' +token }, // only for html5
            }).then(

                function(resp) {
                    // console.log(resp);

                    var thumbnailIndex = getThumbnail();
                    console.log(images);
                    console.log(thumbnailIndex);

                    Upload.upload({
                        url: '/api/upload_thumbnail',
                        data: { image: images[thumbnailIndex] },
                        headers: { 'Authorization': 'JWT' +token },
                    }).then(

                        function(thumbResp) {

                            quote.images = resp.data.urls;
                            quote.thumbnail = thumbResp.data.thumbnail;

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

                }, function(resp) {
                    console.log(resp);
                    // handle error
                }, function(evt) {
                    // console.log(evt);
                });
        };

        function isValid() {

            var valid = true;

            if ($scope.newHouse.address.line1.length < 1) {
                $scope.line1Error = "You must enter a value";
                valid = false;
            }
            else {
                $scope.line1Error = "";
            }

            if ($scope.newHouse.address.city.length < 1) {
                $scope.cityError = "You must enter a value";
                valid = false;
            }

            if ($scope.newHouse.address.state.length != 2) {
                $scope.stateError = "State initials must be two characters long";
                valid = false;
            }

            if ($scope.newHouse.address.zip.length != 6 || $scope.newHouse.address.zip.length != 5) {
                $scope.stateError = "Not a valid zip code";
                valid = false;
            }

            if ($scope.newHouse.address.country.length < 1) {
                $scope.countryError = "You must enter a value";
                valid = false;
            }

            if (!$scope.quote.price) {
                $scope.quoteError = "You must enter a value";
                valid = false;
            }

            return valid;
        }

        function getThumbnail() {
            var thumbnail = Images.getThumbnail();
            var image = (parseInt(thumbnail.outer) * 3) + parseInt(thumbnail.inner);
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

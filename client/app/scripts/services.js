'use strict';

var myApp = angular.module('lincorFeApp.services', ['ngResource']);

var URL = "/api/";

myApp.factory('Authentication', function($resource, $window) {
    var login = function(username, password, completion) {
        var params = {
            'username' : username,
            'password' : password
        };

        $resource(URL + 'login/').save(params).$promise.then(
            function(value) {
                $window.localStorage.token = value['token'];
                completion();
            },
            function(error) {
                alert('Wrong username or password. Try again');
            }
        );
    };

    var logout = function($window, $state) {
      $window.localStorage.removeItem("token");
      $state.go("login");
    };

    return {
        login : login,
        logout : logout
    };
});

myApp.factory('Jobs', function($resource) {
    var jobs = [], initialized;
    var resource = $resource(URL + 'jobs/:pk/', { pk :'@pk'}, {
                        update : { method: 'PUT' }
                    });

    var getJobs = function(completion, shouldReload) {
        if (!initialized || shouldReload) {
           jobs = resource.query(completion);
           initialized = true;
        }
        else {
            completion(jobs);
        }

        return jobs;
    };

    var addJob = function(job) {
        resource.save(job).$promise.then(
            function( value ){
                console.log(value);
                jobs.push(value);
            },
            function( error ){
                alert('error');
            }
        );
    };

    var getJob = function(data, completion) {
        return resource.get({ pk : data.pk}, function() {
            completion();
            initialized = false;
        });
    };

    var updateJob = function(pk, job, completion) {
        if(job) {
            resource.update({ pk : pk}, job);
            if(completion)
                completion();
        }
    };

    return {
        getJobs : getJobs,
        addJob : addJob,
        getJob : getJob,
        updateJob : updateJob,
    };
});

myApp.factory('Quotes', function($resource) {
   var quotes = [], initialized;

   var getQuotes = function(completion) {
        if (!initialized) {
           quotes = $resource(URL +  'quotes/').query(completion);
           initialized = true;
        } else {
            completion(quotes);
        }

        return quotes;
    };

    var addQuote = function(quote) {
        $resource(URL + 'quotes/').save(quote).$promise.then(
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


myApp.factory('Quote', function($resource) {
    return $resource(URL + 'quotes/:pk/', { pk : '@pk' }, {
        update : { method: 'PATCH' },
        delete : { method: 'DELETE' }
    });
});


myApp.factory('Estimators', function($resource) {
    var estimators = [], initialized;

    var getEstimators = function(completion) {
        if (!initialized) {
           estimators = $resource(URL + 'estimators/').query(completion);
           initialized = true;
        }
        else {
            completion(estimators);
        }

        return estimators;
    };

    return {
        getEstimators : getEstimators
    };
});

myApp.factory('Estimator', function($resource) {
    return $resource(URL + 'estimators/:pk/', { pk : '@pk' }, {
        update : { method: 'PUT' },
        delete : { method: 'DELETE' }
    });
});

myApp.factory('Foremen', function($resource) {
   var foremen = [], initialized;
   var resource = $resource(URL + 'foreman/:pk/', { pk :'@pk'});

   var getForemen = function(completion) {
       if(!initialized) {
           foremen = resource.query(completion);
           initialized = true;
       }
       else {
         if(completion)
            completion(foremen);
       }
       return foremen;
   };

   var getForeman = function(pk, completion) {
       return resource.get({ pk : pk }, completion);
   };

   var addForeman = function(data, completion) {
       resource.save(data).$promise.then(
           function(value) {
               foremen.push(value);
               if(completion)
                   completion();
           },
           function(error) {
               alert(error);
           }
       );
   }

   return {
     getForemen : getForemen,
     getForeman : getForeman,
     addForeman : addForeman
   };
});

myApp.factory('Houses', function($resource) {
    var houses = [], initialized;

    var getHouses = function(completion) {
        if (!initialized) {
           houses = $resource(URL + 'houses/').query(completion);
           initialized = true;
        }
        else {
            completion(houses);
        }

        return houses;
    };

    var addHouse = function(house, completion) {
        $resource(URL + 'houses/').save(house).$promise.then(
            function(value){
                houses.push(value);
                completion(value.pk);
            },
            function(error){
                alert('error');
            }
        );
    };

    return {
        getHouses : getHouses,
        addHouse : addHouse
    };
});

myApp.factory('House', function($resource) {
    return $resource(URL + 'houses/:pk/', { pk : '@pk' }, {
        update : { method: 'PUT' },
        delete : { method: 'DELETE' }
    });
});

myApp.config(function($resourceProvider) {
  $resourceProvider.defaults.stripTrailingSlashes = false;
});

myApp.factory('sessionInjector', ['$window', '$location', function($window, $location) {
    var sessionInjector = {
        request: function(config) {
            var token = $window.localStorage.token;
            if(token) {
                config.headers['Authorization'] = "JWT " +token;
            }
            return config;
        },

        responseError : function(rejection) {
            $location.path('/');
        }
    };
    return sessionInjector;
}]);

myApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('sessionInjector');
}]);

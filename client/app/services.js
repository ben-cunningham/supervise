'use strict';

var myApp = angular.module('lincorFeApp.services', ['ngResource', 'myApp.teams']);

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
            return $q.reject(response);
        }
    };
    return sessionInjector;
}]);

myApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('sessionInjector');
}]);

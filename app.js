angular.module("PaginaDirective",['ngRoute','ngResource','ngCookies'])
.config(["$routeProvider","$locationProvider",function(route,location){
    
    location.hashPrefix('');
    route
        .when('/',{

            controller: 'MostrarController',
            templateUrl: 'templates/home.html'
        })
        .when('/characters/',{

            controller: 'MostrarController',
            templateUrl: 'templates/characters.html'
        })
        .when('/tienda/',{

            controller: 'MostrarController',
            templateUrl: 'templates/characters.html'
        });

}]);
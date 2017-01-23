angular.module("PaginaDirective")

.directive("header",[function(){
    return{
        restrict: 'E',
        controller: 'MostrarController',
        templateUrl: 'templates/heads.html'
    };
}])

.directive("foots",[function(){
    return{
        restrict: 'E',
        templateUrl: 'templates/foots.html'
    };
}])

.directive("home",[function(){
    return{
        restrict: 'E',
        controller: 'MostrarController',
        templateUrl: 'templates/home.html'        
    };
}])

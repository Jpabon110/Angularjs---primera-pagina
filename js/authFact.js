angular.module("PaginaDirective")

.factory('authFact',[ "$cookies",function(cook){
    var authFact = {};

       authFact.setAccessToken = function(accessToken){
           cook.put('accessToken', accessToken);
       };

       authFact.getAccessToken = function(){
          authFact.authToken = cook.get('accessToken');
          return authFact.authToken;
       }; 

       authFact.getSession = function(){
          var session = cook.get('session');

          if(session){
              return session;
          }else
          console.log("user no found");
       };

     return authFact;    
}])
angular.module("FinalApp")
.factory("PostResource",["$resource",function(res){
    return res("http://jsonplaceholder.typicode.com/posts/:id",{id: "@id"},{update: {method: "PUT"}});
}])

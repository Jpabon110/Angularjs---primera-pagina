angular.module("PaginaDirective")


.controller("MostrarController",
["$scope","$http","$timeout","$cookieStore","authFact",
function(m,h,time,cook,auth){
    m.posts = [];
    m.newposts = {}; 
    m.editposts = {};
    m.ma= "Mystic Arts";
    m.newSkill = {value: ""};
    m.Skill = [ ];
    m.params = {};
    var username = {};
    var session ={};
    var aux = {};

    m.gmail = {
        username : "",
        email: ""
    };

    if(cook.get("session")){
        console.log("session activa");
    session = cook.get("session");
     setTimeout(function(){                                
            m.gmail.username =session['displayName'];
            m.gmail.gimg = session['image']['url'];
            m.$apply();                                                                                                                                        
        },10);
    }
    

    m.endSession = function(){
        m.gmail = time(m.gmail,100);
        cook.remove("session");  
        gapi.auth.signOut(m.params);
    }

    m.onGoogleLogin = function(){
         
        m.params = {
                'clientid': '159835691626-u283aqh40jhk7ivu2r3qvsecgdl8d3ib.apps.googleusercontent.com',
                'cookiepolicy': 'single_host_origin',
                'callback': function(result){
                    
                        if(result['status']['signed_in']){
                            var request = gapi.client.plus.people.get(
                                {
                                    'userId': 'me'
                                }
                                
                            );
                            request.execute(function(resp){  

                                cook.put("session", resp);  
                                console.log(cook.get("session"));
                                session =  cook.get("session");
                                                                    
                                m.$apply(function(){                                
                                    m.gmail.username =session['displayName'];
                                    m.gmail.gimg = session['image']['url'];                                                                                                                                        
                                });

                            });

                        }else{
                            console.log("user canceled the session");
                        }
                },
                'approvalprompt': 'force',
                'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
                };
            gapi.auth.signIn( m.params);
                       
    }


    h.get("js/personajes.json")
    .then(function(data){
        m.contenidos = data['data'];
        // console.log(m.contenidos);
        m.posts = m.contenidos;
    }).catch(function(error){
        console.log("HAY UN ERROR");        
    });

    m.addSkill = function(){
       m.Skill.push(m.newSkill);
       m.newSkill = {};
    }

    m.removePost = function(post){
        //la funcion filter le copia a su parametro el contenido
        //de la variable a la cual se le ve a filtrar su info
        m.posts = m.posts.filter(function(element){
            // console.log(element);
            return element.id !== post.id;
        });
    }

    m.editar = function(contenido){
        console.log(contenido);
        m.editposts = contenido;
    }

    m.addPost = function(){
     m.newposts.Skill =  m.Skill;   
      
     h.post("js/personajes.json",
     {
         nombre: m.newposts.nombre,
         titulo:  m.newposts.titulo,
         img: m.newposts.img,
         mysticArts: m.newposts.ma,
         skills:m.newposts.Skill 
     })
     .then(function(data,status,headers,config){
         console.log("success call back for the post");                 
         m.posts.unshift(m.newposts);
         console.log(m.posts);
        //  console.log(m.newposts.Skill);
        //  console.log(m.Skill);
         m.newposts = {};
         m.Skill = [];
     })
     .catch(function(error,status,headers,config){
         console.log("Error call back");   
     });
 }
                 

}]);
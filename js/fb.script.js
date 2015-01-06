/* Desarrollado por gomosoft 
   Opensource
   ahora iniciamos el sdk de face :)
*/

     fbRoot = document.createElement("div");
     fbRoot.id = "fb-root";

            (function(d){

     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);

         }(document));


 (function($){

    var boton, data, on = false, filtro = 0, user, call, access_token, user_id;   


    this.ini =  function(vars){
     
         return chkLogin(fbIni());         

     };




   
   this.isOn = function(){

       return on;

   };


   this.obtAcToken = function(){


       return access_token;

   }

   this.obtUserId = function(){

       return user_id;

   }


 
   this.chkLogin =  function (resp) {                   
            

         if(filtro > 0)
          return;

                    if (resp.authResponse) {
                
                  

                        console.log("conectado y con permisos");
                        console.log(resp);
                        access_token = resp.authResponse.accessToken;
                        user_id = resp.authResponse.userID;
                        on = true;
                        boton.remove();
                       
                  
                   
                    } else {

                      console.log("no estamos conectado y por eso pediremos conectarnos a traves"+
                            "de un boton");

                      on = false;

                       actBot("Conectar");
                       
                        boton.click(function() {

                            FB.login(function(resp) {

                                 if (resp.authResponse) {
                                    
                                    console.log("estamos conectados");
                                    console.log(resp);
                                    on = true;
                                    access_token = resp.authResponse.accessToken;
                                    user_id = resp.authResponse.userID;
                                    
                                    location.reload();
                                                                    

                                } else {
                                    
                                    console.log("no tenemos permisos");
                                    return {cod:11,estado:"sin permisos"}
                                }        

                            },data.permisos);
                                
                               
  

                        });
                    }

                     if(call)
                          call();

                        filtro++;

                };
 
  

    this.fbInfo = function(callback){

       
      if(!on)
        return;

 
       FB.api('/me', callback);
                   
  

    };

    this.pubEstado = function(estado,callback){
     
       FB.api(
                  {
                    method: 'status.set',
                    status: estado
                  },
                  callback
                );

    }


    this.fql = function(query,callback){
        
            FB.api({
                     method: 'fql.query',
                     query: query
                     }, 

                     callback
                  );



    };

   
    this.actUser = function(user){

          user = user;
          console.log(user);

    };

    this.fbIni = function() {
               

                    FB.init({ appId: data.id, 
                    status: true, 
                    cookie: true,
                    xfbml: true,
                    oauth: true});  

                    console.log("ahora a validar el estado de la conexion");

                    FB.getLoginStatus( chkLogin );
                    FB.Event.subscribe( 'auth.statusChange', chkLogin );  

                    return this;

         
            };

    this.compartir =  function (link,callback){


      if(!on)
        return;

                var share = {
                    method: 'stream.share',
                    u: link
                };

                FB.ui(share, callback);

            };

     this.publicaGraph = function(vars,callback){
            
  
      if(!on)
        return;

      if(jQuery.isFunction(vars))
          callback = vars;



                this.vars = {

                  message : "Gomosoft, facebook sdk Jquery plugin",
                  link: "http://gomosoft.com",
                  picture: "http://gomosoft.com/img/logo.png",
                  name: "Gomosoft test",
                  description: "Test"

                }
        

              if(vars)
                $.extend(this.vars,vars);

           return FB.api('/me/feed', 'post', this.vars, callback);


            };


    this.actBot = function(texto){

          boton.text(texto);

    }



    jQuery.fn.fb = function(vars,callback){       
    
       boton = $(this);

       if(callback)
           call = callback
       else if(jQuery.isFunction(vars))
           call = vars;

      

       $("body").append("<div id='fb-root'></div>");

        this.vars = {
           id : '213583211996075',          
           permisos : {scope:'email'
          }
        }


         if(vars)
          $.extend(this.vars,vars);


       console.log(this.vars);

       data = this.vars;      

       return fbIni();


    };                  

 

 
})(jQuery);
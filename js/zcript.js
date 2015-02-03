


 var socket, 
     tu, 
     n,
     sonidito = document.createElement('audio'), 
     control = 0,
     me = '',
     inter = undefined,
     title = undefined,
     intControl = true,
     lang = undefined,
     env = $$.environment(),
     txtFocus = ''
     isMobile = env.isMobile;

 sonidito.src = "sonidos/hoo.ogg";

 window = window.top;

function arrancar(user){

	
console.log('user ', user);



 socket = io.connect('http://gomosoft.com:7873');
    
	//sonidito.src = "nokia.mp3";

var multimedia = [];
var inbox = {};
var title = $("title").text();
var lang = user.locale;

fileUp();
iniTranslater();


console.log(lang);

/*

inbox: {
	usuario: {
		nombre: usuario,
		iden: iduser,
		mensajes: [
			{
				mensaje: mensaje,
				from: usuario,
				to: usuario,
				date: hora
			}
		]
	}
}

if (usuarionoesta){
	insertar inboxusuario
	usuario.mensajes[] = mensaje;
}else{
	inbox.usuario.mesajes[] = mensaje;
}

*/

n = user.name;
console.log(n);

tu = {
	nombre: 'Anonimo',
	iden: 'undefined'
};

//var ifr = document.getElementById("transmision");
   // ifr.src = "http://www.youtube.com/embed/LuLw9_JEAsw";



var txtFocus = 'no';
var winFocus = 'si';
window.onblur = function () {
	winFocus = 'no';
};
window.onfocus = function () {
	winFocus = 'si';
};

if (n == null || n == ""){
	var aleatorio = Math.random() * 10000;
	n = 'Anonimo' + aleatorio.toFixed();
}	

		 var OS = (env.os) ? env.os.name + " (" + env.os.version + ")" + " " : "";	
		     OS += (isMobile) ? "Mobile" : "{{OS}} PC";		 	    
		 var userAgent = navigator.userAgent.toLowerCase();
		 var pcOs = userAgent.match("linux") || userAgent.match("windows") || userAgent.match("android") || userAgent.match("mac");

      try{
	
		     console.log(OS);		
		     pcOs = pcOs[0];		     
		 	 console.log(pcOs);		     
   	         OS = (pcOs) ? OS.replace("{{OS}}", pcOs) : OS;
   	         console.log("os", env.os)


		     console.log(OS,userAgent,pcOs,Os);


		    user.onMobile = isMobile;
		    user.OS = OS;

   	     }catch(e){

   	     	 console.log(e);

   	     	 user.onMobile = false;
    		 user.OS = OS;

   	     }

   	         

    console.log(user, 'user two');

	socket.emit('entro', user);

	socket.on('usuarioexiste', function(user){

		return false;

		var nombre = prompt("El usuario ya existe, elige otro nombre", "");

			var usuario = {

			name: nombre,
			id: "jasd9asi912",			
			link: "#"		

			};


		if (usuario == null || usuario == ""){
			
			var aleatorio = Math.random() * 10000;
			
			var nombre = 'Anonimo' + aleatorio.toFixed();
			
			var usuario = {

			name: nombre,
			id: "jasd9asi912",			
			link: "#"		

			};

		}

		socket.emit('entro', usuario);
		n = usuario;

	});

	socket.on('entraste', function(tuRe){

		tu.nombre = tuRe.nombre;
		tu.iden = tuRe.iden;
		me = tu.nombre;

		console.log(tu);

		  	  run();

	});



	socket.on('enviando', function(e){

			var user = e;
			var comando = user.texto.split('::');
			var msgg = 'si';
            


			switch(comando[0]){
			
				case '$alert':
					$alert(comando[1], user.nombre + ' dice:');
					msgg = no;
					break;

				case '$sonidito':
					plaSonidito();
					$('#logs').append('<article class="blue"><strong>' + user.nombre + '</strong><span>está siendo molesto e.e</span></article>');
					msgg = 'no';
					break;
				//case '$redir':
					//window.location.href = comando[1];
					//user.texto = "Adios!!";
					//break;

			   case '$trasmi':			   			
			      var iframe = document.getElementById("transmision");
			      var src  = comando[1];

			       if(src.match(/youtu/) && ! src.match("embed")){
			       	 
			       	 src = youtube_parser(src);
			         src = "http://www.youtube.com/embed/" + src;			      

			       	  }


			       if(src.match(/vimeo/) && ! src.match("player")){
			       	 
			       	 src = vimeo_parser(src);
			       	 src = "//player.vimeo.com/video/" + src;

			       	  }			       
			       	 
			      $("#frameOver").fadeOut();
			      iframe.src = src;
			      		      
			      msgg = 'no';
			   break;

				case '$marquee':
					user.texto = '<marquee class="marquee">' + comando[1] + '</marquee>';
					break;


			   case '$declaracion':

			       declaracion();

			   break;

				case '$reload':
					plaSonidito();
					$confirm('Estan a punto de recargar el chat, ¿estás de acuerdo?','Recargando...',function(r){
						if(r){
							window.location.reload();
						}else{
							$('#logs').append('<article class="red"><span>Has cancelado la recarga</span></article>');
						}
					});
					msgg = 'no';
					break;

				case '$img':
					var mediaa = {
						typo: 'img',
						author: user.nombre,
						date: hora(),
						content: comando[1]
					};
					multimedia.push(mediaa);
					aMedia(mediaa);
					user.texto = '<figure class="media_img"><div><img src="' + comando[1] + '" /></div></figure>';
					break;

				case '$youtube':
					var mediaa = {
						typo: 'youtube',
						author: user.nombre,
						date: hora(),
						content: comando[1]
					};
					multimedia.push(mediaa);
					aMedia(mediaa);
					user.texto = '<figure class="media_youtube"><iframe src="http://www.youtube.com/embed/' + comando[1] + '" frameborder="0" allowfullscreen></iframe></figure>';
					break;

				case '$url':
					user.texto = '<a href="' + comando[1] + '" target="_blank">' + comando[1] + '</a>';
					break;

				case '$borrarchat':
					$('#logs').html('');
					$('#logs').append('<article class="blue"><strong>' + user.nombre + '</strong><span>ha limpiado el historial del chat</span></article>');
					msgg = 'no';
					break;
         

			}

		             var url = false;
		             var cUrl = '';

		              if ( cUrl = user.texto.match('(((f|ht){1}tp://)[-a-zA-Z0-9@:%_+.~#?&//=]+)') ) {

		              	if( user.texto.match(".jpg")  || user.texto.match(".png") || user.texto.match(".gif") )
		                var text = ereg_replace(user.texto,'(((f|ht){1}tp://)[-a-zA-Z0-9@:%_+.~#?&//=]+)','<figure class="media_img pop"><div><img src="' + cUrl[0] + '" /></div></figure>'); 
		                else
		                var text = ereg_replace(user.texto,'(((f|ht){1}tp://)[-a-zA-Z0-9@:%_+.~#?&1//=]+)','<a href="'+ cUrl[0] +'" target="_blank">'+ cUrl[0] +'</a>');
		            	
		            	       
		               var url = true;

		              }else if 
		               ( cUrl = user.texto.match('(((f|ht){1}tps://)[-a-zA-Z0-9@:%_+.~#?&//=]+)') ) {

		               	if( user.texto.match(".jpg")  || user.texto.match(".png") || user.texto.match(".gif") )
		                var text = ereg_replace(user.texto,'(((f|ht){1}tps://)[-a-zA-Z0-9@:%_+.~#?&//=]+)','<figure class="media_img pop"><div><img src="' + cUrl[0] + '" /></div></figure>'); 
		                else
		                var text = ereg_replace(user.texto,'(((f|ht){1}tps://)[-a-zA-Z0-9@:%_+.~#?&//=]+)','<a href="'+ cUrl[0] +'" target="_blank">'+ cUrl[0] +'</a>');
		               
		                var url = true;

		              }else if
		                ( cUrl = user.texto.match('(www.[-a-zA-Z0-9@:%_+.~#?&//=]+)') ) { 

		                var text = ereg_replace(user.texto,'(www.[-a-zA-Z0-9@:%_+.~#?&//=]+)','<a href="'+ cUrl[0] +'" target="_blank">'+ cUrl[0] +'</a>');
		                var url = true;

		              }

			if (url) {					
			
				var text = (text.match("http://wwww.")) ? text.replace("http://","") : text;
				var text = (text.match("https://wwww.")) ? text.replace("https://","") : text;				
				
				if( user.texto.match('youtube.com/watch') || user.texto.match('youtu.be')  ){

					    var mediaa = {
						typo: 'youtube',
						author: user.nombre,
						date: hora(),
						content: ""

					};					

					var id = youtube_parser(cUrl[0]);

					mediaa.content = id;

                   text = text + '<br><figure class="media_youtube"><iframe src="http://www.youtube.com/embed/'+ mediaa.content +'" frameborder="0" allowfullscreen></iframe></figure>';
                   
				multimedia.push(mediaa);
			    aMedia(mediaa);

				}

			    if( user.texto.match(".jpg") || user.texto.match(".png") || user.texto.match(".gif") ){

			    	var mediaa = {
						typo: 'img',
						author: user.nombre,
						date: hora(),
						content: cUrl[0]
					};

					multimedia.push(mediaa);
					aMedia(mediaa);


			    }


				user.texto = text;



			}


		
		   

		isCode = user.texto.match("[code]") && user.texto.match("[/code]") || user.texto.match("{{") && user.texto.match("}}");

		if(isCode){

			user.texto = user.texto
				.replace(/\[code+\]/g, '<div style="position:relative"><i class="icon-pencil3 code-edit" title="edit" data-cmd="edit" data-action></i><pre class="prettyprint"  spellcheck=false contenteditable=false>')
				.replace(/\[\/code\]/g, '</pre>');

			user.texto = user.texto
				.replace(/\{\{/g, '<div style="position:relative"><i class="icon-pencil3 code-edit" title="edit" data-cmd="edit" data-action></i><pre class="prettyprint "  spellcheck=false contenteditable=false>')
				.replace(/\}\}/g, '</pre></div>');


		}
			

			   user.texto = user.texto
				.replace(/\&lt;3/g, '♥');

			user.texto = user.texto
				.replace(/\[s\]/g, '<br />');

			if(!isCode)
			user.texto = user.texto
				.replace(/\.i\./g, '<span class="emoticon emo pene" ></span>')
				.replace(/\¬\¬/g, '<span class="emoticon emo mueca" ></span>')
				.replace(/\;\)/g, '<span class="icon-wink emo" ></span>')
				.replace(/\:\)/g, '<span class="icon-smiley emo" ></span>')
				.replace(/\:D/g, '<span class="icon-grin emo" ></span>')
				.replace(/\:d/g, '<span class="icon-grin emo" ></span>')
				.replace(/\:O/g, '<span class="icon-shocked emo" ></span>')
				.replace(/\:o/g, '<span class="icon-shocked emo" ></span>')
				.replace(/XD/g, '<span class="emoticon xd emo" ></span>')				
				.replace(/\:p/g, '<span class="icon-tongue emo" ></span>')				
				.replace(/\:\@/g, '<span class="icon-angry emo" ></span>')			
				.replace(/\:\|/g, '<span class="icon-neutral emo" ></span>')				
				.replace(/\:\//g, '<span class="icon-wondering emo" ></span>')				
				.replace(/\:\s/g, '<span class="icon-confused emo" ></span>')				
				.replace(/\:\S/g, '<span class="icon-confused emo"></span>')	


			if(msgg == 'si'){
				var me = (user.nombre === tu.nombre) ? "Me" : user.nombre;
				var msg_new = (user.nombre === tu.nombre) ? "" : "msg-new";
				var msgStyle = "margin-left: 31px;width: 85%;text-align: justify;"

				if(strlen(me) > 12)
					me = me.substring(0,12) + "...";
		
					
				var from = "auto";
				var to = (lang.match("en")) ? "en" : "es";
				var text = user.texto;
				var text = encodeURI(text.replace(/<.+>/g,""));
				var too = $("#lang").val();
				var code_edited = (e.code_edited) ? "<span class='pushed'>Code push by " + user.nombre +"</span>" : "";

				
			

				if(too != "nop" )
				{
			

					 var data = {

					 	 text : text,
					 	 lf : "auto|" + too  

					 }


					 translate(data, function(rs){

					 var embed = user.texto.match(/<.+>/);	

					 if(embed)				
					  user.texto = rs.rs.translation + embed[0]
                     else
					  user.texto = rs.rs.translation;

				     $('#logs').append('<article class="msg '+ me +' ' + msg_new + '"><span class="time"><a href="#!/translate" data-text="' + text + '" data-to="' + to + '" title="translate" rel="nofollow" data-translate><img src="img/translate.png" /></a>&nbsp;&nbsp;' + hora() + '</span><strong class="msg-name">' + me + '</strong><span class="msg-wrap">' + code_edited + user.texto + '</span></article>');
				     autoScroll();
	 	  	    	
    	 	         });
 
				}else					 	
				$('#logs').append('<article class="msg '+ me +' '+ msg_new + '"><span class="time"><a href="#!/translate" data-text="' + text + '" data-to="' + to + '" title="translate" rel="nofollow" data-translate><img src="img/translate.png" /></a>&nbsp;&nbsp;' + hora() + '</span><strong class="msg-name">' + me + '</strong><span class="msg-wrap">' + code_edited + user.texto + '</span></article>');
			}

	      if(isCode || e.code_edited)				
			 prettyPrint();

			if (winFocus == 'no'){
				plaSonidito();
				nMensaje();
			}



			if (txtFocus == 'si'){
				socket.emit('visto', {visto: 'si', iden: user.nombre});
				$(".msg-new").removeClass(".msg-new");
			}else{				
				socket.emit('visto', {visto: 'recieved', iden: user.nombre});
			}

				autoScroll();
				$(".actionUser").html('');
	});

	socket.on('visto', function(visto){		

		if (visto.iden != tu.nombre){
			if (visto.visto == 'si'){				
				$('[rel="user_' + visto.iden + '"] .actionUser').html('<i class="icon-checkmark" style="font-size: 10px;'
					                                                    + 'margin-top: -4px;"></i> Seen ' + visto.time);
			}else if(visto.visto === 'recieved'){
				$('#action').html('');
				$('[rel="user_' + visto.iden + '"] .actionUser').html('<i class="icon-undo2" style="font-size: 10px;"></i>');
			}else{
				$('#action').html('');
				$('[rel="user_' + visto.iden + '"] .actionUser').html('');
			}
		}

	});

	socket.on('entro', function(user){

		  if(user.nombre != "{pepito}")
			$('#logs').append('<article class="green"><span class="time">' + hora() + '</span><strong>' + user.nombre + '</strong><span>has joined to the chat</span></article>');
			autoScroll();

	});

	socket.on('salio', function(user){

		 if(user.nombre != "{pepito}")
			$('#logs').append('<article class="red"><span class="time">' + hora() + '</span><strong>' + user + '</strong><span>has left the chat</span></article>');
			autoScroll();
	});



	socket.on('winFocus', function(w){

		console.log(w);
		console.log(tu);
		
		if(w.focused == 'no'){
			
			if(tu.nombre != w.iden)
			$('[alt="user_' + w.iden + '"]').removeClass('borOn');
			else
			$('[alt="user_' + w.iden + '"]').removeClass('borAzul');	
		 		
			$('[alt="user_' + w.iden + '"]').addClass('borBusy');

		}else{

			$('[alt="user_' + w.iden + '"]').removeClass('borBusy');

			if(tu.nombre != w.iden)
			$('[alt="user_' + w.iden + '"]').addClass('borOn');
		    else
		    $('[alt="user_' + w.iden + '"]').addClass('borAzul');
		    	
		}

	});

	socket.on('online', function(user) {

 		var online = -1;

				     console.log(user)


		$('.uonline').html('');
		$.each(user, function(key, value) {
			
			var eresTu = '';
		    var from = (value.onMobile) ? "&nbsp;<span style='text-transform:capitalize' class='source' title='" + value.OS +"'><i class='icon-mobile'></i></span>" : "&nbsp;<span title='" + value.OS +"' style='text-transform:capitalize' class='source'><i class='icon-screen3'></i></span>";
		    var status = (value.focus === "si") ? 'borOn' : 'borBusy'; 

			if (value.nombre === tu.nombre){
				eresTu = 'id="tu"';	
				if($("#me a").length == 0 && value.nombre != "{pepito}"){

					var sName = value.nombre;

					if(value.nombre.split('').length > 12)
						sName = value.nombre.substring(0,12) + "...";

			    	$('#me').prepend('<a href="#"  class="aUser" title="'+ value.nombre +'"><img src="' +value.foto+ '" width="28" class="imgUser borAzul"  alt="user_' +value.nombre+ '" /> &nbsp; ' + sName +'<span class="actionUser"></span> </a>');	
						

				}			
			}else{

			online++;

			if(value.nombre != "{pepito}"){

					var sName = value.nombre;

					if(value.nombre.split('').length > 12)
						sName = value.nombre.substring(0,12) + "...";

			$('.uonline').append('<li rel="user_' + value.nombre + '" ' + eresTu + '><a href="#"  class="aUser" title="'+ value.nombre +'"><img src="' +value.foto+ '" width="28" class="imgUser '+ status +'" alt="user_' + value.nombre   + '" /> <span class="ucont"><span class="nombre">'+ sName + from  + '</span><span class="actionUser"></span> </span></a></li>');


			}

		    }

		});

 		online = (online > 99) ? "99+" : online;

 		online = (online === -1) ? "You" : online;
		
		$(".usersOn").html( online );				

	});

	socket.on('rename',function(newname){
		if ( newname.error == 'username exist'){
			$alert('Ese nombre está siendo ocupado por otro usuario');
		}else{
			$('#logs').append('<article class="blue"><span class="time">' + hora() + '</span><span><strong>' + newname.last + '</strong> se ha cambiado el nombre a <strong>' + newname.now + '</strong></span></article>');
			autoScroll();
		}
	}); 

	socket.on('escribiendo', function(res){

		if(res.user === me)
			return;

		if ( res.writing == 'si'){
					$('#action').html('<span><i class="icon-feather2"></i>...</span>');
			$('[rel="user_' + res.user + '"] .actionUser').html('<i class="icon-feather2" style="font-size:10px"></i>...');
		}else{
			$('#action').html('');
			$('[rel="user_' + res.user + '"] .actionUser').html('');
		}

	});

	socket.on('reconnect', on_reconnected);
	socket.on('disconnect', on_disconnect);
	

	socket.on('privado', function(privado){
		$('#logs').append('<article class="msg"><span class="time">' + hora() + '</span>Mensaje privado de<strong>De <em>' + privado.de +'</strong><span><pre>' + privado.texto + '</pre></span></article>');
		autoScroll();
		if (winFocus == 'no'){
			plaSonidito();
		}

		var msg = {
			mensaje: privado.texto,
			from: privado.de,
			to: privado.para,
			date: hora()
		};

		if(typeof inbox[privado.para] == "undefined"){
			inbox[privado.para] = {
				nombre: privado.para,
				mensajes: [msg]
			}
		}else{
			inbox[privado.para].mensajes.push(msg);
		}

	});

 }

 function on_disconnect(){ $("#overr").show().find(".content").html("Conection lose, Reconnecting <br><br> <image src='img/loader_gray.gif' src='' width='32'>"); }
 function on_reconnected(){ $("#overr").hide(); run(true); }

	function enviar (e, msg) {

		var texto = (!msg) ? $('#mensaje').val() : msg;
		var limpiarspaces = texto.replace(/ /g, '').replace(/\n/g, '');

		var comando = texto.split('::');
		var msgg = 'si';

		switch(comando[0]){

			case '$clear':
				$('#logs').html('');
				$('#logs').append('<article class="blue"><span>Has limpiado tu historial del chat</span></article>');
				autoScroll();
				msgg = 'no';
				break;
			 case '$rename':
				tu.nombre = comando[1];
				socket.emit('rename', comando[1]);
				msgg = 'no';
			break;
			case '$privado':
				var privado = {
					de: tu.nombre,
					para: comando[1],
					texto: comando[2]
				}
				msgg = 'no';
				if (comando[1] == tu.nombre){
					$('#logs').append('<article class="red"><span>No puedes enviarte un mensaje privado a tí mismo</span></article>');
				}else{
					socket.emit('privado', privado);
					$('#logs').append('<article class="msg"><span class="time">' + hora() + '</span><strong>De <em>' + privado.de + '</em> para <em>' + privado.para + '</em></strong><span><pre>' + privado.texto + '</pre></span></article>');
					autoScroll();

					var msg = {
						mensaje: privado.texto,
						from: privado.de,
						to: privado.para,
						date: hora()
					};

					if(typeof inbox[privado.para] == "undefined"){
						inbox[privado.para] = {
							nombre: privado.para,
							mensajes: [msg]
						}
					}else{
						inbox[privado.para].mensajes.push(msg);
					}
				}
				break;
		}

		if (msgg == 'si'){
			if (limpiarspaces == ''){
				$('#logs').append('<article class="red"><span>Debes escribir algo antes de enviarlo</span></article>');
				autoScroll();
			}else{


				var user = {
					nombre: tu.nombre,
					texto: texto
				}

				console.log(tu);
				socket.emit('enviar', user);
			}

		}
		var altodiv = $('#logs').height();

		$('#history').scrollTop( altodiv  );
		$('#mensaje').val('');
		$('#action').html('');
	}


function resize (){
	var menuUsers;
	if( $(window).width() < 767){
		$('#online').hide();
		menuUsers = $('#menuUsers').height();
	}else{
		$('#online').show();
		menuUsers = 0;
	}
	displayUsers = 0;
	var winHeight = $(window).height() - $('#hed').height();
	$('#contenedor').height(winHeight);	
	$("#rom").height(winHeight);
	var hisHeigt = winHeight - $('#formulario').height() - 50;
	$('#history').height(hisHeigt);
	$("#media").height(winHeight);
	$("#menuUsers").height(winHeight);
	move_cursor_active();
}

var displayUsers = 0;
function showHideUsers(){
	if( $(window).width() < 767){
		if(displayUsers == 1){
			$('#online').hide();
			displayUsers = 0;
		}else{
			$('#online').show();
			displayUsers = 1;
		}
	}
}


$.fn.cmd = function(){ return $(this).attr("data-cmd"); }
$.fn.target = function(){ return $(this).attr("data-target"); }

function action_controller(e){

	e.preventDefault();
	e.stopPropagation();

	var cmd = $(this).cmd();
	var target = $(this).target();

	console.log(cmd);

	switch(cmd){

		case "toggle":
	  
	      $(target).toggleClass("icon-volume-mute");
		  $("#cSonido").attr("checked", !$("#cSonido").attr("checked"));		

		break;

		case ".toggle":
	  
	      $(target).toggleClass("visible");		  

		break;


		case "edit":

		   var codeWrap = $(this).parents("div:first").find("pre:first").toggleClass("editing-code");
		   var toggle = (codeWrap.attr("contenteditable") === "false") ? true : false;

		   console.log(toggle);

		   codeWrap.attr("contenteditable", toggle);
		   codeWrap.focus();
		   codeWrap.removeClass("prettyprinted");
		   //codeWrap.off("keyup").on("keyup", live_prettyprint);
		   
		   if(toggle)
		   {
		   	$(this).removeClass("icon-pencil3").addClass("icon-checkmark");
		   	$(this).attr("title","done");
		   }
		   else{		   	

		   	var data = tu;
		   	var code = codeWrap.text();
		   	    data.texto = "{{" + code + "}}";
           prettyPrint();
		   socket.emit("code_edited", data ); 

		   $(this).removeClass("icon-checkmark").addClass("icon-pencil3");
		   $(this).attr("title","edit");
		     prettyPrint();
		    }


		break;


		case "switch-tap":		   
		   $("#menu-mobile .active").removeClass("active");
		    $(this).addClass("active");		   	

		    move_cursor_active();

		break;

	}


}


function move_cursor_active(){

	var left = $(".active").offset().left;

	$("#cursor-active").css({
		   	  "-webkit-transform" : "translate3d("+left+"px,0,0)",
		   	  "transform" : "translate3d("+left+"px,0,0)"
		   })

}

function live_prettyprint(){

	$(this).removeClass("prettyprinted");
	prettyPrint();

	return true;
}

function run ( reconnected ) {

	alert('hey')

	if(control > 0)
		return;

	document.addEventListener("backbutton", function(){
		if(displayUsers == 1){
			$('#online').hide();
			displayUsers = 0;
		}else{
			window.close();
		}
	}, false);

	resize();
	
	$(window).resize(resize);

	$('aside').click(showHideUsers);

	$('#goChat').click(function(e){
		$('#logs').show();
		$('#inbox').hide();
		$('#media').hide();
		$('#goChat').addClass('active');
		$('#goInbox').removeClass('active');
		$('#goMedia').removeClass('active');
		autoScroll();
	});

	if(!isMobile)
	$("[data-action]").off("click").live("click", action_controller);
   else
	$$("[data-action]").off('click').on("tap", action_controller);

	historyScrollChecker();

	$('#goInbox').click(function(e){
		$('#inbox').show();
		$('#logs').hide();
		$('#media').hide();
		$('#goInbox').addClass('active');
		$('#goChat').removeClass('active');
		$('#goMedia').removeClass('active');
	});
	$('#goMedia').click(function(e){
		$('#logs').hide();
		$('#inbox').hide();
		$('#media').show();
		$('#goInbox').removeClass('active');
		$('#goChat').removeClass('active');
		$('#goMedia').addClass('active');

		$('#media').html('');

		for (item in multimedia){

			var itemMedia = multimedia[item];
			var contenido;
			switch(itemMedia.typo){
				case 'img': contenido = '<div><img src="' + itemMedia.content + '" /></div>'; break;
				case 'youtube': contenido = '<iframe src="http://www.youtube.com/embed/' + itemMedia.content + '" frameborder="0" allowfullscreen></iframe>'; break;
			}
			var tmp = '<figure class="media_' + itemMedia.typo + '">'
						+ contenido
						+ '<figcaption>Por <strong>' + itemMedia.author + '</strong> a las ' + itemMedia.date + '</figcaption></figure>';
			
			$('#media').append(tmp);

		}

		var txtMedia = $('#media').html().replace(/ /g, '').replace(/\n/g, '');
		if (txtMedia == ''){
			$('#media').append('<pre>No hay multimedia que ver, aún...</pre>');
		}

		var cSscroll = $('#cScroll').is(":checked");
		if (cSscroll){
			var altodiv = $('#media').height();
			$('#history').scrollTop( altodiv );
		}
	});

 
	$('li[rel]').live('click', function(){
		var liuser = $(this).attr('rel').split('_')[1];
		$('#mensaje').val('$privado::' + liuser + '::').focus();
	});

	$('.pop').live('click', function(e){
			 
			 var src = $(this).find("img").attr("src");
			 $("div#pop img").attr("src",src);
			 showPop();

		});

    if(tu.nombre != "{pepito}")
    $('#mensaje').focus();

	$('#formulario').submit(function(e){
		e.preventDefault();
		console.log(tu);
		enviar();
	});

	$('#mensaje').keypress(function(e){
	
	    var enter = e.keyCode;

			if(!e.shiftKey){
				if (enter == '13'){
					e.preventDefault();
					$('#formulario').trigger('submit');
				}
			}

	});

	    $("#dropbox").live("click",function(){
Dropbox.choose({
success: function(files) {
   for(x in files) 
    enviar(null, files[x].link);
},
cancel: function() { console.log("Aborted" ) },
linkType: "direct",
multiselect: true

});
});

	   function writing_time_out(){

			
		var who = {
			user: tu.nombre,
			writing: 'no'
		}


		socket.emit('escribiendo', who);		
		window.clearInterval(window.inte);

	
	   }


	$('#mensaje').on("keyup" , function(e){
		var cleantexto = $('#mensaje').val().replace(/ /g, '').replace(/\n/g, '');
		var writing = 'no';
		
		if (cleantexto != '') {
			writing = 'si';
		}

		var who = {
			user: tu.nombre,
			writing: writing
		}

    if (window.inte) window.clearInterval(window.inte);

	window.inte = setInterval( writing_time_out, 2000);

		socket.emit('escribiendo', who);
		$(this).removeClass("ita");
	});


	$('#mensaje').blur(function(){		
		var txtFocus = 'no';
        
        $(this).addClass("ita");
        
        var who = {
			user: tu.nombre,
			writing: 'no'
		}

		socket.emit('escribiendo', who);

	});


	$('#mensaje').focus(function(){


		
		if($(".msg-new").length > 0){
		  
		  socket.emit('visto', {visto: 'si', iden: tu.nombre});
		  $(".msg-new").removeClass("msg-new");
		   stnMensaje();

		}

		txtFocus = 'si';		

	});

	

	$(window).focus(function(){
		socket.emit('winFocus', {focused: 'si', iden: tu.nombre});
	});

	$(window).blur(function(){
		socket.emit('winFocus', {focused: 'no', iden: tu.nombre});
	});

	$('#help').click(function(e){
		e.preventDefault();
		$alert( '<article>' + $('#helpTxt').html() + '</article>', 'About' );
	});

	if(reconnected)
		FB.api("/me", function(user){ alert('here'); if(!user.error) arrancar(user); else location.reload(); })

	control++;

}

  function aMedia(obj){

   		    var itemMedia = obj;
			var contenido;

			switch(itemMedia.typo){
				case 'img': contenido = '<div ><img src="' + itemMedia.content + '" /></div>'; break;
				case 'youtube': contenido = '<iframe src="http://www.youtube.com/embed/' + itemMedia.content + '" frameborder="0" allowfullscreen></iframe>'; break;
			}

			var fig = document.createElement("figure");
				fig = $(fig);
				fig.attr("class","media_" + itemMedia.typo +" pop");
				fig.html (contenido + '<figcaption>Por <strong>' + itemMedia.author + '</strong> a las ' + itemMedia.date + '</figcaption>');



		    /*fig.click(function(){

		    	popController($(this));

		    });*/

			
			$('#media #conte').append(fig);
		

			if($('#cScroll').is(":checked"))
			  $("#media").animate({ scrollTop : $("#conte").height() },1000);


   }

    function stream(){    	

	   var user = {

			name: "{pepito}",
			id: "jasd9asi912",			
			link: "#"		

		};

		  arrancar(user);

        }



function ereg_replace(tx,rg,ch) { 
   var regEx = new RegExp(rg,"g"); 
   return tx.replace(regEx,ch); 
} 

function nMensaje(){

      if(!intControl){
        $("title").text(title);
      	return;
      }

    var i = 0;
    intControl = false;

	


    inter = setInterval( function() {
    	
    	cTitle(i++);

    } , 1500 );

}

function cTitle(i, phrase){

	    var msgs = $(".msg-new").length;
	var phrase = (msgs < 2) ? "(1) Mensaje nuevo" : "(" + msgs + ") Mensajes nuevos";

    var salida = ( i%2 == 0) ? phrase : title;   
    $("title").text(salida);     
 
}

function stnMensaje(){

	console.log("stnMensaje - " + title);
	$("title").text(title);
	intControl = true;
	window.clearInterval(inter);	

}


function popController(fig){

	    var src = fig.find("img").attr("src");
		console.log(src)
		$("div#pop img").attr("src",src);
		showPop();


}

function ubicaPop(){

	 var pop = $("div#pop"),
	 	 img = $("div#pop img"),
	     dims = {

	       w :  pop.width(),
	       h :  pop.height(),	  

	     };	   

	     console.log( dims.w + " " + dims.h );

	     alert($("div#pop img").width());

	     if(dims.w > 870)
	     {

	     	  img.width(870);

	     	  if(dims.height <= 554){
	     	  	 pop.css({ position : "fixed" });
	     	  	 $("body").css({overflow : "auto"});
	     	  	}

	     	  var lft = pop.width() / 2 ;
	     	  	  lft = lft+34;
	     	  console.log(lft);

	     	  pop.css({ marginLeft : "-" + lft + "px" });

	     	  showPop();

	     }else{

	     	console.log("< 870 & h ");


	     	 if(dims.h <= 554){
	     	  	 pop.css({ position : "fixed" });
	     	  	 $("body").css({overflow : "auto"});
	     	  	}

	     	  var lft = pop.width() / 2 ;
	     	  lft = lft+34;
	     	  console.log(lft);

	     	  pop.css({ marginLeft : "-" + lft + "px" });

	     	  showPop();

	     }
        

}


function showPop(){

	$("div#pop").fadeIn();

	$("div#pop").bind("click",function(){
		hidePop();
	});

	$("div#pop").bind("keyup",function(e){

		alert("hola");

	});

}

function hidePop(){
  
	$("div#pop").hide();
	$("div#pop span.cerrar").unbind("click");

}



function declaracion(){

    var i = 0;
    var msgs = $("#declaracion .box p[class^='frase']");
    $("#declaracion").fadeIn();

    console.log(msgs.length)

    var int_ = self.setInterval(function(){

    	 if(i > 0)
    	 	$(msgs[i-1]).fadeOut();    	      

          writeMsg(msgs[i] , { cursor : i , progress : msgs.length } );

            i++;    

          if( msgs.length == i){
          	           	
          	 window.clearInterval(int_);        

          	}




    }, 4500);

}


function getMsg( el ){
	
	var msg = $(el).text();
	    $(el).text("");
	    $(el).css({ display: "block" });

   return msg;

}



function writeMsg( el , control ){

	var msg = getMsg( el );
	    msg = msg.split('');

	var control = control;

	var i = 0;

	    console.log(msg.length)

	var int_ = self.setInterval(function(){
   	 	   	 	
   	    $(el).append(msg[i]);       
   
          if( msg.length  == i){

          	console.log(control);

          	 if( (control.cursor + 1) == control.progress)
          	 	 fin();
          	 

          	  window.clearInterval(int_);

          }
          	

          	i++;


	},100);

}


function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match&&match[7].length==11){
        return match[7];
    }else{
        alert("Url incorrecta");
    }
}


function vimeo_parser(url){

	 var regExp = /vimeo\.com\/(\w*\/)*(\d+)/;
	 var matches = url.match(regExp);

	 return matches[2];


}

function fin(){

    $("#declaracion").fadeOut(function(){

    		$("#tu_yo").fadeIn();

    });
	  

}


function remove(obj){

	 $(obj).remove();

}


function fileUp(){
  
  changeUp();

  $("*[data-click]").off("click").live("click", function(e){

  	    e.preventDefault();
  	    e.stopPropagation();


  	    var target = $(this).attr("data-target");

  	    $(target).click();

  });


}


function changeUp(){

	$("#sharePic").on("change", function(e){

		 var input = $(this).attr("id");
		     input = document.getElementById(input);

		 if(input.files.length === 0)
		 	 return false;

		var type = input.files[0].type;

		if(!type.match(/jp*|gif|png|tiff/)){

			$alert("Only images files are allowed", "Alert");
			return false;

		}

		 $("#picLoader").show();
		 var data = new FormData();
		 data.append('pic', input.files[0]);

		$.ajax({
  url: 'upload.php',
  data: data,
  processData: false,
  contentType: false,
  type: 'POST',
  success: function(data){
       	
       	var links = data.links;
        
        enviar(null, links.image_link);



  },
  error: function(error){

  	 console.log(error)

  }
});

	});


}


function iniTranslater(){



	 $("[data-translate]").live("click", function(e){

	 	  e.preventDefault();
	 	  e.stopPropagation();



	 	  var _this = $(this);
	 	  var data = {
                text :  _this.attr("data-text") + '',
                lf : "auto|" + _this.attr("data-to") 

	 	  }

	 	  


	 	  console.log("hola");
	 	  console.log(data);
          

	 	  translate(data, function(rs){

	 	  	 console.log(rs);
	 	  	 _this.parents("article.msg:first").find(".msg-wrap:first").text(rs.rs.translation);

	 	  });	 	  
	 	 

	 });

}



function translate(data, callback){

	 if(! (callback instanceof Function) )
	 {

	 	console.log("you must specify, a callback function");
	 	return false;

	 }

	 if(!data)
	 	 return false;

	 $.getJSON("translate.php", data, function(rs){  //you must implement jsonp flow

	 	  	  if(callback instanceof Function)
	 	  	  	  callback(rs);

	 	  });

}


function strlen(str){

	 return str.split('').length;

}

function nl2br (str, is_xhtml) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Philip Peterson
  // +   improved by: Onno Marsman
  // +   improved by: Atli Þór
  // +   bugfixed by: Onno Marsman
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Maximusya
  // *     example 1: nl2br('Kevin\nvan\nZonneveld');
  // *     returns 1: 'Kevin<br />\nvan<br />\nZonneveld'
  // *     example 2: nl2br("\nOne\nTwo\n\nThree\n", false);
  // *     returns 2: '<br>\nOne<br>\nTwo<br>\n<br>\nThree<br>\n'
  // *     example 3: nl2br("\nOne\nTwo\n\nThree\n", true);
  // *     returns 3: '<br />\nOne<br />\nTwo<br />\n<br />\nThree<br />\n'
  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>'; // Adjust comment to avoid issue on phpjs.org display

  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}


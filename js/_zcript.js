
 var socket, 
     tu, 
     sonidito = document.createElement('audio'), 
     control = 0,
     me = '',
     inter = undefined,
     title = undefined,
     intControl = true;

 sonidito.src = "sonidos/bells.ogg";

 window = window.top;

function arrancar(user){

 socket = io.connect('http://gomosoft.com:7873');

    
	//sonidito.src = "nokia.mp3";

var multimedia = [];
var inbox = {};
title = $("title").text();




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

tu = {
	nombre: 'Anonimo',
	iden: 'undefine'
};

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

	socket.on('disconnect', function () {
		$alert('Te has desconectado del seridor, te ecomendamos recargar la aplicación.', 'Te has desconectado');
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
			      iframe.src = comando[1];			      
			      msgg = 'no';
			   break;

				case '$marquee':
					user.texto = '<marquee class="marquee">' + comando[1] + '</marquee>';
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

		              if ( cUrl = user.texto.match('(((f|ht){1}tp://)[-a-zA-Z0-9@:%_+.~#?&//=]+)') ) {

		              	if( user.texto.match(".jpg")  || user.texto.match(".png") || user.texto.match(".gif") )
		                var text = ereg_replace(user.texto,'(((f|ht){1}tp://)[-a-zA-Z0-9@:%_+.~#?&//=]+)','<figure class="media_img"><div><img src="' + cUrl[0] + '" /></div></figure>'); 
		                else
		                var text = ereg_replace(user.texto,'(((f|ht){1}tp://)[-a-zA-Z0-9@:%_+.~#?&//=]+)','<a href="'+ cUrl[0] +'" target="_blank">'+ cUrl[0] +'</a>');
		            	
		            	       
		               var url = true;

		              }else if 
		               ( cUrl = user.texto.match('(((f|ht){1}tps://)[-a-zA-Z0-9@:%_+.~#?&//=]+)') ) {

		               	if( user.texto.match(".jpg")  || user.texto.match(".png") || user.texto.match(".gif") )
		                var text = ereg_replace(user.texto,'(((f|ht){1}tps://)[-a-zA-Z0-9@:%_+.~#?&//=]+)','<figure class="media_img"><div><img src="' + cUrl[0] + '" /></div></figure>'); 
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
				
				if( user.texto.match('youtube.com/watch')  ){

					    var mediaa = {
						typo: 'youtube',
						author: user.nombre,
						date: hora(),
						content: ""

					};

					var tmpVideo = (user.texto.match("wwww.")) ? user.texto.replace("www.","") : user.texto;
					
					//http://www.youtube.com/watch?v=SodpQgZXTy0
					//http://www.youtube.com/watch?feature=player_embedded&v=0h0PLAmTqEc

					var tmpVideo = cUrl[0].split("&");
					tmpVideo = cUrl[0].split("v=");

					tmpVideo = tmpVideo[1].split("&");

					mediaa.content = tmpVideo[0];

                   text = text  +'<br><figure class="media_youtube"><iframe src="http://www.youtube.com/embed/'+ mediaa.content +'" frameborder="0" allowfullscreen></iframe></figure>';
                   
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


		   user.texto = user.texto
				.replace(/\&lt;3/g, '♥');

			user.texto = user.texto
				.replace(/\[s\]/g, '<br />');

			// Emoticones
			user.texto = user.texto
				.replace(/\.i\./g, '<span class="emoticon pene" title=".i."></span>')
				.replace(/\¬\¬/g, '<span class="emoticon mueca" title="¬¬"></span>')
				.replace(/\;\)/g, '<span class="emoticon guinio" title=";)"></span>')
				.replace(/\:D/g, '<span class="emoticon riendo" title=":D"></span>')
				.replace(/\:d/g, '<span class="emoticon riendo" title=":D"></span>')
				.replace(/\:O/g, '<span class="emoticon wow" title=":O"></span>')
				.replace(/\:o/g, '<span class="emoticon wow" title=":O"></span>')
				.replace(/XD/g, '<span class="emoticon xd" title="XD"></span>')
				.replace(/\:\)/g, '<span class="emoticon sonriendo" title=":)"></span>')
				.replace(/\:p/g, '<span class="emoticon lengua" title=":p"></span>')
				.replace(/\:P/g, '<span class="emoticon lengua" title=":P"></span>');

			user.texto = user.texto
				.replace(/\[code+\]/g, '<pre>')
				.replace(/\[\/code\]/g, '</pre>')
				.replace(/\[\[/g, '<code>')
				.replace(/\]\]/g, '</code>');

			user.texto = user.texto
				.replace(/\[code+\]/g, '<pre>')
				.replace(/\[\/code\]/g, '</pre>')
				.replace(/\[\[/g, '<code>')
				.replace(/\]\]/g, '</code>');

			if(msgg == 'si'){
				var me = (user.nombre == tu.nombre) ? "Yo" : user.nombre;
				$('#logs').append('<article class="msg"><span class="time">' + hora() + '</span><strong>' + me + '</strong><span>' + user.texto + '</span></article>');
			}

			autoScroll();

			if (winFocus == 'no'){
				plaSonidito();
				nMensaje();
			}

			if (txtFocus == 'si'){
				socket.emit('visto', {visto: 'si', iden: user.nombre});
			}else{
				socket.emit('visto', {visto: 'no', iden: user.nombre});
			}
	});

	socket.on('visto', function(visto){		

		if (visto.iden != tu.nombre){
			if (visto.visto == 'si'){
				$('#action').html('<span>Visto</span>');
				$('[rel="user_' + visto.iden + '"] .actionUser').html('lo vió');
			}else{
				$('#action').html('');
				$('[rel="user_' + visto.iden + '"] .actionUser').html('');
			}
		}

	});

	socket.on('entro', function(user){

		  if(user.nombre != "{pepito}")
			$('#logs').append('<article class="green"><span class="time">' + hora() + '</span><strong>' + user.nombre + '</strong><span>se ha unido al chat</span></article>');
			autoScroll();

	});

	socket.on('salio', function(user){

		 if(user.nombre != "{pepito}")
			$('#logs').append('<article class="red"><span class="time">' + hora() + '</span><strong>' + user + '</strong><span>ha dejado el chat</span></article>');
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

		$('#online').html('');
		$.each(user, function(key, value) {
			var eresTu = '';
			if (value.nombre == tu.nombre){
				eresTu = 'id="tu"';	
				if($("#me a").length == 0 && value.nombre != "{pepito}")			
				$('#me').append('<a href="'+value.perfil+'" target="_blank" class="aUser"><img src="' +value.foto+ '" width="28" class="imgUser borAzul"  alt="user_' +value.nombre+ '" /> &nbsp; '+value.nombre+'<span class="actionUser"></span> </a>');	
			}else{

			if(value.nombre != "{pepito}")
			$('#online').append('<li rel="user_' + value.nombre + '" ' + eresTu + '><a href="'+value.perfil+'" target="_blank" class="aUser"><img src="' +value.foto+ '" width="28" class="imgUser borOn" alt="user_' +value.nombre+ '" /> <span class="ucont"><span class="nombre">'+ value.nombre  + '</span><span class="actionUser"></span> </span></a></li>');

		    }

		});
		var nOnline = $('#online li').length;
		$('#nOnline').html(nOnline);

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
			$('#action').html('<span><i class="icon-pencil3"></i>Están escribiendo...</span>');
			$('[rel="user_' + res.user + '"] .actionUser').html('<i class="icon-pencil3"></i>');
		}else{
			$('#action').html('');
			$('[rel="user_' + res.user + '"] .actionUser').html('');
		}

	});

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

	function enviar (e) {

		var texto = $('#mensaje').val();
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
			//case '$rename':
			//	tu.nombre = comando[1];
			//	socket.emit('rename', comando[1]);
			//	msgg = 'no';
			//	break;
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
	var hisHeigt = winHeight - $('#formulario').height() - menuUsers - 50;
	$('#history').height(winHeight);
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

function run () {

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



	$('#mensaje').keyup(function(e){
		
		var cleantexto = $('#mensaje').val().replace(/ /g, '').replace(/\n/g, '');
		var writing = 'no';
		if (cleantexto != '') {
			writing = 'si';
		}
		var who = {
			user: tu.nombre,
			writing: writing
		}
		socket.emit('escribiendo', who);
		$(this).removeClass("ita");
	});

	$('#mensaje').focus(function(){
		socket.emit('visto', {visto: 'si', iden: tu.nombre});
		txtFocus = 'si';		
		stnMensaje();

	});

	$('#mensaje').blur(function(){
		socket.emit('visto', {visto: 'no', iden: tu.nombre});
		txtFocus = 'no';
        $(this).addClass("ita");				
	});

	$(window).focus(function(){
		socket.emit('winFocus', {focused: 'si', iden: tu.nombre});
	});

	$(window).blur(function(){
		socket.emit('winFocus', {focused: 'no', iden: tu.nombre});
	});

	$('#help').click(function(e){
		e.preventDefault();
		$alert( '<article>' + $('#helpTxt').html() + '</article>', 'Ayuda' );
	});

	control++;

}

  function aMedia(obj){

   		    var itemMedia = obj;
			var contenido;

			switch(itemMedia.typo){
				case 'img': contenido = '<div><img src="' + itemMedia.content + '" /></div>'; break;
				case 'youtube': contenido = '<iframe src="http://www.youtube.com/embed/' + itemMedia.content + '" frameborder="0" allowfullscreen></iframe>'; break;
			}

			var tmp = '<figure class="media_' + itemMedia.typo + '">'
						+ contenido
						+ '<figcaption>Por <strong>' + itemMedia.author + '</strong> a las ' + itemMedia.date + '</figcaption></figure>';
			
			$('#media #conte').append(tmp);

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

function cTitle(i){
	
    var salida = ( i%2 == 0) ? "Nuevo Mensaje" : title;   
    $("title").text(salida);     
 
}

function stnMensaje(){

	console.log("stnMensaje - " + title);
	$("title").text(title);
	intControl = true;
	window.clearInterval(inter);	

}
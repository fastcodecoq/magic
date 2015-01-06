
var servidor = require('socket.io').listen(7873);

var user = { 
	nombre: 'Anónimo',
	iden: 'undefined'
};

var usuarios = {};

servidor.sockets.on('connection', function(socket){

	var iden = socket.id;

	socket.on('entro', function(user){
		// Filtro AntiAngel
		n = user.name.replace(/</g, '&lt;').replace(/>/g, '&gt;');

		
		user = {

			nombre: n,
			iden: iden,
			foto: "https://graph.facebook.com/"+user.id+"/picture",
			perfil: user.link,
			onMobile : user.onMobile,
			OS : user.OS,
			focus : "si"	

		};

		if(typeof usuarios[n] != "undefined" && user.nombre != "{pepito}"){			
			servidor.sockets.socket(socket.id).emit('usuarioexiste', user);
		}else{

			socket.username = user.nombre;
			usuarios[n] = user;			
			
			var envTU = {
				nombre: user.nombre,
				iden: socket.id,
			};

			servidor.sockets.socket(socket.id).emit('entraste', envTU);
			
			socket.broadcast.emit('entro', user);
			servidor.sockets.emit('online', usuarios);
			console.log('Entro: ' , user);
		}

	});

	socket.on('winFocus', function(e) {

		if(usuarios[e.iden])
		usuarios[e.iden].focus = e.focused;

		servidor.sockets.emit('winFocus', e);
	});



	socket.on('visto', function(e) {
		var date = new Date();
		var mins = (date.getMinutes() < 9) ? "0" + date.getMinutes() : date.getMinutes();
		var hour = date.getHours();
		if( hour > 12)
		{
			hour -= 12;
			mer = "pm"; 	
		}else 
		var mer = "am"; 

		e.time = hour + ":" + mins + mer;
		socket.broadcast.emit('visto', e);
	});

	socket.on('disconnect', function () {

		if(socket.username != "{pepito}"){		
		var user = socket.username;
		delete usuarios[socket.username];		
		socket.broadcast.emit('salio', user);
		socket.broadcast.emit('online', usuarios);

	     }


	});

	socket.on('enviar', function (res) {
		// Ponemos un filtro "AntiDante"
		var nombre = res.nombre.replace(/</g, '&lt;').replace(/>/g, '&gt;');
		var texto = res.texto.replace(/</g, '&lt;').replace(/>/g, '&gt;');

		linea = {
			nombre: nombre,
			texto: texto
		}

		servidor.sockets.emit('enviando', linea);
		console.log(res.nombre + ' dice: ' + res.texto);

	});

	socket.on('escribiendo', function(res){
		servidor.sockets.emit('escribiendo', res);
	});


	socket.on('code_edited', function(user){

		console.log(user);

		var nombre = user.nombre.replace(/</g, '&lt;').replace(/>/g, '&gt;');
		var texto = user.texto.replace(/</g, '&lt;').replace(/>/g, '&gt;');

		linea = {
			nombre: nombre,
			texto: texto,
			code_edited : true
		};


		socket.broadcast.emit('enviando', linea);

	});

	socket.on('rename', function(newname){
		if(typeof usuarios[newname] != 'undefined'){
			servidor.sockets.socket(socket.id).emit('rename', {last: socket.username, now: socket.username, error: 'username exist'});
		}else{
			newname = newname.replace(/</g, '&lt;').replace(/>/g, '&gt;');
			servidor.sockets.emit('rename', {last: socket.username, now: newname});
			user = {
				nombre: newname,
				iden: iden
			}
			delete usuarios[socket.username];
			socket.username = newname;
			usuarios[newname] = user;
			servidor.sockets.emit('online', usuarios);
		}
	});

	socket.on('privado', function(privado){
		if(typeof usuarios[privado.para] != "undefined"){
			servidor.sockets.socket(usuarios[privado.para].iden).emit('privado', privado);
		}
	});
});



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
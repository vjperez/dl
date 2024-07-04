console.log('getMainContenido.js   [loading...]');

jQuery(document).ready(function(){

  console.log('logueado en getMainContenido: ' + logueado);

	var acto = urlParametro('acto');
	switch(acto){
		case 'logout':
			logout();
		break;
		case 'deleteNepe':
			var nepeId = urlParametro('nepeId');
			
			jQuery.getJSON('escritos/deleteNepe.php', {nepeId:nepeId})
			.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
				//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
				if(datos.nepeBorrado)  {  }
				else             {   }
			})
			.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
				var xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
				var path = encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
				jQuery(window.location).attr('href', path);
			});				
		break;
		case 'deleteHerNepes':
			var userId = urlParametro('userId');
			
			jQuery.getJSON('escritos/deleteHerNepes.php', {userId:userId})
			.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
				//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
				if(datos.nepesBorrados > 0)  {  }
				else             {   }
			})
			.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
				var xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
				var path = encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
				jQuery(window.location).attr('href', path);
			});				
		break;
		case null:
		default :
		break;
	}//acto switch

	var look = urlParametro('look');
	switch(look) {
		case 'busca':	
			lookYelScript('looks/busca.html', 'js/busca.js');
		break;
		case 'opciones':
			lookYelScript('looks/opciones.html', 'js/opciones.js');
		break;
		case 'viewNepe':
			lookYelScript('looks/viewNepe.html', 'js/nepe/viewNepe.js');
		break;						
		case 'login':
			if(!logueado){
				lookYelScript('looks/login.html', 'js/dueno/login.js');
				//jQuery(window.location).attr('href', window.location.pathname + '?look=home');	
			}else{  
				var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
				var textoEstatus = 'Error, usuario solicito login look, ... ya logueado.';
				var elError = 'Error humano.';

				var path = encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
				jQuery(window.location).attr('href', path);	
			}	
		break;
		case 'home':
			if(logueado){	
				lookYelScript('looks/home.html', 'js/dueno/home.js');
			}else{  
				//var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
				//var textoEstatus = 'Error, usuario solicito home look, sin estar logueado.';
				//var elError = 'Error humano.';
        let error = 'Error, usuario solicito home look, sin estar logueado.';
				let path = encodeAndGetErrorPath( error ); // 
				window.location.href = path;	
			}
		break;			
		case 'creaNepe':
			if(logueado){	
				lookYelScript('looks/creaNepe.html', 'js/nepe/creaNepe.js');
			}else{  
				var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
				var textoEstatus = 'Error, usuario solicito creaNepe look, sin estar logueado.';
				var elError = 'Error humano.';

				var path = encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
				jQuery(window.location).attr('href', path);	
			}		
		break;
		case 'updateNepe':	
			if(logueado){	
				lookYelScript('looks/updateNepe.html', 'js/nepe/updateNepe.js');
			}else{  
				var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
				var textoEstatus = 'Error, usuario solicito updateNepe look, sin estar logueado.';
				var elError = 'Error humano.';

				var path = encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
				jQuery(window.location).attr('href', path);	
			}	
		break;			
		case 'registro':
			if(!logueado){
				lookYelScript('looks/registro.html', 'js/dueno/registro.js');
				//jQuery(window.location).attr('href', window.location.pathname + '?look=home');
			}else{  
				var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
				var textoEstatus = 'Error, usuario solicito registro look, ... ya logueado.';
				var elError = 'Error humano.';

				var path = encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
				jQuery(window.location).attr('href', path);	
			}
		break;
		case 'recentNepes':
			lookYelScript('looks/recentNepes.html', 'js/nepe/getRecentNepes.js');
		break;			
		case 'administrar':
			lookYelScript('looks/administrar.html', 'js/administrar.js');
		break;		
		case 'faq':
			lookYelScript('looks/faq.html', 'js/faq.js');
		break;
		case 'nada':
			lookYelScript('looks/nada.html', 'js/nada.js');
		break;				
		case 'error':
			lookYelScript('looks/error.html', 'js/error.js');
		break;

		case '':
			//alert('look vacio gmc');
		break;
		case null:
			//alert('look null gmc');
			jQuery(window.location).attr('href', window.location.pathname + '?look=recentNepes');
		default:
		break;
	}//look switch	

}); // ready function and statement
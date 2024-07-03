console.log('getMainContenido.js   [loading...]');

jQuery(document).ready(function(){

  console.log('logueado en getMainContenido: ' + logueado);

	var acto = urlParametro('acto');
	switch(acto){
		case 'logout':
			jQuery.logout();
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
				var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
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
				var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
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
			jQuery.lookYelScript('looks/busca.html', 'js/busca.js');
		break;
		case 'opciones':
			jQuery.lookYelScript('looks/opciones.html', 'js/opciones.js');
		break;
		case 'viewNepe':
			jQuery.lookYelScript('looks/viewNepe.html', 'js/nepe/viewNepe.js');
		break;						
		case 'login':
			if(!logueado){
				jQuery.lookYelScript('looks/login.html', 'js/dueno/login.js');
				//jQuery(window.location).attr('href', window.location.pathname + '?look=home');	
			}else{  
				var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
				var textoEstatus = 'Error, usuario solicito login look, ... ya logueado.';
				var elError = 'Error humano.';

				var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
				jQuery(window.location).attr('href', path);	
			}	
		break;
		case 'home':
			if(logueado){	
				jQuery.lookYelScript('looks/home.html', 'js/dueno/home.js');
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
				jQuery.lookYelScript('looks/creaNepe.html', 'js/nepe/creaNepe.js');
			}else{  
				var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
				var textoEstatus = 'Error, usuario solicito creaNepe look, sin estar logueado.';
				var elError = 'Error humano.';

				var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
				jQuery(window.location).attr('href', path);	
			}		
		break;
		case 'updateNepe':	
			if(logueado){	
				jQuery.lookYelScript('looks/updateNepe.html', 'js/nepe/updateNepe.js');
			}else{  
				var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
				var textoEstatus = 'Error, usuario solicito updateNepe look, sin estar logueado.';
				var elError = 'Error humano.';

				var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
				jQuery(window.location).attr('href', path);	
			}	
		break;			
		case 'registro':
			if(!logueado){
				jQuery.lookYelScript('looks/registro.html', 'js/dueno/registro.js');
				//jQuery(window.location).attr('href', window.location.pathname + '?look=home');
			}else{  
				var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
				var textoEstatus = 'Error, usuario solicito registro look, ... ya logueado.';
				var elError = 'Error humano.';

				var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
				jQuery(window.location).attr('href', path);	
			}
		break;
		case 'recentNepes':
			jQuery.lookYelScript('looks/recentNepes.html', 'js/nepe/getRecentNepes.js');
		break;			
		case 'administrar':
			jQuery.lookYelScript('looks/administrar.html', 'js/administrar.js');
		break;		
		case 'faq':
			jQuery.lookYelScript('looks/faq.html', 'js/faq.js');
		break;
		case 'nada':
			jQuery.lookYelScript('looks/nada.html', 'js/nada.js');
		break;				
		case 'error':
			jQuery.lookYelScript('looks/error.html', 'js/error.js');
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
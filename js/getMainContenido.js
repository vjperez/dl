console.log('getMainContenido.js   [loading...]');

function getMainContenidoWhenReady(){

  console.log('logueado en getMainContenido: ' + logueado);

	var acto = urlParametro('acto');
	switch(acto){
		case 'logout':
			logout();
		break;
		case 'deleteNepe':
			const nepeId = urlParametro('nepeId');
			
      let urlParams = new URLSearchParams('escritos/deleteNepe.php');
      urlParams.set("nepeId", nepeId);
      fetch('escritos/deleteNepe.php' + '?' + urlParams.toString() )
      .then(function(respuesta){
        return respuesta.json();
      })
      .then(function(dato){
        if(dato.nepeBorrado)  {  }
				else  {  }
      })
      .catch(function(error){
        window.location.href = encodeAndGetErrorPath(error);
      });
		break;
		case 'deleteHerNepes':
			const userId = urlParametro('userId');

      urlParams = new URLSearchParams('escritos/deleteHerNepes.php');
      urlParams.set("userId", userId);
      fetch('escritos/deleteHerNepes.php' + '?' + urlParams.toString() )
      .then(function(respuesta){
        return respuesta.json();
      })
      .then(function(dato){
        if(dato.nepeBorrado)  {  }
				else  {  }
      })
      .catch(function(error){
        window.location.href = encodeAndGetErrorPath(error);
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
			}else{  
				const msg = 'Error, usuario solicito login look, ... ya logueado'; 
			  window.location.href = encodeAndGetErrorPath( msg );
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

}

isReady( getMainContenidoWhenReady );
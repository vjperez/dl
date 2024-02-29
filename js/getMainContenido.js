jQuery(document).ready(function(){

	var acto = jQuery.urlParametro('acto');
	switch(acto){
		case 'logout':
			jQuery.logout();
		break;
		case 'deleteNepe':
			var nepeId = jQuery.urlParametro('nepeId');
			
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
			var userId = jQuery.urlParametro('userId');
			
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

	var look = jQuery.urlParametro('look');
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
			jQuery.lookYelScript('looks/login.html', 'js/dueno/login.js');
			//jQuery(window.location).attr('href', window.location.pathname + '?look=home');		
		break;
		case 'home':
			jQuery.lookYelScript('looks/home.html', 'js/dueno/home.js');
			//error when solicita home sin estar logueado, se supone ni pueda
		break;			
		case 'creaNepe':
			jQuery.lookYelScript('looks/creaNepe.html', 'js/nepe/creaNepe.js');		
		break;
		case 'updateNepe':	
			if(logueado){	
					let index = jQuery.urlParametro('index');			
					jQuery.getJSON('escritos/nepe/read/getNepe.php', {nepe_index:index} )
					.done(function(nepeDatos, estatusForDONE, xhrObjetoForDONE){
						jQuery.lookYelScript('looks/updateNepe.html', 'js/nepe/updateNepe.js');
						jQuery.populateUpdateNepeForm(nepeDatos);
					})
					.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
						var xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
						var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
						jQuery(window.location).attr('href', path); 
					});
			}else{  
				var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
				var textoEstatus = 'Error, usuario solicito updateNepe look, sin estar logueado.';
				var elError = 'Error humano.';

				var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
				jQuery(window.location).attr('href', path);	
			}	
		break;			
		case 'registro':
			jQuery.lookYelScript('looks/registro.html', 'js/dueno/registro.js');
			//jQuery(window.location).attr('href', window.location.pathname + '?look=home');
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
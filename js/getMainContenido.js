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
				const msg = '... ya estas logueado.'; 
			  window.location.href = encodeAndGetErrorPath( msg );
			}	
		break;
		case 'home':
			if(logueado){	
				lookYelScript('looks/home.html', 'js/dueno/home.js');
			}else{  
        const msg = '... no estas logueado.';
				window.location.href = encodeAndGetErrorPath( msg ); 	
			}
		break;			
		case 'creaNepe':
			if(logueado){	
				lookYelScript('looks/creaNepe.html', 'js/nepe/creaNepe.js');
			}else{  
        const msg = '... no estas logueado.';
				window.location.href = encodeAndGetErrorPath( msg );
			}		
		break;
		case 'updateNepe':	
			if(logueado){	
				lookYelScript('looks/updateNepe.html', 'js/nepe/updateNepe.js');
			}else{  
        const msg = '... no estas logueado.';
				window.location.href = encodeAndGetErrorPath( msg );
			}	
		break;			
		case 'registro':
			if(!logueado){
				lookYelScript('looks/registro.html', 'js/dueno/registro.js');
			}else{  
        const msg = '... ya estas logueado.';
				window.location.href = encodeAndGetErrorPath( msg );	
			}
		break;
		case 'recentNepes':
			lookYelScript('looks/recentNepes.html', 'js/nepe/getRecentNepes.js');
		break;			
		case 'administrar':
      if(logueado){	
				lookYelScript('looks/administrar.html', 'js/administrar.js');
			}else{  
        const msg = '... no estas logueado.';
				window.location.href = encodeAndGetErrorPath( msg );
			}		
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
		case null:
		default:
      window.location.href = window.location.pathname + '?look=recentNepes';
		break;
	}//look switch	

}

isReady( getMainContenidoWhenReady );
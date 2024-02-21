jQuery(document).ready(function(){

	let look = jQuery.urlParametro('look');
	switch(look){
		case 'busca':
			jQuery('#navBusca').addClass("seleccionado");
		break;

		case null:
		case 'opciones':
		case 'viewNepe':
		default:	
		break;
	}

	//navigation botton that depend on logged condition
	jQuery.getJSON('escritos/session/isSessionSet.php', {key:'dueno_id'})
	.done(function(logueadoRespuesta, estatusForDONE, xhrObjetoForDONE){
		//alert('for dueno_id ... logueadoRespuesta.isSet: ' + logueadoRespuesta.isSet);
		let logueado = logueadoRespuesta.isSet;
		console.log('logueado local in DONE:' + logueado);
		if(logueado){ 
			jQuery('#navLogout').css('visibility','visible').show();
			jQuery('#navHome').css('visibility','visible').show()  ;
		 }else{
			jQuery('#navLogin').css('visibility','visible').show();     
			jQuery('#navSignup').css('visibility','visible').show();
		}
	});

});


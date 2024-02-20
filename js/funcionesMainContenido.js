jQuery.lookYelScript = function(pageName, scriptPath){
	jQuery('#containerForMain').load(pageName + ' #main', function(datosDeRespuesta, estatus, xhrObjeto){
		if(estatus == 'error'){
			let msg = "There was an error (" + pageName + "): ";
			jQuery( "#containerFoMain" ).text( msg + xhrObjeto.status + " " + xhrObjeto.statusText );
		} else if (estatus == 'success'){
			console.log(pageName + ': ' + estatus);
			jQuery.getScript(scriptPath)
			.done(function(escript, estatus2){
				console.log(scriptPath + ': ' + estatus2);
			})
			.fail(function(xhrObjeto2, settings, exception){
				let msg = "There was an error (" + scriptPath + "): ";
				jQuery( "#containerFoMain" ).text( msg + xhrObjeto2.status + " " + xhrObjeto2.statusText );
			});
		}
	});
	jQuery('#footer').css('visibility','visible');  
}

jQuery.feedback = function(queElemento, mensaje, forma){
	jQuery(queElemento).text(mensaje);
	if(forma === 'downdelayup') {
		jQuery(queElemento).slideDown(500).delay(1000).slideUp(2000);
	}
}
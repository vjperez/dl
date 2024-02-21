jQuery.lookYelScript = function(pageName, scriptPath){
	jQuery('#containerForMain').load(pageName + ' #main', function(datosDeRespuesta, pageEstatus, xhrObjetoPage){
		if(pageEstatus == 'error'){
			let msg = "There was an error (" + pageName + "): ";
			jQuery( "#containerFoMain" ).text( msg + xhrObjetoPage.status + " " + xhrObjetoPage.statusText );
		} else if (pageEstatus == 'success'){
			console.log(pageName + ': ' + pageEstatus);
			jQuery.getScript(scriptPath)
			.done(function(escript, scriptEstatus){
				console.log(scriptPath + ': ' + scriptEstatus);
			})
			.fail(function(xhrObjetoScript, settings, exception){
				let msg = "There was an error (" + scriptPath + "): ";
				jQuery( "#containerFoMain" ).text( msg + xhrObjetoScript.status + " " + xhrObjetoScript.statusText );
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

jQuery.encodeAndGetErrorPath = function(xhrObjetoForFAILString, textoEstatus, elError){
	if(DEBUGUEO){
		xhrObjetoForFAILString    = encodeURIComponent( xhrObjetoForFAILString );
		textoEstatus              = encodeURIComponent( textoEstatus );
		elError                   = encodeURIComponent( elError );
		var path  = window.location.pathname + '?look=' + 'error' 
				+ '&xhrObjetoForFAILString=' + xhrObjetoForFAILString 
				+ '&textoEstatus=' + textoEstatus 
				+ '&elError=' + elError;
	}else{
		var path = window.location.pathname + '?look=' + 'error';
	}
	return path;	
}
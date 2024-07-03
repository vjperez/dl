console.log('funcionesMainContenido.js   [loading...]');

jQuery.lookYelScript = function(pageName, scriptPath){
	jQuery('#containerForMain').load(pageName + ' #main', function(datosDeRespuesta, pageEstatus, xhrObjetoPage){
		if(pageEstatus == 'error'){
			let msg = "There was an error loading (" + pageName + "): ";
			console.log('making footer and containerForMain visible...\n' + msg);

			//jQuery('#footer').css('visibility','visible'); 
			//jQuery('#containerForMain').css('visibility','visible'); 
			//jQuery( "#containerForMain" ).text( msg + xhrObjetoPage.status + " " + xhrObjetoPage.statusText );
		} else if (pageEstatus == 'success'){
			console.log(pageName + ': ' + pageEstatus);
			jQuery.getScript(scriptPath)
			.done(function(escript, scriptEstatus){
				console.log(scriptPath + ': ' + scriptEstatus);
				
				console.log('footer and containerForMain divs visible.');
				jQuery('#footer').css('visibility','visible'); 
				jQuery('#containerForMain').css('visibility','visible'); 
			})
			.fail(function(xhrObjetoScript, settings, exception){
				let msg = "There was an error (" + scriptPath + "): ";
				console.log('making footer and containerForMain visible...\n' + msg);

				//jQuery('#footer').css('visibility','visible'); 
				//jQuery('#containerForMain').css('visibility','visible'); 
				//jQuery( "#containerForMain" ).text( msg + xhrObjetoScript.status + " " + xhrObjetoScript.statusText );
			});
		}
	});

	//js will runs this before the .done, i dont want that, so place it on .done 
	//console.log('footer and containerForMain divs visible, but too early.');
	//jQuery('#footer').css('visibility','visible'); 
	//jQuery('#containerForMain').css('visibility','visible'); 	
	 
}


function encodeAndGetErrorPath(error){
	if(DEBUGUEO){
		error = encodeURIComponent( error );
		return window.location.pathname + '?look=' + 'error'  + '&elError=' + error;
	}else{
		return window.location.pathname + '?look=' + 'error';
	}	
}
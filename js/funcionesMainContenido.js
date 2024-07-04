console.log('funcionesMainContenido.js   [loading...]');

function lookYelScript(pageName, scriptPath){
  fetch(pageName)
  .then(
  function(respuesta){
    return respuesta.text().trim();
  })
  .then(
  function(newMainText){
    //console.log(newMainText);
    //option 1
    //document.querySelector('#containerForMain').innerHTML = newMainText;
    //option 2
    const parentDiv = document.createElement('div');
    parentDiv.innerHTML = newMainText;
    //firstElementChild will be, the newMainText, but as an HTML element
    document.querySelector('#main').replaceWith( parentDiv.firstElementChild );
  })
  .then(
  function(){
    ponScript(scriptPath, null)

    document.querySelector('#footer').style.visibility = 'visible'; 
    document.querySelector('#containerForMain').style.visibility = 'visible';
    console.log('footer and containerForMain divs visible.');
  });
}


function encodeAndGetErrorPath(error){
	if(DEBUGUEO){
		error = encodeURIComponent( error );
		return window.location.pathname + '?look=' + 'error'  + '&elError=' + error;
	}else{
		return window.location.pathname + '?look=' + 'error';
	}	
}


/*
  creo que era jQuery.lookYelScript
	jQuery('#containerForMain').load(pageName + ' #main', function(datosDeRespuesta, pageEstatus, xhrObjetoPage){
		if(pageEstatus == 'error'){
			let msg = "There was an error loading (" + pageName + "): ";
			//console.log('footer and containerForMain divs visible.' + msg);
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
				let msg = "There was an error loadng (" + scriptPath + "): ";
				//console.log('making footer and containerForMain visible...\n' + msg);
				//jQuery('#footer').css('visibility','visible'); 
				//jQuery('#containerForMain').css('visibility','visible'); 
				//jQuery( "#containerForMain" ).text( msg + xhrObjetoScript.status + " " + xhrObjetoScript.statusText );
			});
		}
	});
*/ 
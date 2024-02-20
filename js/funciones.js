const DEBUGUEO = true;
const MINIMUM_USER_PASS_LENGTH = 4;
const MINIMUM_USER_NAME_LENGTH = 3;


jQuery.areValidUserYPass = function(usertb, pass01, pass02, feedbackType, whatElement){
	//Esta funcion la usan login y registra
	//para detectar valores invalidos q se pueden chequear con JavaScript, y evitar post innecesarios.
	// 1)lenght >= 3o4; 2)only numbers or letters  @ . _  - +   ; 3)both pass are equal;
	usertbCheck = usertb.replace(/[^a-z0-9ñüàáèéìíòóùú@\._+-]/gi, '');  // escaping dot with \; g for 'dont stop at first match, find all'; i for case insensitive 
	pass01Check = pass01.replace(/[^a-z0-9ñüàáèéìíòóùú@\._+-]/gi, '');
	pass02Check = pass02.replace(/[^a-z0-9ñüàáèéìíòóùú@\._+-]/gi, '');
	if(usertb.length < MINIMUM_USER_NAME_LENGTH || pass01.length < MINIMUM_USER_PASS_LENGTH || pass02.length < MINIMUM_USER_PASS_LENGTH){
		if(feedbackType.indexOf('fullFeedback') !== -1){
			jQuery.feedback(whatElement, "Username o contrase\u00f1a es muy corto.");
		}else{ // if(feedbackType.indexOf('genericFeedback') !== -1){
			jQuery.feedback(whatElement, 'Trata otra vez.');
		}
		return false;
	}else if(usertbCheck.length < usertb.length  ||  pass01Check.length < pass01.length ||  pass02Check.length < pass02.length){
		if(feedbackType.indexOf('fullFeedback') !== -1){
			jQuery.feedback(whatElement, 'Usa solo letras, numeros y @ . _ - + ');
		}else{ // if(feedbackType.indexOf('genericFeedback') !== -1){
			jQuery.feedback(whatElement, 'Trata otra vez.');
		}
		return false;
	}else if(pass01 !== pass02){  //same type, same value, no type conversion, case sensitive
		if(feedbackType.indexOf('fullFeedback') !== -1){
			jQuery.feedback(whatElement, 'Las contrase\u00f1as son diferentes.');
		}else{  // if(feedbackType.indexOf('genericFeedback') !== -1){
			jQuery.feedback(whatElement, 'Trata otra vez.');
		}
		return false;
	}else{
		return true;
	}
}

jQuery.feedback = function(queElemento, mensaje, forma){
	jQuery(queElemento).text(mensaje);
	if(forma === 'downdelayup') {
		jQuery(queElemento).slideDown(500).delay(1000).slideUp(2000);
	}
}

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
}

jQuery.cleanStr = function(str, patron){
	//function will convert a string like   !@uno#$dos&(   into   uno dos
	//when patron is RegExp(/[^a-z0-9ñüàáèéìíòóùú]/gi)
	//patron comes mainly from crea y update nepe, y busca
	
	//replace characters matching a patron with '%'
	str = str.replace(patron, '%');		// str will be   %%uno%%dos%%
	
	strComponentsArray = str.split('%'); // strComponentsArray will contain   ,,uno,,dos,,
	cleanedstr = '';
	for(var i=0; i < strComponentsArray.length; i++){
		//alert('parte de strComponentsArray=[' + strComponentsArray[i]  + ']');
		if (strComponentsArray[i] !== '') { //ignore strComponent when it is empty string
			//strComponent will be '' in these situations: 
			//to represent character BEFORE a delimiter on the first position
			//to represent character AFTER  a delimiter on the last  position
			//to represent character BETWEEN  back to back delimiters
			if(cleanedstr !== ''){cleanedstr += ' ';}
			cleanedstr += strComponentsArray[i];
			//build a string from non-empty strComponents, adding a space BETWEEN them
		}
	}
	return cleanedstr;
}

jQuery.hideThemSections = function(){
	jQuery('.notHidable').next('.hidable').hide();
	jQuery('.notHidable').find('.fa-chevron-circle-up').hide();
	jQuery('.notHidable').find('.fa-chevron-circle-down').show();
}

jQuery.showThemSections = function(){
	jQuery('.notHidable').next('.hidable').show();
	jQuery('.notHidable').find('.fa-chevron-circle-down').hide();
	jQuery('.notHidable').find('.fa-chevron-circle-up').show();
}

//extracs parameters from the url
jQuery.urlParametro = function(name){
	var str = window.location.href;
	var patron = new RegExp('[\?&]' + name + '=([^&#]*)');
	var results = patron.exec(str);  //searches str for a pattern described in patron
	//results is an array, contains NULL when name=" " is not found on str. 
    //otherwise results[0] contains name=" ", a match with the entire reg exp 
	//          results[1] contains a match with the group defined between () after the = sign on the regExp.  Search for 'javascript regex groups' 
	if(results === null) return null;
	else return results[1];
	//return results[1] || 0;
}

//returns null when typeof str is not string
//when str IS a string ... returns whether string has zero length after trimmed
jQuery.isVacioStr = function(str){
	if(typeof str === 'string') 
		return   str.trim().length === 0;
	else 
		return null;
}

//returns null when typeof str is not string
//when str IS a string ... returns whether string has length > zero after trimmed
jQuery.isNotVacioStr = function(str){
	if(typeof str === 'string') 
		return   str.trim().length > 0;
	else 
		return null;
}

//menu behavior
jQuery(document).on('click', '.menuHidableDriver', function(evento){
	if (jQuery('.menuHidableTarget').is(':visible')) {
		jQuery.hideMenu();
	}else{
		jQuery.showMenu();
	}
});

jQuery.hideMenu = function(){
	jQuery('.menuHidableTarget').hide();
	jQuery('.menuHidableDriver').find('.fa-window-close').hide();
	jQuery('.menuHidableDriver').find('.fa-bars').show();
}

jQuery.showMenu = function(){
	jQuery('.menuHidableTarget').show()
	jQuery('.menuHidableDriver').find('.fa-bars').hide();
	jQuery('.menuHidableDriver').find('.fa-window-close').show();
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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


jQuery(document).on('click', '.notHidable', function(evento){
	if (jQuery(evento.currentTarget).next('.hidable').is(':visible')) {

		jQuery(evento.currentTarget).next('.hidable').hide(); 
		//jQuery(evento.currentTarget).css({border:'none', borderBottomWidth:'1pt', borderBottomStyle:'solid', borderBottomColor:'#dadada'});
		jQuery(evento.currentTarget).find('.fa-chevron-circle-up').hide();
		jQuery(evento.currentTarget).find('.fa-chevron-circle-down').show();
	}else{

		jQuery(evento.currentTarget).next('.hidable').show(); 
		//jQuery(evento.currentTarget).css({border:'none'});
		jQuery(evento.currentTarget).find('.fa-chevron-circle-down').hide();
		jQuery(evento.currentTarget).find('.fa-chevron-circle-up').show();
	}
});


//since menu Hidable Driver h1 buttons are hidden on width > 984 (js) or 1001 css,
//without this function, you could end up with no menu on windows width > 984 and no way to redisplay it
//that can happen if menu was hidden on lower window widths
jQuery(window).on( 'resize', 
	function() {
		// jQuery('body').prepend( "div" + jQuery(window).width() * window.devicePixelRatio + "/div" );
		if(jQuery(window).width() * window.devicePixelRatio >= 984){   jQuery.showMenu();   }
  	}
);


jQuery.isNepeIdOnOwnNepesSession = function(ownNepes, nepeIdTocheck){
	for(var index=0; index < ownNepes.length; index++){
		//alert('nepe id to check: ' + nepeIdTocheck + '   current value on own nepes: ' + own_nepes[index])
		if(ownNepes[index] == nepeIdTocheck) { return true; }
	}
	return false;
}

jQuery.logout = function(){
	jQuery.get('escritos/dueno/logout.php')
	.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
	})
	.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
		var xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
		var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
		jQuery(window.location).attr('href', path); 
	});
}



/*
jQuery.isSetCookie = function(cookieName){
	var isSet = false;
	var allcookies = document.cookie;
	var cookiearray = allcookies.split(';');
	//alert('document dot cookie: ' + document.cookie + '\nall cookies: ' + allcookies  + '\ncookie array: ' + cookiearray + '\ncookie array lenght: ' + cookiearray.length  );
	for(var i=0;  i < cookiearray.length; i++) {
		var name = cookiearray[i].trim().split('=')[0];
		//value = cookiearray[i].split('=')[1];
		//alert('current cookie name=' + name + '\nBuscando Parametro=' + cookieName + '\nLo q buscas?=' + (name === cookieName));
		if(name === cookieName) {isSet = true; break;}
	}
	return isSet;
}

jQuery.getCookieValue = function(cookieName){
	var allcookies = document.cookie;
	var cookiearray = allcookies.split(';');
	//alert('document dot cookie: ' + document.cookie + '\nall cookies: ' + allcookies  + '\ncookie array: ' + cookiearray + '\ncookie array lenght: ' + cookiearray.length  );
	for(var i=0; i < cookiearray.length; i++) {
		var name = cookiearray[i].trim().split('=')[0]; // me hace falta trim pq en los cookies juntos hay un espacio antes del nombre
		//alert('current cookie name=' + name + '\nBuscando Parametro=' + cookieName + '\nLo q buscas?=' + (name === cookieName));
		if(name === cookieName) {
			value = JSON.parse( decodeURIComponent( cookiearray[i].split('=')[1] )  ); 
			// me hace falta decodeURI pq cookie value viene encoded desde php (usando json encode)
			// me hace falta JSON.parse pa q javascript parsee/compare valores en el arreglo original, no texto letra por letra de lo enviado por php
			//alert('current cookie name=' + name + '\nBuscando Parametro=' + cookieName + '\nCookie Value=' + value + '\nLo q buscas?=' + (name === cookieName));
			return value;
		}
	}
	return null;
}

jQuery.isNepeIdOnOwnNepesCookie = function(nepeIdTocheck){
	//alert( 'is own nepe cookie set: ' + jQuery.isSetCookie('own_nepes') );
	if( jQuery.isSetCookie('own_nepes') ){
		var own_nepes = jQuery.getCookieValue('own_nepes');
		for(var index=0; index < own_nepes.length; index++){
			//alert('nepe id to check: ' + nepeIdTocheck + '   current value on own nepes: ' + own_nepes[index])
			if(own_nepes[index] == nepeIdTocheck) { return true; }
		}
		return false;
	}else{
		return false;
	}
}
*/


/*
jQuery.isSessionSet = function(key){
	jQuery.getJSON('escritos/isSessionSet.php', {key:key})
	.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
		//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
		return datos.isSet;
	})
	.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
		var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
		var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
		jQuery(window.location).attr('href', path); 
	}); 
}
*/

/*
jQuery.getSessionValue = function(key){
	jQuery.getJSON('escritos/getSessionValue.php', {key:key})
	.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
		alert('key: ' + key + '\ndatos: ' + datos);
		return datos;
	});
	//.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
	//	var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
	//	var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
	//	jQuery(window.location).attr('href', path); 
	//}) 
}
*/


/*
jQuery.dameLookFillProfile = function(nepeId, pageName){
	//alert('dame html look to fill el profile ' + nepeId);
	jQuery.get(pageName, function(datosDeRespuesta, estatus, xhrObjeto){
		//console.log(datosDeRespuesta);
		var elMain = jQuery(datosDeRespuesta).filter('#main');
			//console.log(mainDeBusca);
		jQuery('#containerForMain').html(elMain);
	});
	jQuery.post('escritos/setSessionValue.php', {nepe_id:nepeId})
	.done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){
	})
	.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
		var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
		//var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
		//jQuery(window.location).attr('href', path); 
		jQuery('ul.navega li a.look-error').data( 'xhrObjetoForFAILTexto', encodeURIComponent(xhrObjetoForFAILTexto) );
		jQuery('ul.navega li a.look-error').data( 'textoEstatus', encodeURIComponent(textoEstatus) );
		jQuery('ul.navega li a.look-error').data( 'elError', encodeURIComponent(elError) );
		jQuery('.look-error').click();
	});
}
*/


/*
jQuery.dameLookToUpdateNepe = function(nepeId, pageName){
		//alert('dame html look to update el nepe ' + nepeId);
		jQuery.get(pageName, function(datosDeRespuesta, estatus, xhrObjeto){
			//console.log(datosDeRespuesta);
			var elMain = jQuery(datosDeRespuesta).filter('#main');
				//console.log(mainDeBusca);
			jQuery('#containerForMain').html(elMain);
		});	
		jQuery.post('escritos/setSessionValue.php', {nepe_id:nepeId} )
		.done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){
		})
		.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
			var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
			//var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
			//jQuery(window.location).attr('href', path); 
			jQuery('ul.navega li a.look-error').data( 'xhrObjetoForFAILTexto', encodeURIComponent(xhrObjetoForFAILTexto) );
			jQuery('ul.navega li a.look-error').data( 'textoEstatus', encodeURIComponent(textoEstatus) );
			jQuery('ul.navega li a.look-error').data( 'elError', encodeURIComponent(elError) );
			jQuery('.look-error').click();
		});
}
*/

const DEBUGUEO = true;
const MINIMUM_USER_PASS_LENGTH = 4;
const MINIMUM_USER_NAME_LENGTH = 3;

jQuery.dameLook = function(pageName){
	jQuery.get(pageName, function(datosDeRespuesta, estatus, xhrObjeto){
		//console.log(datosDeRespuesta);
		var elMain = jQuery(datosDeRespuesta).filter('#main');
 		//console.log(mainDeBusca);
		jQuery('#containerForMain').html(elMain);
	});	
}


jQuery.cleanStr = function(str, patron){
	//patron comes mainly from crea y update nepe, y busca
	str = str.replace(patron, '*'); 				
	strGoodPartsArray = str.split('*');
	cleanedstr = '';
	for(var i=0; i < strGoodPartsArray.length; i++){
		//alert('parte de strGoodPartsArray=[' + strGoodPartsArray[i]  + ']');
		if (strGoodPartsArray[i] !== '') {
			if(cleanedstr !== ''){cleanedstr += ' ';} //the first time, dont run this line of code, simply add the 'word', other times add a ' ' before the word as delimiter
			cleanedstr += strGoodPartsArray[i];
		}
	}
	return cleanedstr;
}

///////////////////////////////////////////////////////



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




//extracs parameters from the url
jQuery.urlParametro = function(name){
	var str = window.location.href;
	var patron = new RegExp('[\?&]' + name + '=([^&#]*)');
	var results = patron.exec(str);  //searches str for a pattern described in patron
	//results is an array, contains NJLL when name=" " is not found on str. 
    //otherwise results[0] contains name=" ", and 
	//          results[1] contains the " " after the = sign and before  ? or &	
	if(results === null) return null;
	else return results[1];
	//return results[1] || 0;
}





jQuery.isVacioStr = function(str){
	if (str === null) return true;
	else return str.trim().length == 0;
}

jQuery.isNotVacioStr = function(str){
	//  str !== null && str !== ''
	return ! jQuery.isVacioStr(str);
}


jQuery.encodeAndGetErrorPath = function(xhrObjetoForFAILTexto, textoEstatus, elError){
	if(DEBUGUEO){
		xhrObjetoForFAILTexto     = encodeURIComponent( xhrObjetoForFAILTexto );
		textoEstatus              = encodeURIComponent( textoEstatus );
		elError                   = encodeURIComponent( elError );
		var path  = window.location.pathname + '?look=' + 'error' 
				+ '&xhrObjetoForFAILTexto=' + xhrObjetoForFAILTexto 
				+ '&textoEstatus=' + textoEstatus 
				+ '&elError=' + elError;
	}else{
		var path = window.location.pathname + '?look=' + 'error';
	}
	return path;	
}


jQuery.feedback = function(elementoDonde, mensaje, forma){
	if(forma === 'downdelayup') {
		jQuery(elementoDonde).text(mensaje);
		jQuery(elementoDonde).slideDown(500).delay(1000).slideUp(2000);
	}
	else jQuery(elementoDonde).text(mensaje);
}



jQuery(document).on('click', '.notHidable', function(evento){
	var $elNotHidable = jQuery(evento.currentTarget); 
	var $toToggle = $elNotHidable.next('.hidable');
	if ($toToggle.is(':visible')) {
		$toToggle.hide(); 
		//jQuery(evento.currentTarget).css({border:'none', borderBottomWidth:'1pt', borderBottomStyle:'solid', borderBottomColor:'#dadada'});
		$elNotHidable.find('.fa-chevron-circle-up').hide();
		$elNotHidable.find('.fa-chevron-circle-down').show();
	}else{
		$toToggle.show(); 
		//jQuery(evento.currentTarget).css({border:'none'});
		$elNotHidable.find('.fa-chevron-circle-down').hide();
		$elNotHidable.find('.fa-chevron-circle-up').show();
	}
});


jQuery.hideThem = function(){
	var $todosLosNotHidable = jQuery('.notHidable');
	// var $todosLosHidable = jQuery('.hidable');
	// $todosLosHidable.hide();
	var $toHide = $todosLosNotHidable.next('.hidable');
	$toHide.hide();
	$toHide = $todosLosNotHidable.find('.fa-chevron-circle-up');
	$toHide.hide();
	var $toShow = $todosLosNotHidable.find('.fa-chevron-circle-down');
	$toShow.show();
}

jQuery.showThem = function(){
	var $todosLosNotHidable = jQuery('.notHidable');
	// var $todosLosHidable = jQuery('.hidable');
	// $todosLosHidable.hide();
	var $toShow = $todosLosNotHidable.next('.hidable');
	$toShow.show();
	var $toHide = $todosLosNotHidable.find('.fa-chevron-circle-down');
	$toHide.hide();
	$toShow = $todosLosNotHidable.find('.fa-chevron-circle-up');
	$toShow.show();
}

jQuery.areValidUserYPass = function(usertb, pass01, pass02, feedbackType, whatElement){
	//Esta funcion la usan login y registra
	//para detectar valores invalidos q se pueden chequear con JavaScript, y evitar post innecesarios.
	//Chequear Usuario repetido requiere hacer el post, pq requiere info de database.
	// 1)lenght >= 4; 2)only numbers or letters  _ y -; 3)both pass are equal; se puede chequear antes del post
	usertbCheck = usertb.replace(/[^a-z0-9ñüàáèéìíòóùú@\._\-+]/gi, '');  // escaping dot and minus;  JavaScript is a case-sensitive language
	pass01Check = pass01.replace(/[^a-z0-9ñüàáèéìíòóùú@\._\-+]/gi, '');
	pass02Check = pass02.replace(/[^a-z0-9ñüàáèéìíòóùú@\._\-+]/gi, '');
	if(usertb.length < MINIMUM_USER_NAME_LENGTH || pass01.length < MINIMUM_USER_PASS_LENGTH || pass02.length < MINIMUM_USER_PASS_LENGTH){
		if(feedbackType.indexOf('fullFeedback') !== -1){
			jQuery.feedback(whatElement, "Username o contrase\u00f1a es muy corto.");
		}else if(feedbackType.indexOf('genericFeedback') !== -1){
			jQuery.feedback(whatElement, 'Trata otra vez.');
		}
		return false;
	}else if(usertbCheck.length < usertb.length  ||  pass01Check.length < pass01.length ||  pass02Check.length < pass02.length){
		if(feedbackType.indexOf('fullFeedback') !== -1){
			jQuery.feedback(whatElement, 'Usa solo letras, numeros y @ . _ - + ');
		}else if(feedbackType.indexOf('genericFeedback') !== -1){
			jQuery.feedback(whatElement, 'Trata otra vez.');
		}
		return false;
	}else if(pass01 !== pass02){  //same type, same value, no type conversion, case sensitive
		if(feedbackType.indexOf('fullFeedback') !== -1){
			jQuery.feedback(whatElement, 'Las contrase\u00f1as son diferentes.');
		}else if(feedbackType.indexOf('genericFeedback') !== -1){
			jQuery.feedback(whatElement, 'Trata otra vez.');
		}
		return false;
	}else{
		return true;
	}
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
		alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
		return datos.isSet;
	});
	//.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
	//	var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
	//	var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
	//	jQuery(window.location).attr('href', path); 
	//}) 
}

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



jQuery.isNepeIdOnOwnNepesSession = function(ownNepes, nepeIdTocheck){
	for(var index=0; index < ownNepes.length; index++){
		//alert('nepe id to check: ' + nepeIdTocheck + '   current value on own nepes: ' + own_nepes[index])
		if(ownNepes[index] == nepeIdTocheck) { return true; }
	}
	return false;
}

jQuery.logout = function(){
	jQuery.get('escritos/logout.php')
	.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
	});
	//.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
	//	var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
	//	var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
	//	jQuery(window.location).attr('href', path); 
	//}) 
}




//once look is in, use jQuery on loaded elements to get values
jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){



	if(settingsObjeto.url === 'looks/creaDueno.html'){
		jQuery('form#creaDuenoForm').submit(function(evento){
			evento.preventDefault(); //not making a submit (POST request) from html action
			var usertb = jQuery('#usernameId').val();
			var pass01 = jQuery('#passwordId').val();
			var pass02 = jQuery('#passwordConfirmId').val();
			if( jQuery.areValidUserYPass(usertb, pass01, pass02, 'fullFeedback', 'form#creaDuenoForm h3') ){
				//Valid values son los q cumplen estas 3 cosas.
				//Estas cosas se pueden chequear antes del post y evito post sin sentido
				// 1)lenght >= 4; 2)only numbers or letters; 3)both pass are equal;
				//Si tengo valores q fueron registrables entonces, Making a submit (POST request) here. Not in look=editDuenoShowEmpresas
				jQuery.post('escritos/creaDueno.php', {usertb:usertb, pass01:pass01} )//check here that password are equal
				.done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){
					//el getJSON no entra al .done y cae en .fail si detecta errores de parseo.
					//Con el post tengo yo que usar un try block para detectar errores de parseo y mandarlo a jQuery fallas
					try{
						//alert('datosJSONStr: ' + datosJSONStr);
						datosJSObj = JSON.parse(datosJSONStr);
						//alert('datosJSObj.registrado: ' + datosJSObj.registrado + '\ndatosJSObj.feedback: ' + datosJSObj.feedback + '\ndatosJSObj.duenoId: ' + datosJSObj.duenoId);
					}catch(errorParseo){
						var datosJSONStrAsXHRTexto = datosJSONStr;
						var textoEstatus = 'Error parseando la siguiente respuesta del server en escritorios/creaDueno.php :<br> Mensaje: ' + errorParseo.message;
						var elError = errorParseo.name;
						
						//var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // first arg is not xhr Object, so no responseText member will be obtained in encodeAndGetErrorPath() at functiones.js - will produce an undefined
						//jQuery(window.location).attr('href', path); 	
						jQuery('ul.navega li a.look-error').data( 'xhrObjetoForFAILTexto', encodeURIComponent(datosJSONStrAsXHRTexto) );
						jQuery('ul.navega li a.look-error').data( 'textoEstatus', encodeURIComponent(textoEstatus) );
						jQuery('ul.navega li a.look-error').data( 'elError', encodeURIComponent(elError) );
						jQuery('.look-error').click();				
					}
					if(datosJSObj.registrado){
						jQuery('.look-home').click();
						//jQuery(window.location).attr('href', window.location.pathname + '?look=home');
						//jQuery(window.location).attr('href', window.location.pathname + '?look=home&duenoId=' + datosJSObj.duenoId);
					}else{ // usuario es repetido en el database, por eso se chequea despues del post
						jQuery.feedback('form#creaDuenoForm h3', datosJSObj.feedback);
					}
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
		});
	
		//erase feedback when user writting
		jQuery('form#creaDuenoForm  input[name^=password]').keyup(function(){
			jQuery.feedback('form#creaDuenoForm h3', '');
		});
		//erase feedback when user writting
		jQuery('form#creaDuenoForm  input[name=username]').keyup(function(){
			jQuery.feedback('form#creaDuenoForm h3', '');
		});	
	}//if crea dueno




	
	if(settingsObjeto.url === 'looks/creaNepe.html'){
		jQuery.handleCreaNepeSubmit();
	}//if creaNepe







});//ajax complete
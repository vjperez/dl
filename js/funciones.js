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


jQuery.cleanStr = function(str, patron){
	//	var patron = /[^a-z0-9]/gi;  				// Find any character NOT between the brackets, global, insensitive
	str = str.replace(patron, '*'); 				// same as replace(/[^a-zA-Z0-9]/g, '*'); JavaScript is a case-sensitive language
	strArray = str.split('*');
	result = '';
	for(var i=0; i < strArray.length; i++){
		//alert('parte de strArray=[' + strArray[i]  + ']');
		if (strArray[i] !== '') {
			if(result !== ''){result += ':';} //the first time, dont run this line of code, simply add the 'word', other times add a ':' before the word as delimiter
			result += strArray[i];
		}
	}
	return result;
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
		var path  = window.location.pathname + '?look=' + 'error' + '&xhrObjetoForFAILTexto=' + xhrObjetoForFAILTexto + '&textoEstatus=' + textoEstatus + 		'&elError=' + elError;
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


jQuery.toggleOnClick = function(){
	var $todosLosNotHidable = jQuery('.notHidable');
	// var $todosLosHidable = jQuery('.hidable');
	// $todosLosHidable.hide();
	$todosLosNotHidable.on('click', function(evento){
		var $toToggle = jQuery(evento.currentTarget).next('.hidable');
		$toToggle.toggle();
	});
}

jQuery.hideThem = function(){
	var $todosLosNotHidable = jQuery('.notHidable');
	// var $todosLosHidable = jQuery('.hidable');
	// $todosLosHidable.hide();
	var $toHide = $todosLosNotHidable.next('.hidable');
	$toHide.hide();
}

jQuery.showThem = function(){
	var $todosLosNotHidable = jQuery('.notHidable');
	// var $todosLosHidable = jQuery('.hidable');
	// $todosLosHidable.hide();
	var $toShow = $todosLosNotHidable.next('.hidable');
	$toShow.show();
}

jQuery.pintaHeaderLinks = function(){
	var $headerLinks = jQuery('div#navega a.navelink');
	$headerLinks.css({
    	color:'#2980b9'
	});
}

jQuery.areValidUserYPass = function(usertb, pass01, pass02, feedbackType, whatElement){
	//Esta funcion la usan login y registra
	//para detectar valores invalidos q se pueden chequear con JavaScript, y evitar post innecesarios.
	//Chequear Usuario repetido requiere hacer el post, pq requiere info de database.
	// 1)lenght >= 4; 2)only numbers or letters  _ y -; 3)both pass are equal; se puede chequear antes del post
	usertbCheck = usertb.replace(/[^a-z0-9@\._\-+]/gi, '');  //same as replace(/[^a-zA-Z0-9@\._\-+]/g, '');  escaping dot and minus;  JavaScript is a case-sensitive language
	pass01Check = pass01.replace(/[^a-z0-9@\._\-+]/gi, '');
	pass02Check = pass02.replace(/[^a-z0-9@\._\-+]/gi, '');
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
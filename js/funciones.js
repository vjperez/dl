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


jQuery.isVacioStr = function(str){
	if (str === null) return true;
	else return str.trim().length == 0;
}

jQuery.isNotVacioStr = function(str){
	//  str !== null && str !== ''
	return ! jQuery.isVacioStr(str);
}

/*
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
*/

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




	if(settingsObjeto.url === 'looks/busca.html'){ // === means true without type coersion - the type and value most both be equal
		jQuery('form').submit(function(evento){
			evento.preventDefault(); //not making a submit (GET request) here. Lets do it at look=opciones
			var regexp = new RegExp(/[^a-z0-9ñüàáèéìíòóùú+]/gi);	//see 'negated or complemented character class'
			var que = jQuery('#queId').val();
			que = jQuery.cleanStr(que, regexp); // clean function returns cleaned str,  adds ':' as delimiter
			var donde = jQuery('#dondeId').val();
			donde = jQuery.cleanStr(donde, regexp); // clean function returns cleaned str, adds  ':' as delimiter
			//alert('que=(' + que  + ')\ndonde=(' +  donde + ')');
			if(que.length > 0 || donde.length > 0){//i'm looking for a non empty cleaned str
				jQuery(window.location).attr('href', window.location.pathname + '?look=opciones&que=' + encodeURIComponent(que) 
				+ '&donde=' + encodeURIComponent(donde)  );
			}else{
				jQuery.feedback('form#queDondeForm h3', 'Buscas algo?', 'downdelayup');
			}
		});
	}//if busca
	



	if(settingsObjeto.url === 'looks/home.html'){
		//hide them  
		jQuery.hideThem();

		//erase feedback when user writting
		jQuery('form#editDuenoForm  input[name^=password]').keyup(function(){
			jQuery.feedback('form#editDuenoForm h3', '');
		});
		
		jQuery('div#nepes :button').click(function(){
			//alert(window.location.pathname + '?look=creaNepe'); 
			//jQuery(window.location).attr('href', window.location.pathname + '?look=creaNepe');
			jQuery('.look-creaNepe').click();
		});

		var elLabel = ''; 	
		var elTable = '';  
		
		//alert('get username...');
		jQuery.ajax({
			//cache: false,
			url: 'escritos/getUsername.php',
			dataType: "json"
		})
		.done(function(dato, estatusForDONE, xhrObjetoForDONE){
			elLabel = 'Negocios de ' + dato; 
			jQuery('fieldset#labelTableContainer label').html( elLabel );
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
		

		//alert('show nepes get ids...');
		jQuery.ajax({
			//cache: false,
			url: 'escritos/showNepesGetIds.php',
			dataType: "json"
		})
		.done(function(datos, estatusForDONE, xhrObjetoForDONE){
			//alert('datos: ' + datos);
			jQuery.each(datos, function(index){
				//elTable += '<tr><td><a class="link" href="portada.html?look=updateNepe'  +  '&duenoId=' + datos.duenoId 
				elTable += '<tr><td><a class="look-updateNepe" href="portada.html" data-nepeid="' + datos[index].nepeId + '">' 
				+ datos[index].nepeNombre + '</a></td></tr>';
			});
			//elTable += '<tr><td><a class="link" href="portada.html?look=creaNepe'  +  '&duenoId=' datos.duenoId + '">' + 'Crea Nuevo NePe' + '</a></td></tr>';	
			jQuery('fieldset#labelTableContainer table').html( elTable );
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


		//do this when form submitted ;
		//alert('.submit @ home...') 
		jQuery('form#editDuenoForm').submit(function(evento){
			evento.preventDefault(); //not making a submit (POST request) from html action.
			var user = 'valorDummy';
			var pass01 = jQuery('#passwordId').val();
			var pass02 = jQuery('#passwordConfirmId').val();
			if( jQuery.areValidUserYPass(user, pass01, pass02, 'fullFeedback', 'form#editDuenoForm h3') ){
				//Valid values son los q cumplen estas 3 cosas.
				//Estas cosas se pueden chequear antes del post y evito post sin sentido
				// 1)lenght >= 4; 2)only numbers or letters; 3)both pass are equal;
				//Si tengo valores q fueron registrables entonces, Making a submit (POST request) here. Not in look=editDuenoShowEmpresas
				
			//jQuery.post('escritos/editDuenoContrasena.php', {duenoId:duenoId, pass01:pass01} )
				jQuery.post('escritos/editDuenoContrasena.php', {pass01:pass01} )
				.done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){
					//el getJSON no entra al .done y cae en .fail si detecta errores de parseo.
					//Con el post tengo yo que usar un try block para detectar errores de parseo y mandarlo a jQuery fallas
					try{
						//alert('datosJSONStr: ' + datosJSONStr);
						datosJSObj = JSON.parse(datosJSONStr);
						//alert('datosJSObj.loguea: ' + datosJSObj.loguea);
					}catch(errorParseo){
						var datosJSONStrAsXHRTexto = datosJSONStr;
						var textoEstatus = 'Error parseando la siguiente respuesta del servidor en escritos/editDuenoContrasena.php :<br> Mensaje: ' + errorParseo.message;
						var elError = errorParseo.name;
						
						//var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // first arg is not xhr Object, so no responseText member will be obtained in encodeAndGetErrorPath() at functiones.js - will produce an undefined
						//jQuery(window.location).attr('href', path);
						jQuery('ul.navega li a.look-error').data( 'xhrObjetoForFAILTexto', encodeURIComponent(datosJSONStrAsXHRTexto) );
						jQuery('ul.navega li a.look-error').data( 'textoEstatus', encodeURIComponent(textoEstatus) );
						jQuery('ul.navega li a.look-error').data( 'elError', encodeURIComponent(elError) );
						jQuery('.look-error').click();				
					}
					if(datosJSObj.cambiado){
						jQuery.feedback('form#editDuenoForm h3', 'Tu password fue cambiado.');
					}else{
						jQuery.feedback('form#editDuenoForm h3', 'Trata otra vez. No cambiamos NADA !');
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
	}//if home	

	
	
	
	//This code runs when get isCompleted and IF the get was requesting login.html
	if(settingsObjeto.url === 'looks/login.html'){
		//when ajax complete ; handle form submit and make post
		jQuery('form#loginForm').submit(function(evento){
			evento.preventDefault(); //not making a submit (POST request) from html action.
			var user = jQuery('#usernameId').val();
			var pass = jQuery('#passwordId').val();
			if( jQuery.areValidUserYPass(user, pass, pass, "genericFeedback", 'form#loginForm h3') ){
				//Valid values son los q cumplen estas 3 cosas.
				//Estas cosas se pueden chequear antes del post y evito post sin sentido
				// 1)lenght >= 4; 2)only numbers or letters; 3)both pass are equal;
				//Si tengo valores q fueron registrables entonces, Making a submit (POST request) here. Not in look=editDuenoShowEmpresas
				jQuery.post('escritos/login.php', {user:user, pass:pass} )
				.done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){
					//el getJSON no entra al .done y cae en .fail si detecta errores de parseo.
					//Con el post tengo yo que usar un try block para detectar errores de parseo y mandarlo a jQuery fallas
					try{
						//alert('datosJSONStr: ' + datosJSONStr);
						datosJSObj = JSON.parse(datosJSONStr);
						//alert('datosJSObj.loguea: ' + datosJSObj.loguea);
					}catch(errorParseo){
						var datosJSONStrAsXHRTexto = datosJSONStr;
						var textoEstatus = 'Error parseando la siguiente respuesta del server en escritos/login.php :<br> Mensaje: ' + errorParseo.message;
						var elError = errorParseo.name;
						
						//var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // first arg is not xhr Object, so no responseText member will be obtained in encodeAndGetErrorPath() at functiones.js - will produce an undefined
						//jQuery(window.location).attr('href', path); 
						jQuery('ul.navega li a.look-error').data( 'xhrObjetoForFAILTexto', encodeURIComponent(datosJSONStrAsXHRTexto) );
						jQuery('ul.navega li a.look-error').data( 'textoEstatus', encodeURIComponent(textoEstatus) );
						jQuery('ul.navega li a.look-error').data( 'elError', encodeURIComponent(elError) );
						jQuery('.look-error').click();
					}
					if(datosJSObj.loguea){
						//jQuery(window.location).attr('href', window.location.pathname + '?look=home&duenoId=' + datosJSObj.duenoId);
						//jQuery(window.location).attr('href', window.location.pathname + '?look=home');
						jQuery('.look-home').click();
					}else{
						//alert('datosJSObj.loguea: ' + datosJSObj.loguea);
						jQuery.feedback('form#loginForm h3', 'Trata otra vez.');
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
		jQuery('form#loginForm  input[name=password]').keyup(function(){
			jQuery.feedback('form#loginForm h3', '');
		});
		//erase feedback when user writting
		jQuery('form#loginForm  input[name=username]').keyup(function(){
			jQuery.feedback('form#loginForm h3', '');
		});

	}//if login




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





	if(settingsObjeto.url === 'looks/faq.html'){ // === means true without type coersion - the type and value most both be equal
		jQuery.hideThem();
	}//if faq



	
	if(settingsObjeto.url === 'looks/creaNepe.html'){
		jQuery.handleCreaNepeSubmit();
	}//if creaNepe
	



	if(settingsObjeto.url === 'looks/recentNepes.html'){
		jQuery.getJSON('escritos/getRecentNepes.php')
		.done(function(datos, estatusForDONE, xhrObjetoForDONE){
			var labelAndTable = '<label class="">Negocios Recientes:</label>';
			labelAndTable   +=  '<table class="subArea">';
			jQuery.each(datos, function(index){
					labelAndTable += '<tr><td>' 
					+ '<a href="portada.html"  class="link look-profile" data-nepeid="' 
					+ datos[index].nepeId  + '">' 
					+ datos[index].nepeNombre 
					+ '   (' +  datos[index].dias  +  ' dias)' 
					+ '</a></td></tr>';
			});
			labelAndTable += '</table>';
			jQuery('#labelAndTableContainer').html(labelAndTable);
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
	}//if recent Nepes




	if(settingsObjeto.url === 'looks/error.html'){
		if(DEBUGUEO){
			var xhrObjetoForFAILTexto = decodeURIComponent( jQuery('ul.navega li a.look-error').data( 'xhrObjetoForFAILTexto' ) ); 
			var textoEstatus 		  = decodeURIComponent( jQuery('ul.navega li a.look-error').data( 'textoEstatus' ) ); 
			var elError               = decodeURIComponent( jQuery('ul.navega li a.look-error').data( 'elError' ) ); 
			
			losLis = '<br><hr>';
				
			losLis += '<li><span class="color01enfasis">El error:<br></span>' + elError + '<br><br></li>';		
			losLis += '<li><span class="color01enfasis">Texto Estatus:<br></span>' + textoEstatus + '<br><br></li>';
			losLis += '<li><span class="color01enfasis">xhr Objecto Texto:<br></span>'      + xhrObjetoForFAILTexto + '</li>';
				
			losLis += '<br><hr>';
			jQuery('#containerForErrors').append(losLis);
		}
	}//if error




	if(settingsObjeto.url === 'looks/profile.html'){
		key = 'nepe_id';
		jQuery.getJSON('escritos/getSessionValue.php', {key:key})
		.done(function(nepeId, estatusForDONE, xhrObjetoForDONE){
			//alert('dame datos to fill el profile ' + nepeId);
			jQuery.getJSON('escritos/getNepe.php')
			.done(function(datos, estatusForDONE, xhrObjetoForDONE){
					
						//insert json data into profile look 
						
						//var date = new Date(datos.revisado).toString();
						//alert('datos revisado: ' + datos.revisado + ' date: ' + date);
						//jQuery('#video h5').text('Revisado: ' + date.substring(0, -1+date.indexOf('00:00:00')));
						
						var date = new Date(datos.revisado);
						//alert(date);
						var opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
						jQuery('#video h5').text('' + date.toLocaleDateString('es-ES', opciones)); 
						
						jQuery('#video h2').text(datos.nombre);
						
						//alert('url: ' + datos.videoUrl + '\nis Valid Video Url: ' + datos.isValidVideoUrl);
						if(datos.videoCode == 0){
							jQuery('#video iframe').hide();
						}else if(datos.videoCode == 1){
							var str = datos.videoUrl;
							//alert( 'https://www.youtube.com/embed/' + str.substring(str.length - 11, str.length) );
							jQuery('#video iframe').attr('src', 'https://www.youtube.com/embed/' + str.substring(str.length - 11, str.length)); 		
						}else {		//  if(datos.videoCode == 2)
							//jQuery('#video iframe').attr('src', 'https://www.youtube.com/embed/' + '123456789');
							jQuery('#video iframe').attr('src', 'https://www.youtube.com/embed/' + '6qpudAhYhpc');  // hacker movie
						}
						
						
						//alert(datos.quienSocialHandle);
						if(datos.quienSocialHandle.email != '')   jQuery('#quien h5.envelope').text(datos.quienSocialHandle.email);    // si no cambias valores, se quedan los de looks/profile.html
						if(datos.quienSocialHandle.fbk != '')  jQuery('#quien h5.facebook').text(datos.quienSocialHandle.fbk);
						if(datos.quienSocialHandle.igrm != '') jQuery('#quien h5.instagram').text(datos.quienSocialHandle.igrm);
						if(datos.quienSocialHandle.phn != '')  jQuery('#quien h5.phone').text(datos.quienSocialHandle.phn);
						//following code works when there are 5 or less images coming from getJSON.
						//the html is prepared for a max of 5 images, this code removes excess html when less than 5 images come
						//alert(datos.quienFotoSrc);
						jQuery('#quien #profilefotos img').each(function(index){
							if(index < datos.quienFotoSrc.length) { jQuery(this).attr('src', 'imagenes/profile/subidas/' + datos.quienFotoSrc[index] + '?v=' + Math.random() ); }
							else { jQuery(this).remove(); }
						});
						//alert(datos.cuando);
						if(datos.cuando.lun  != '') jQuery('#cuando td.lun').text(datos.cuando.lun);			// si no cambias valores, se quedan los de looks/profile.html
						if(datos.cuando.mar  != '') jQuery('#cuando td.mar').text(datos.cuando.mar);
						if(datos.cuando.mier != '') jQuery('#cuando td.mier').text(datos.cuando.mier);
						if(datos.cuando.jue  != '') jQuery('#cuando td.jue').text(datos.cuando.jue);
						if(datos.cuando.vier != '') jQuery('#cuando td.vier').text(datos.cuando.vier);
						if(datos.cuando.sab  != '') jQuery('#cuando td.sab').text(datos.cuando.sab);
						if(datos.cuando.dom  != '') jQuery('#cuando td.dom').text(datos.cuando.dom);
						//following code works when there are 10 or less 'que' coming from getJSON.
						//the html is prepared for a max of 10 'que', this code removes excess html when less than 10 'que' come
						//alert(datos.que);
						jQuery('#que li a').each(function(index){
							if(index < datos.que.length) {
								jQuery(window.location).attr('href', window.location.pathname + '?look=opciones&que=' + encodeURIComponent(datos.que[index]) + '&donde=' + encodeURIComponent('')  );
							} else { jQuery(this).remove(); }
						});
						//following code works when there are 5 or less 'donde' coming from getJSON.
						//the html is prepared for a max of 5 'donde', this code removes excess html when less than 5 'donde' come
						//alert(datos.donde);
						jQuery('#donde li a').each(function(index){
							if(index < datos.donde.length) {
								jQuery(window.location).attr('href', window.location.pathname + '?look=opciones&que=' + encodeURIComponent('') + '&donde=' + encodeURIComponent(datos.donde[index])  );
							}else { jQuery(this).remove(); }
						});
						//alert('a tu casa: ' + datos.atucasa + '\ntipo: ' + typeof datos.atucasa);
						var clase = 'no'; if(datos.atucasa) clase = 'si';
						jQuery('#donde span#background').attr('class', clase);
						//jQuery('#donde span#background').after.remove();
						jQuery('#donde span.texto').text(clase);
				
						
						//show only 1 social handle with class current
						var $icon = jQuery('div#quien ul li').click(function(evento){
							evento.preventDefault();
							jQuery('div#quien ul li i').removeClass('current');
							var $imgToFocus = jQuery(evento.currentTarget).find('i');
							var socialClass = $imgToFocus.attr('class'); // grab the name this class, used to select h3 with same class
							$imgToFocus.addClass('current');
				
							jQuery('div#quien h5').removeClass('current');
							jQuery('div#quien h5').each(function(){
								if( socialClass.includes( jQuery(this).attr('class') ) ){
									jQuery(this).addClass('current');
								}
							});
						});
									
						//hide, show on click
						jQuery.hideThem();
					
			
			})//done
			.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
				var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
				//var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
				//jQuery(window.location).attr('href', path); 
				jQuery('ul.navega li a.look-error').data( 'xhrObjetoForFAILTexto', encodeURIComponent(xhrObjetoForFAILTexto) );
				jQuery('ul.navega li a.look-error').data( 'textoEstatus', encodeURIComponent(textoEstatus) );
				jQuery('ul.navega li a.look-error').data( 'elError', encodeURIComponent(elError) );
				jQuery('.look-error').click();
			});
		});
	}//if profile



	if(settingsObjeto.url === 'looks/updateNepe.html'){
		key = 'nepe_id';
		jQuery.getJSON('escritos/getSessionValue.php', {key:key})
		.done(function(nepeId, estatusForDONE, xhrObjetoForDONE){
			//alert('dame datos to update el nepe ' + nepeId);
			jQuery.getJSON('escritos/getNepe.php')
			.done(function(datos, estatusForDONE, xhrObjetoForDONE){
					//alert('popula');
					jQuery.populateUpdateNepeForm(datos);
					//alert('handle submit');
					jQuery.handleUpdateNepeSubmit(nepeId);
			})//done
			.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
			var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
			//var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
			//jQuery(window.location).attr('href', path); 
			jQuery('ul.navega li a.look-error').data( 'xhrObjetoForFAILTexto', encodeURIComponent(xhrObjetoForFAILTexto) );
			jQuery('ul.navega li a.look-error').data( 'textoEstatus', encodeURIComponent(textoEstatus) );
			jQuery('ul.navega li a.look-error').data( 'elError', encodeURIComponent(elError) );
			jQuery('.look-error').click();
			});
		});
	}//if update nepe




});//ajax complete
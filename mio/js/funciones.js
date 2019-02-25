//extracs parameters from the url
jQuery.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if(results === null) return null;
	else return results[1];
	//return results[1] || 0;
}
jQuery.cleanStr = function(str){
	/*
	newStr01 = str.replace(/[^a-zA-Z 0-9]+/g, '');
	newStr02 = str.replace(/[^a-z0-9]/gi, ' ');
	newStrArray01 = newStr01.split(' ');
	newStrArray02 = newStr02.split(' ');

	arrayParts01 = '';
	arrayParts02 = '';
	for(var i=0; i < newStrArray01.length; i++){
		arrayParts01 += '(' + newStrArray01[i] + ')';
	}
	for(var i=0; i < newStrArray02.length; i++){
		arrayParts02 += '(' + newStrArray02[i] + ')';
	}
	alert('[' + str + '] -> [' + newStr01 + '] -> [' + arrayParts01 + '] :: [' + newStr02 + '] -> [' + arrayParts02 + ']');
	return newStr02;
	//On result array only copy from  newStrArray[], when it is NOT ''
	//when  newStrArray[i] is '',  it is shown in arrayParts as ()
	//it means split found delimiters back to back and there is nothing between them.
	*/
	str = str.replace(/[^a-z0-9]/gi, '*'); // same as replace(/[^a-zA-Z0-9]/g, '*'); JavaScript is a case-sensitive language
	strArray = str.split('*');
	result = '';
	for(var i=0; i < strArray.length; i++){
		if (strArray[i] != '') {
			if(result !== ''){result += ' ';} //the first time, simply add the 'word', other times add a ' ' before the word
			result += strArray[i];
		}
	}
	return result;
}
jQuery.isVacioStr = function(str){
	if (str === null) return true;
	return str.length == 0;
}
jQuery.fallas = function(xhrObjetoForFAIL, estatusForFAIL, errorMessageSentByServer){
//Called at getJSON .fail and jQuery post when parsing errors (caused by PHP Exceptions), and
//other errors are found.
//jQuery getJSON will throw an error and run the .fail code whenever it cannot
//parse a response from server, (that includes PHP Exceptions which are not valid JSON!).  So the
//text from PHP Exceptions will endup here.
//jQuery post will NOT run .fail code when JSON parsing errors are found. So in order
//to redirect here PHP Exceptions from the login section,
//i have to explicitly try the JSON parse in a try-catch block, and when a parsing error
//is catched, call this function.
	jQuery.get('looks/error.html', function(datosDeRespuesta, estatus, xhrObjeto){
		var mainDeError = jQuery(datosDeRespuesta).filter('#main');
		jQuery('#containerForMain').html(mainDeError);
	});
	jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
		if(settingsObjeto.url === 'looks/error.html'){
			losLis = '<br><hr>';
			losLis += '<li>' + xhrObjetoForFAIL.responseText + '</li>';
			losLis += '<li>' + estatusForFAIL + '</li>';
			losLis += '<li><span class="colorenfasis">Message sent by servidor PHP:<br></span>' + errorMessageSentByServer + '</li>';
			losLis += '<br><hr>';
			jQuery('#containerForErrors').append(losLis);
		}
	});
}
jQuery.feedback = function(elementoDonde, mensaje){
	jQuery(elementoDonde).text(mensaje);    //    .slideDown(500).delay(1000).slideUp(2000)
}

jQuery.areValidUserYPass = function(usertb, pass01, pass02, feedbackType, whatElement){
	//Esta funcion la usan login y registra
	//para detectar valores invalidos q se pueden chequear con JavaScript, y evitar post innecesarios.
	//Chequear Usuario repetido requiere hacer el post, pq requiere info de database.
	// 1)lenght >= 4; 2)only numbers or letters; 3)both pass are equal; se puede chequear antes del post
	usertbCheck = usertb.replace(/[^a-z0-9]/gi, '');  //same as replace(/[^a-zA-Z0-9]/g, ''); JavaScript is a case-sensitive language
	pass01Check = pass01.replace(/[^a-z0-9]/gi, '');
	pass02Check = pass02.replace(/[^a-z0-9]/gi, '');
	if(usertb.length < 4 || pass01.length < 4 || pass02.length < 4){
		if(feedbackType.indexOf('fullFeedback') !== -1){
			jQuery.feedback(whatElement, "Usuario o contrase\u00f1a es muy corto.");
		}else if(feedbackType.indexOf('generalFeedback') !== -1){
			jQuery.feedback(whatElement, 'Trata otra vez.');
		}
		return false;
	}else if(usertbCheck.length < usertb.length  ||  pass01Check.length < pass01.length ||  pass02Check.length < pass02.length){
		if(feedbackType.indexOf('fullFeedback') !== -1){
			jQuery.feedback(whatElement, 'Usa solo letras y/o numeros.');
		}else if(feedbackType.indexOf('generalFeedback') !== -1){
			jQuery.feedback(whatElement, 'Trata otra vez.');
		}
		return false;
	}else if(pass01 !== pass02){  //same type, same value, no type conversion, case sensitive
		if(feedbackType.indexOf('fullFeedback') !== -1){
			jQuery.feedback(whatElement, 'Las contrase\u00f1as son diferentes.');
		}else if(feedbackType.indexOf('generalFeedback') !== -1){
			jQuery.feedback(whatElement, 'Trata otra vez.');
		}
		return false;
	}else{
		return true;
	}
}
jQuery.haveAtLeast1Handle = function(){
	if(jQuery.isVacioStr(jQuery('form#editMicroEmpreForm input[name=red1]').val()) &&  jQuery.isVacioStr(jQuery('form#editMicroEmpreForm input[name=red2]').val()) &&
	   jQuery.isVacioStr(jQuery('form#editMicroEmpreForm input[name=red3]').val()) &&  jQuery.isVacioStr(jQuery('form#editMicroEmpreForm input[name=red4]').val()) ) {
		jQuery.feedback('fieldset#socialHandleFieldset h3', 'Minimo 1 contacto');
		jQuery('fieldset#socialHandleFieldset').addClass('warn');
		return false;
	}else{
		jQuery.feedback('fieldset#socialHandleFieldset h3', '');
		jQuery('fieldset#socialHandleFieldset').removeClass('warn');
		return true;
	}
}
jQuery.have5OrLessFotos = function(){
	if(jQuery('form#editMicroEmpreForm input#fotosId')[0].files.length > 5 ){
		jQuery.feedback('fieldset#fotoSrcFieldset h3', 'Maximo 5 fotos');
		jQuery('fieldset#fotoSrcFieldset').addClass('warn');
		return false;
	}else{
		jQuery.feedback('fieldset#fotoSrcFieldset h3', '');
		jQuery('fieldset#fotoSrcFieldset').removeClass('warn');
		return true;
	}
}
jQuery.toggleOnClick = function(){
	var $todosLosNotHidable = jQuery('.notHidable');
	var $todosLosHidable = jQuery('.hidable');
	$todosLosHidable.hide();
	$todosLosNotHidable.on('click', function(evento){
		var $toToggle = jQuery(evento.currentTarget).siblings('.hidable');
		$toToggle.toggle();
	});
}
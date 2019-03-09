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
jQuery.toggleOnClick = function(){
	var $todosLosNotHidable = jQuery('.notHidable');
	var $todosLosHidable = jQuery('.hidable');
	$todosLosHidable.hide();
	$todosLosNotHidable.on('click', function(evento){
		var $toToggle = jQuery(evento.currentTarget).siblings('.hidable');
		$toToggle.toggle();
	});
}
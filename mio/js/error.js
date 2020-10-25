jQuery.fallas = function(xhrObjetoForFAILTexto, textEstatus, elError){            
//Called at getJSON .fail and jQuery post when parsing errors (caused by PHP Exceptions), and
//other errors are found.
//jQuery getJSON will throw an error and run the .fail code whenever it cannot
//parse a response from server, (that includes PHP Exceptions which are not valid JSON!).  So the
//text from PHP Exceptions will endup here.
//jQuery post will NOT run .fail code when JSON parsing errors are found. So in order
//to redirect here PHP Exceptions from the login section,
//i have to explicitly try the JSON parse in a try-catch block, and when a parsing error
//is catched, call this function.
	//get creaDueno look


	/*
	//jQuery.dameLook('looks/error.html');
	jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
		if(settingsObjeto.url === 'looks/error.html'){
			losLis = '<br><hr>';
			
			losLis += '<li>' + estatusForFAIL + '</li>';
			losLis += '<li><span class="color01enfasis">Mensaje del servidor:<br></span>' + errorMessageSentByServer + '</li>';
			losLis += '<li><span class="color01enfasis">Texto respuesta:<br></span>'      + xhrObjetoForFAIL.responseText + '</li>';
			
			losLis += '<br><hr>';
			jQuery('#containerForErrors').append(losLis);
		}
	});
	*/
	
	losLis = '<br><hr>';
			
	losLis += '<li><span class="color01enfasis">Texto Estatus:<br></span>' + textEstatus + '<br><br></li>';
	losLis += '<li><span class="color01enfasis">El error:<br></span>' + elError + '<br><br></li>';
	losLis += '<li><span class="color01enfasis">xhr Objecto Texto:<br></span>'      + xhrObjetoForFAILTexto + '</li>';
		
	losLis += '<br><hr>';
	jQuery('#containerForErrors').append(losLis);
}
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


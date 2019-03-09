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
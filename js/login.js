jQuery.handleLoginSubmit = function(){
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
					
					var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // first arg is not xhr Object, so no responseText member will be obtained in encodeAndGetErrorPath() at functiones.js - will produce an undefined
					jQuery(window.location).attr('href', path); 
				}
				if(datosJSObj.loguea){
					//jQuery(window.location).attr('href', window.location.pathname + '?look=home&duenoId=' + datosJSObj.duenoId);
					  jQuery(window.location).attr('href', window.location.pathname + '?look=home');
				}else{
					//alert('datosJSObj.loguea: ' + datosJSObj.loguea);
					jQuery.feedback('form#loginForm h3', 'Trata otra vez.');
				}
			})
			.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
				var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
				var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
				jQuery(window.location).attr('href', path); 
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
	
}
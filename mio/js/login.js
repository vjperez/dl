jQuery.handleLoginSubmit = function(){
	jQuery('form#loginForm').submit(function(evento){
		evento.preventDefault(); //not making a submit (POST request) from html action.
		var user = jQuery('#usernameId').val();
		var pass = jQuery('#passwordId').val();
		if( jQuery.areValidUserYPass(user, pass, pass, "generalFeedback", 'form#loginForm h3') ){
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
					jQuery.fallas(new Object(), 'Error parseando la siguiente respuesta del server en escritos/login.php<br>' + errorParseo.name + ' mensaje= ' + errorParseo.message, datosJSONStr);
				}
				if(datosJSObj.loguea){
					jQuery(window.location).attr('href', window.location.pathname + '?look=editDuenoShowEmpresas&duenoId=' + datosJSObj.duenoId);
				}else{
					//alert('datosJSObj.loguea: ' + datosJSObj.loguea);
					jQuery.feedback('form#loginForm h3', 'Trata otra vez.');
				}
			})
			.fail(  jQuery.fallas  );//fail
		}
	});

	jQuery('form#loginForm  input[name=password]').keyup(function(){
		jQuery.feedback('form#loginForm h3', '');
	});

	jQuery('form#loginForm  input[name=username]').keyup(function(){
		jQuery.feedback('form#loginForm h3', '');
	});
	
}
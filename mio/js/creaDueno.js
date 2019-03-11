jQuery.handleSubmit = function(){
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
					jQuery.fallas(new Object(), 'Error parsing la siguiente respuesta del server en escritos/creaDueno.php<br>' + errorParseo.name + ' : ' + errorParseo.message, datosJSONStr);
				}
				if(datosJSObj.registrado){
					jQuery(window.location).attr('href', window.location.pathname + '?look=editDuenoShowEmpresas&duenoId=' + datosJSObj.duenoId);
				}else{ // usuario es repetido en el database, por eso se chequea despues del post
					jQuery.feedback('form#creaDuenoForm h3', datosJSObj.feedback);
				}
			})
			.fail(  jQuery.fallas  );  //failing post
		}
	});
}
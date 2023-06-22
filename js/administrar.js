//erase feedback when user writting
jQuery('form#adminEditClaveForm  input').keydown(function(){
	jQuery.feedback('form#adminEditClaveForm h3', '');
});
//erase feedback when user writting
jQuery('form#adminNepesForm  input[type=text]').keydown(function(){
	jQuery.feedback('form#adminNepesForm h3', '');
});

jQuery.getNombre = function(){
	jQuery.getJSON('escritos/dueno/getNombre.php',  {userNumber:userNumber} )
	.done(function(dato, estatusForDONE, xhrObjetoForDONE){
		return dato;
	})
	.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
		var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
		var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
		jQuery(window.location).attr('href', path); 
	});
}

//do this when form submitted ; adminNepesForm
jQuery('form#adminNepesForm').submit(function(evento){
	evento.preventDefault(); //not making a submit (POST request) from html action.
	
	var usuario = jQuery.getNombre();		
	var label = '<label class="">' + 'Negocios de ' + usuario + '</label>'; 
	jQuery('fieldset#labelContainer').html('');
	jQuery('fieldset#labelContainer').append(label);

	var userNumber = jQuery('#userNumber02Id').val();
	jQuery.post('escritos/showNepesGetIds.php', {userNumber:userNumber} )
	.done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){
		try{
			//alert('datosJSONStr: ' + datosJSONStr);
			datosJSObj = JSON.parse(datosJSONStr);
			//alert('datosJSObj: ' + datosJSObj);
		}catch(errorParseo){
			var datosJSONStrAsXHRTexto = datosJSONStr;
			var textoEstatus = 'Error parseando la siguiente respuesta del servidor desde escritos/showNepesGetIds.php en administrar :<br> Mensaje: ' + errorParseo.message;
			var elError = errorParseo.name;
			
			var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // first arg is not xhr Object, so no responseText member will be obtained in encodeAndGetErrorPath() at functiones.js - will produce an undefined
			jQuery(window.location).attr('href', path);				
		}
		var table =  '<table class="subArea">';
		var cuantos = 0;
		jQuery.each(datosJSObj, function(index){
			table += '<tr><td><a class="" href="portada.html?look=adminDuenoNepes'
			+ '&acto=deleteNepe' +  '&nepeId=' + datosJSObj[index].nepeId + '">' 
			+ datosJSObj[index].nepeNombre + '<i class="fas fa-trash-alt"></i>' 
			+ '</a></td></tr>';	
			cuantos++;
		});
		
		if(cuantos > 1){
			table += '<tr><td>Los ' + cuantos + ' negocios.</td></tr>';
			table += '<tr><td> </td></tr>';		
			table += '<tr><td><a class="" href="portada.html?look=adminDuenoNepes'
			+ '&acto=deleteHerNepes' +  '&userId=' + userNumber + '">' 
			+ ' Borra ALL nepes de ' + dato + '<i class="fas fa-trash-alt"></i>' 
			+ '</a></td></tr>';
		}
		table += '</table>';
		jQuery('fieldset#tableContainer').html('');
		jQuery('fieldset#tableContainer').append(table);	
	})
	.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
		var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
		var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
		jQuery(window.location).attr('href', path); 
	});
	
});	




//do this when form submitted ; adminEditClaveForm
jQuery('form#adminEditClaveForm').submit(function(evento){
	evento.preventDefault(); //not making a submit (POST request) from html action.
	var user = 'valorDummy';
	var pass01 = jQuery('#passwordId').val();
	var pass02 = jQuery('#passwordConfirmId').val(); 
	if( jQuery.areValidUserYPass(user, pass01, pass02, 'fullFeedback', 'form#adminEditClaveForm h3') ){
		//Valid values son los q cumplen estas 3 cosas.
		//Estas cosas se pueden chequear antes del post y evito post sin sentido
		// 1)lenght >= 4; 2)only numbers or letters; 3)both pass are equal;
		//Si tengo valores q fueron registrables entonces, Making a submit (POST request) here. Not in look=editDuenoShowEmpresas
		
		var userNumber = jQuery('#userNumberId').val();
		jQuery.post('escritos/dueno/editClave.php', {pass01:pass01, userNumber:userNumber} )
		.done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){
			//el getJSON no entra al .done y cae en .fail si detecta errores de parseo.
			//Con el post tengo yo que usar un try block para detectar errores de parseo y mandarlo a jQuery fallas
			try{
				//alert('datosJSONStr: ' + datosJSONStr);
				datosJSObj = JSON.parse(datosJSONStr);
				//alert('datosJSObj.loguea: ' + datosJSObj.loguea);
			}catch(errorParseo){
				var datosJSONStrAsXHRTexto = datosJSONStr;
				var textoEstatus = 'Error parseando la siguiente respuesta del servidor desde escritos/dueno/editClave.php en administrar :<br> Mensaje: ' + errorParseo.message;
				var elError = errorParseo.name;
				
				var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // first arg is not xhr Object, so no responseText member will be obtained in encodeAndGetErrorPath() at functiones.js - will produce an undefined
				jQuery(window.location).attr('href', path);				
			}
			var usuario = jQuery.getNombre();
			if(datosJSObj.editado){	
				var feedback = 'Password de ' + usuario + ' fue editado.'; 
				jQuery.feedback('form#adminEditClaveForm h3', feedback);
				})
			}else{
				var feedback = 'Password de ' + usuario + ' no fue editado.';
				jQuery.feedback('form#adminEditClaveForm h3', feedback);
			}
		})
		.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
			var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
			var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
			jQuery(window.location).attr('href', path); 
		});
	}
});	
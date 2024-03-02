//major task 1
//build formdata and make post
jQuery('form#nepeForm').submit(function(evento){
	evento.preventDefault(); //not making a submit (POST request) from html action
	// 1) build and edit formdata
	var forma = document.getElementById('nepeForm');
	var formData = new FormData(forma);

	//nombre
	var regexp = new RegExp(/[^a-z0-9ñüàáèéìíòóùú@._+-]/gi);	//	allowing letters, numbers plus los de login   @ . _ - +	
	var nombre = jQuery.cleanStr( jQuery('form#nepeForm input[name=nombre]').val(), regexp );
	if(jQuery.isVacioStr(nombre)){
		formData.delete("nombre"); 			formData.append('nombre', 'sin nombre');
	}else{
		formData.delete("nombre"); 			formData.append('nombre', nombre);
	}

	//cuando is a JS object, it is stringified before sending it
	regexp = new RegExp(/[^a-z0-9ñüàáèéìíòóùú@._+-:]/gi);	//	allowing letters, numbers plus los de login   @ . _ - +	  y  :
	var cuando = {  lun:jQuery.cleanStr( jQuery('form#nepeForm input[name=dia1]').val(), regexp ), 
					mar:jQuery.cleanStr( jQuery('form#nepeForm input[name=dia2]').val(), regexp ),
					mie:jQuery.cleanStr( jQuery('form#nepeForm input[name=dia3]').val(), regexp ),
					jue:jQuery.cleanStr( jQuery('form#nepeForm input[name=dia4]').val(), regexp ),
					vie:jQuery.cleanStr( jQuery('form#nepeForm input[name=dia5]').val(), regexp ),
					sab:jQuery.cleanStr( jQuery('form#nepeForm input[name=dia6]').val(), regexp ),
					dom:jQuery.cleanStr( jQuery('form#nepeForm input[name=dia7]').val(), regexp )
	};
	formData.delete("dia1"); //sending dias in array so delete them individually from formData
	formData.delete("dia2"); //sending dias in array so delete them individually from formData
	formData.delete("dia3"); //sending dias in array so delete them individually from formData
	formData.delete("dia4"); //sending dias in array so delete them individually from formData
	formData.delete("dia5"); //sending dias in array so delete them individually from formData
	formData.delete("dia6"); //sending dias in array so delete them individually from formData
	formData.delete("dia7"); //sending dias in array so delete them individually from formData
	cuando = JSON.stringify(cuando);
	formData.append('cuando', cuando);

	console.log("form built");
	//for (var value of formData.values()) {
	//	console.log(value);
	//}
	console.log(formData);
	//formdata built


	// 2) do the post submition
	jQuery.ajax({method:"POST", url:"escritos/nepe/crea.php", data:formData, processData:false, contentType:false, cache:false})
	.done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){
		//el getJSON no entra al .done y cae en .fail si detecta errores de parseo.
		//Con el post tengo yo que usar un try block para detectar errores de parseo y mandarlo a jQuery fallas
		try{
			datosJSObj = JSON.parse(datosJSONStr);
			//alert('datosJSONStr: ' + datosJSONStr);
			//alert('datosJSObj.registrado: ' + datosJSObj.registrado + '\ndatosJSObj.feedback: ' + datosJSObj.feedback + '\ndatosJSObj.duenoId: ' + datosJSObj.duenoId);
		}catch(errorParseo){
			let datosJSONStrAsXHRTexto = datosJSONStr;
			let textoEstatus = 'Error parseando la siguiente respuesta del server desde escritos/creaNepe.php :<br> Mensaje: ' + errorParseo.message;
			let elError = errorParseo.name;
			let path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // first arg is not xhr Object, so no responseText member will be obtained in encodeAndGetErrorPath() at functiones.js - will produce an undefined
			jQuery(window.location).attr('href', path);					
		}
		if(datosJSObj.nepeMainCreado){
			jQuery(window.location).attr('href', window.location.pathname +  '?look=updateNepe&index=' + datosJSObj.index);
		}else{
			//jQuery.feedback('form#nepeForm h5', datosJSObj.feedback);
		}
	})
	.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
		var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
		var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
		jQuery(window.location).attr('href', path);
	});			
	// post made
	
});  //jQuery submit

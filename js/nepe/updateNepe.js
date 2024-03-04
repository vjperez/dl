//task 1
//populate form
jQuery.populateUpdateNepeForm = function(datos){
	//nombre
	jQuery('div#nepeTitulo h2').text(datos.nombre);
	jQuery('fieldset#nombreFieldset input[name=nombre]').val(datos.nombre);
	
	//cuando
	jQuery('fieldset#cuandoFieldset input[name=dia1]').val(datos.cuando.lun);
	jQuery('fieldset#cuandoFieldset input[name=dia2]').val(datos.cuando.mar);
	jQuery('fieldset#cuandoFieldset input[name=dia3]').val(datos.cuando.mie);
	jQuery('fieldset#cuandoFieldset input[name=dia4]').val(datos.cuando.jue);
	jQuery('fieldset#cuandoFieldset input[name=dia5]').val(datos.cuando.vie);
	jQuery('fieldset#cuandoFieldset input[name=dia6]').val(datos.cuando.sab);
	jQuery('fieldset#cuandoFieldset input[name=dia7]').val(datos.cuando.dom);
	
	//desdeCasa - suCasa
	let inputValue = datos.desdeCasa;
	let selector = 'fieldset#desdeCasaFieldset input[value=' + inputValue + ']';
	jQuery(selector).prop('checked', true);
	    inputValue = datos.suCasa;
	    selector = 'fieldset#suCasaFieldset    input[value=' + inputValue + ']';
	jQuery(selector).prop('checked', true);
	
	//  ------------------------          ---------------------  //
	
	//video
	jQuery('fieldset#videoFieldset textarea[name=videoUrl]').val(datos.videoUrl);
	
	//foto - falta each para array
	//jQuery('fieldset#fotoFieldset input[name=^fotoArr]').prop('required', false);

	//the html is prepared for a max of 10 'que'
	jQuery('fieldset#queFieldset input[name^=que]').each(function(indice){
		if(indice < datos.losQue.length) { jQuery(this).val(datos.losQue[indice]); }
	    //en submit entran al arreglo, luego de pasar por cleanStr() y  isNotVacioStr()		  
	});

	//the html is prepared for a max of 5 'donde'
	jQuery('fieldset#dondeFieldset input[name^=donde]').each(function(indice){
		if(indice < datos.losDonde.length) { jQuery(this).val(datos.losDonde[indice]); }
		//en submit entran al arreglo, luego de pasar por cleanStr() y  isNotVacioStr()
	});
}
//get data to populate form
let index = jQuery.urlParametro('index');			
jQuery.getJSON('escritos/nepe/read/getNepe.php', {nepe_index:index} )
.done(function(nepeDatos, estatusForDONE, xhrObjetoForDONE){
	jQuery.populateUpdateNepeForm(nepeDatos);
})
.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
	var xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
	var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
	jQuery(window.location).attr('href', path); 
});




//task 2
//build formdata with cleanStr() and isVacioStr() returned values ... and make post
var submitVote1 = true;
var submitVote2 = true;
//var reducedImagesArray = []; 
jQuery('form#nepeForm').submit(function(evento){
	evento.preventDefault();
	if(submitVote1 && submitVote2){
		// 1) build and edit formdata
		var forma = document.getElementById('nepeForm');
		var formData = new FormData(forma);

		//nombre
		var regexp = new RegExp(/[^a-z0-9ñüàáèéìíòóùú@\._\-+]/gi);	//	allowing letters, numbers plus los de login   @ . _ - +				escaping dot and minus
		var nombre = jQuery.cleanStr( jQuery('fieldset#nombreFieldset input[name=nombre]').val(), regexp );
		if(jQuery.isVacioStr(nombre)){
			formData.delete("nombre"); 			formData.append('nombre', 'no name provided');
		}else{
			formData.delete("nombre"); 			formData.append('nombre', nombre);
		}
		
		//cuando is a JS array object, ... converted to string in JSON format
		regexp = new RegExp(/[^a-z0-9ñüàáèéìíòóùú@\._\-+:]/gi);	//	allowing letters, numbers plus los de login   @ . _ - +		y :			escaping dot and minus
		var cuando = {  lun:jQuery.cleanStr( jQuery('fieldset#cuandoFieldset input[name=dia1]').val(), regexp ), 
						mar:jQuery.cleanStr( jQuery('fieldset#cuandoFieldset input[name=dia2]').val(), regexp ),
						mie:jQuery.cleanStr( jQuery('fieldset#cuandoFieldset input[name=dia3]').val(), regexp ),
						jue:jQuery.cleanStr( jQuery('fieldset#cuandoFieldset input[name=dia4]').val(), regexp ),
						vie:jQuery.cleanStr( jQuery('fieldset#cuandoFieldset input[name=dia5]').val(), regexp ),
						sab:jQuery.cleanStr( jQuery('fieldset#cuandoFieldset input[name=dia6]').val(), regexp ),
						dom:jQuery.cleanStr( jQuery('fieldset#cuandoFieldset input[name=dia7]').val(), regexp )
		};
		formData.delete("dia1"); //sending all dias in a JSON string, so delete individual values from formData
		formData.delete("dia2"); 
		formData.delete("dia3"); 
		formData.delete("dia4");
		formData.delete("dia5"); 
		formData.delete("dia6"); 
		formData.delete("dia7"); 
		cuando = JSON.stringify(cuando);
		formData.append('cuando', cuando);

		//desdeCasa - suCasa

		//video
		regexp = new RegExp(/[^a-z0-9ñüàáèéìíòóùú\.:\/=\?@\._\-+]/gi);	//	allowing letters, numbers and simbols needed for a url .:/=? plus los de login   @ . _ - +
		var videoUrl = jQuery.cleanStr( jQuery('fieldset#videoFieldset textarea[name=videoUrl]').val(), regexp );
		if(jQuery.isVacioStr(videoUrl)){
			formData.delete("videoUrl"); 		formData.append('videoUrl', 'no video was added');
		}else{
			formData.delete("videoUrl"); 		formData.append('videoUrl', videoUrl);
		}

		//foto
		if(jQuery('fieldset#fotoFieldset   input[name^=fotoArr]')[0].files.length === 0){
			formData.delete("fotoArr[]");     
			formData.delete("MAX_FILE_SIZE");
		}
		/*
		formData.delete("fotoArr[]"); // borra las originales grandes
		jQuery.each(reducedImagesArray, function( indice, value ) {
			formData.append("fotoArr[]", value);
		});
		*/
		
		//que is a JS array, ... converted to string in JSON format
		var que = new Array();
		jQuery('fieldset#queFieldset input[name^=que]').each(function(indice){
			regexp = new RegExp(/[^a-z0-9ñüàáèéìíòóùú@\._\-+]/gi);	//	allowing letters, numbers plus los de login   @ . _ - +					escaping dot and minus
			var cleanedQue = jQuery.cleanStr(jQuery(this).val(), regexp );
			if(jQuery.isNotVacioStr(cleanedQue)) { que[indice] = cleanedQue; }
			formData.delete(jQuery(this).attr("name")); //sending all ques in JSON string so delete them individually from formData
		});
		que = JSON.stringify(que); 
		formData.append('losQue', que);
		
		
		//donde is a JS array, ... converted to string in JSON format
		var donde = new Array();
		jQuery('fieldset#dondeFieldset input[name^=donde]').each(function(indice){
			regexp = new RegExp(/[^a-z0-9ñüàáèéìíòóùú@\._\-+]/gi);	//	allowing letters, numbers plus los de login   @ . _ - +					escaping dot and minus
			var cleanedDonde = jQuery.cleanStr(jQuery(this).val(), regexp );
			if(jQuery.isNotVacioStr(cleanedDonde)) { donde[indice] = cleanedDonde; }
			formData.delete(jQuery(this).attr("name")); //sending all dondes in JSON string so delete them individually from formData
		});
		donde = JSON.stringify(donde);
		formData.append('losDonde', donde);
		
		formData.append('nepe_index', index );
		
		console.log("la forma...");
		for (const pareja of formData.entries()) {
			console.log('llave: ' + pareja[0] + '   valor: ' + pareja[1]);
		}
		//formdata built


		// 2) do the post submition
		jQuery.ajax({method:"POST", url:"escritos/nepe/update.php", data:formData, processData:false, contentType:false, cache:false})
		.done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){
			//el getJSON no entra al .done y cae en .fail si detecta errores de parseo.
			//Con el post tengo yo que usar un try block para detectar errores de parseo y mandarlo a encodeAndGetErrorPath()
			try{
				datosJSObj = JSON.parse(datosJSONStr);
			}catch(errorParseo){
				var datosJSONStrAsXHRTexto = datosJSONStr;
				var textoEstatus = 'Error parseando la siguiente respuesta del server desde escritos/nepe/update.php :<br> Mensaje: ' + errorParseo.message;
				var elError = errorParseo.name;
				
				var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); 
				jQuery(window.location).attr('href', path); 					
			}
			if(datosJSObj.actualizado){
				jQuery(window.location).attr('href', window.location.pathname + '?look=profile&nepeId=' + datosJSObj.nepeId);
			}else{
				//jQuery.feedback('form#updateNepeForm h2', datosJSObj.feedback);
			}
		})
		.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
			var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
			var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
			jQuery(window.location).attr('href', path); 
		});
		// post made
	}else{	  
		//html required fields are filled but js stoped the submission...
		//validation failed on haveAtLeast1(formaStr) and/or have5OrLessImages(formaStr)
		//no aditional feedback needed...
		//feedback given by validation functions...
		//they run to handle change events
	}
});  //jQuery submit
	



	



//jQuery.hideThemSections();
jQuery('fieldset#submitButtonFieldset button').on('click', function(evento){
	jQuery.showThemSections();
});

var $fotoBoton = jQuery('fieldset#fotoFieldset   button[type=button]');
var $fotoInput = jQuery('fieldset#fotoFieldset   input[name^=fotoArr]');
$fotoBoton.on('click', function(evento){
	$fotoInput.click();
});

/*
var formaStr = 'form#nepeForm';
//validation logic functions are run as handlers to change events
var $redInputs = jQuery( formaStr + ' input[name^=red]');
$redInputs.on('change', function(evento){
	jQuery.haveAtLeast1Red(formaStr);
});
*/
/*
var $fotoInput = jQuery( formaStr + ' input#fotoArrId');
$fotoInput.on('change', function(evento){
	jQuery.have5OrLessImages(formaStr);
});
*/
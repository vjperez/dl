var submitVote1 = true;
var submitVote2 = true;
var reducedImagesArray = []; 




//major task 1
//when ajax complete ; if already existing micro empre then populate form using that data
jQuery.populateUpdateNepeForm = function(datos){
	//nombre y video
	jQuery('div#updateNepeTitulo h2').text(datos.nombre);
	jQuery('form#updateNepeForm input[name=nombre]').val(datos.nombre);
	jQuery('form#updateNepeForm textarea[name=videoUrl]').val(datos.videoUrl);
	jQuery('form#updateNepeForm input[name=red1]').val(datos.quienSocialHandle.fbk);
	jQuery('form#updateNepeForm input[name=red2]').val(datos.quienSocialHandle.email);
	jQuery('form#updateNepeForm input[name=red3]').val(datos.quienSocialHandle.igrm);
	jQuery('form#updateNepeForm input[name=red4]').val(datos.quienSocialHandle.phn);

	//falta each para array de fotos
	jQuery('form#updateNepeForm input[name=fotoArr]').prop('required', false);

	//cuando
	jQuery('form#updateNepeForm input[name=dia1]').val(datos.cuando.lun);
	jQuery('form#updateNepeForm input[name=dia2]').val(datos.cuando.mar);
	jQuery('form#updateNepeForm input[name=dia3]').val(datos.cuando.mier);
	jQuery('form#updateNepeForm input[name=dia4]').val(datos.cuando.jue);
	jQuery('form#updateNepeForm input[name=dia5]').val(datos.cuando.vier);
	jQuery('form#updateNepeForm input[name=dia6]').val(datos.cuando.sab);
	jQuery('form#updateNepeForm input[name=dia7]').val(datos.cuando.dom);
	
	//following code works when there are 10 or less 'que' coming from getJSON.
	//the html is prepared for a max of 10 'que'
	jQuery('form#updateNepeForm input[name^=que]').each(function(index){
		if(index < datos.que.length) { jQuery(this).val(datos.que[index]); }
		else {  } //en el task3 aqui, entran al arreglo de ques, solo los cleaned ques que no son vacioStrs,
				  // ; en html profile solo se muestran los input field q entraron al arreglo los demas se remueven
	});

	//following code works when there are 5 or less 'donde' coming from getJSON.
	//the html is prepared for a max of 5 'donde'
	jQuery('form#updateNepeForm input[name^=donde]').each(function(index){
		if(index < datos.donde.length) { jQuery(this).val(datos.donde[index]); }
		else {  } //en el task3 aqui, entran al arreglo de dondes, solo los cleaned dondes que no son vacioStrs,
				  // ; en html profile solo se muestran los input field q entraron al arreglo los demas se remueven
	});

	jQuery('form#updateNepeForm input[value=si]').prop('checked', datos.atucasa);
	jQuery('form#updateNepeForm input[value=no]').prop('checked', !datos.atucasa);
}




//major task 2
//when ajax complete ; build formdata and make post
//jQuery.handleUpdateNepeSubmit = function(duenoId, nepeId){
jQuery.handleUpdateNepeSubmit = function(nepeId){
	jQuery('form#updateNepeForm').submit(function(evento){
		evento.preventDefault(); //not making a submit (POST request) from html action

		//alert("votos   " + submitVote1 + "   "+ submitVote2);

		// var submitVote2 es false por default, puede cambiar solo en have5OrLessImages(formaStr) que corre como handler de un change event, este event es requerido ya que el input de fotoArr esta required en HTML
		if(submitVote1 && submitVote2){ // 2 votes come from validation by haveAtLeast1Red(formaStr)  and have5OrLessImages(formaStr)
			// 1) build and edit formdata
			var forma = document.getElementById('updateNepeForm');
			var formData = new FormData(forma);

			//nombre y video
			var regexp = new RegExp(/[^a-z0-9ñüàáèéìíòóùú@\._\-+]/gi);	//	allowing letters, numbers plus los de login   @ . _ - +				escaping dot and minus
			var nombre = jQuery.cleanStr( jQuery('form#updateNepeForm input[name=nombre]').val(), regexp );
			if(jQuery.isVacioStr(nombre)){
				formData.delete("nombre"); 			formData.append('nombre', 'sin nombre');
			}else{
				formData.delete("nombre"); 			formData.append('nombre', nombre);
			}
			
			regexp = new RegExp(/[^a-z0-9ñüàáèéìíòóùú\.:\/=\?@\._\-+]/gi);	//	allowing letters, numbers and simbols needed for a url .:/=? plus los de login   @ . _ - +
			var videoUrl = jQuery.cleanStr( jQuery('form#updateNepeForm textarea[name=videoUrl]').val(), regexp );
			//if(jQuery.isVacioStr(videoUrl)){
			//	formData.delete("videoUrl"); 		formData.append('videoUrl', 'no video');
			//}else{
			formData.delete("videoUrl"); 		formData.append('videoUrl', videoUrl);
			//}

			//quienSocialHandle is a JS array object, it is stringified before sending it
			regexp = new RegExp(/[^a-z0-9ñüàáèéìíòóùú@\._\-+]/gi);	//	allowing letters, numbers plus los de login   @ . _ - +					escaping dot and minus
			var quienSocialHandle = {fbk:jQuery.cleanStr( jQuery('form#updateNepeForm input[name=red1]').val(), regexp ),
									  email:jQuery.cleanStr( jQuery('form#updateNepeForm input[name=red2]').val(), regexp ),
								    igrm:jQuery.cleanStr( jQuery('form#updateNepeForm input[name=red3]').val(), regexp ), 
									 phn:jQuery.cleanStr( jQuery('form#updateNepeForm input[name=red4]').val(), regexp )
			};
			formData.delete("red1"); //sending reds in array so delete them individually from formData
			formData.delete("red2"); //sending reds in array so delete them individually from formData
			formData.delete("red3"); //sending reds in array so delete them individually from formData
			formData.delete("red4"); //sending reds in array so delete them individually from formData
			quienSocialHandle = JSON.stringify(quienSocialHandle);
			formData.append('quienSocialHandle', quienSocialHandle);


			formData.delete("fotoArr[]"); // borra las originales grandes
			jQuery.each(reducedImagesArray, function( index, value ) {
				formData.append("fotoArr[]", value);
			});

			//cuando is a JS array object, it is stringified before sending it
			regexp = new RegExp(/[^a-z0-9ñüàáèéìíòóùú@\._\-+:]/gi);	//	allowing letters, numbers plus los de login   @ . _ - +		y :			escaping dot and minus
			var cuando = { lun:jQuery.cleanStr( jQuery('form#updateNepeForm input[name=dia1]').val(), regexp ), 
						   mar:jQuery.cleanStr( jQuery('form#updateNepeForm input[name=dia2]').val(), regexp ),
						  mier:jQuery.cleanStr( jQuery('form#updateNepeForm input[name=dia3]').val(), regexp ),
						   jue:jQuery.cleanStr( jQuery('form#updateNepeForm input[name=dia4]').val(), regexp ),
						  vier:jQuery.cleanStr( jQuery('form#updateNepeForm input[name=dia5]').val(), regexp ),
						   sab:jQuery.cleanStr( jQuery('form#updateNepeForm input[name=dia6]').val(), regexp ),
						   dom:jQuery.cleanStr( jQuery('form#updateNepeForm input[name=dia7]').val(), regexp )
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

			//sending ques in array
			var que = new Array();
			jQuery('form#updateNepeForm input[name^=que]').each(function(index){
				regexp = new RegExp(/[^a-z0-9ñüàáèéìíòóùú@\._\-+]/gi);	//	allowing letters, numbers plus los de login   @ . _ - +					escaping dot and minus
				var cleanedQue = jQuery.cleanStr(jQuery(this).val(), regexp );
				if(jQuery.isVacioStr(cleanedQue)) {  } else { que[index] = cleanedQue; }
				formData.delete(jQuery(this).attr("name")); //sending ques in array so delete them individually from formData
			});
			que = JSON.stringify(que); //alert(que);
			formData.append('que', que);

			//sending dondes in array
			var donde = new Array();
			jQuery('form#updateNepeForm input[name^=donde]').each(function(index){
				regexp = new RegExp(/[^a-z0-9ñüàáèéìíòóùú@\._\-+]/gi);	//	allowing letters, numbers plus los de login   @ . _ - +					escaping dot and minus
				var cleanedDonde = jQuery.cleanStr(jQuery(this).val(), regexp );
				if(jQuery.isVacioStr(cleanedDonde)) {  } else { donde[index] = cleanedDonde; }
				formData.delete(jQuery(this).attr("name")); //sending dondes in array so delete them individually from formData
			});
			donde = JSON.stringify(donde);  //alert(donde);
			formData.append('donde', donde);

			//formData.append('duenoId', duenoId);			////// using cookies now	///////////////
			formData.append('nepeId', nepeId);
			

			console.log("form built");
			for (var value of formData.values()) {
			   console.log(value);
			}
			//formdata built


			// 2) do the post submition
			jQuery.ajax({method:"POST", url:"escritos/updateNepe.php", data:formData, processData:false, contentType:false, cache:false})
			.done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){
				//el getJSON no entra al .done y cae en .fail si detecta errores de parseo.
				//Con el post tengo yo que usar un try block para detectar errores de parseo y mandarlo a jQuery fallas
				try{
					//alert('datosJSONStr: ' + datosJSONStr);
					datosJSObj = JSON.parse(datosJSONStr);
					//alert('datosJSObj.registrado: ' + datosJSObj.registrado + '\ndatosJSObj.feedback: ' + datosJSObj.feedback + '\ndatosJSObj.duenoId: ' + datosJSObj.duenoId);
				}catch(errorParseo){
					var datosJSONStrAsXHRTexto = datosJSONStr;
					var textoEstatus = 'Error parseando la siguiente respuesta del server desde escritos/updateNepe.php :<br> Mensaje: ' + errorParseo.message;
					var elError = errorParseo.name;
					
					var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // first arg is not xhr Object, so no responseText member will be obtained in encodeAndGetErrorPath() at functiones.js - will produce an undefined
					jQuery(window.location).attr('href', path); 					
				}
				if(datosJSObj.actualizado){		//maybe if is not needed after try catch block
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
		}else{	  // submitVote1 && submitVote2; visible only after all html required fields are filled but js stop the submission
			//not posting ...  validation by haveAtLeast1Red(formaStr) and have5OrLessImages(formaStr)  failed
			//no aditional feedback needed
			//all feedback given at haveAtLeast1Red(formaStr) and have5OrLessImages(formaStr) when they run to handle change events
		}
	});  //jQuery submit
}//  handleSubmit
	



	




jQuery('fieldset#submitButtonFieldset button').on('click', function(evento){
	jQuery.showThem();
});

var $fotoBoton = jQuery('fieldset#fotoSrcFieldset   button[type=button]');
$fotoBoton.on('click', function(evento){
	$fotoInput.click();
});


var formaStr = 'form#updateNepeForm';
//validation logic functions are run as handlers to change events
var $redInputs = jQuery( formaStr + ' input[name^=red]');
$redInputs.on('change', function(evento){
	jQuery.haveAtLeast1Red(formaStr);
});

var $fotoInput = jQuery( formaStr + ' input#fotosId');
$fotoInput.on('change', function(evento){
	jQuery.have5OrLessImages(formaStr);
});



//run initially
//jQuery.haveAtLeast1Red(formaStr);
//jQuery.have5OrLessImages(formaStr);
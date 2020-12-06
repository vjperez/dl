var submitVote2 = true;
var reducedImagesArray = []; 




//major task 1
//when ajax complete ; if already existing micro empre then populate form using that data
jQuery.populateUpdateNepeForm = function(datos){
	//nombre y video
	jQuery('form#updateNepeForm input[name=nombre]').val(datos.nombre);
	jQuery('form#updateNepeForm textarea[name=videoUrl]').val(datos.videoUrl);
	//quien
	jQuery('form#updateNepeForm input[name=red1]').val(datos.quienSocialHandle.fbk);
	jQuery('form#updateNepeForm input[name=red2]').val(datos.quienSocialHandle.tt);
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
		var submitVote1 = jQuery.haveAtLeast1Handle();
		// var submitVote2 es false por default, puede cambiar solo en have5OrLessImages() que corre como handler de un change event, este event es requerido ya que el input de fotoArr esta required en HTML
		if(submitVote1 && submitVote2){ // 2 votes come from validation by haveAtLeast1Handle() and have5OrLessImages()
			// 1) build and edit formdata
			var forma = document.getElementById('updateNepeForm');
			var formData = new FormData(forma);

			//nombre y video

			//quienSocialHandle is a JS array object, it is stringified before sending it
			var quienSocialHandle = {fbk:jQuery('form#updateNepeForm input[name=red1]').val(), tt:jQuery('form#updateNepeForm input[name=red2]').val(),
									igrm:jQuery('form#updateNepeForm input[name=red3]').val(),phn:jQuery('form#updateNepeForm input[name=red4]').val()};
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
			var cuando = {lun:jQuery('form#updateNepeForm input[name=dia1]').val(), mar:jQuery('form#updateNepeForm input[name=dia2]').val(),
						  mier:jQuery('form#updateNepeForm input[name=dia3]').val(), jue:jQuery('form#updateNepeForm input[name=dia4]').val(),
						  vier:jQuery('form#updateNepeForm input[name=dia5]').val(), sab:jQuery('form#updateNepeForm input[name=dia6]').val(),
						  dom:jQuery('form#updateNepeForm input[name=dia7]').val()};
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
				var cleanedQue = jQuery.cleanStr(jQuery(this).val());
				if(jQuery.isVacioStr(cleanedQue)) {  } else { que[index] = cleanedQue; }
				formData.delete(jQuery(this).attr("name")); //sending ques in array so delete them individually from formData
			});
			que = JSON.stringify(que); //alert(que);
			formData.append('que', que);

			//sending dondes in array
			var donde = new Array();
			jQuery('form#updateNepeForm input[name^=donde]').each(function(index){
				var cleanedDonde = jQuery.cleanStr(jQuery(this).val());
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
					var textoEstatus = 'Error parseando la siguiente respuesta del server en escritos/updateNepe.php :<br> Mensaje: ' + errorParseo.message;
					var elError = errorParseo.name;
					
					var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // first arg is not xhr Object, so no responseText member will be obtained in encodeAndGetErrorPath() at functiones.js - will produce an undefined
					jQuery(window.location).attr('href', path); 					
				}
				if(datosJSObj.actualizado){
					jQuery(window.location).attr('href', window.location.pathname + '?look=profile&nepeId=' + datosJSObj.nepeId);
				}else{
					//jQuery.feedback('form#updateNepeForm h3', datosJSObj.feedback);
				}
			})
			.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
				var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
				var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
				jQuery(window.location).attr('href', path); 
			});
			// post made
		}  // submitVote1 && submitVote2
		else
		{
			//not posting ...  validation by haveAtLeast1Handle() and have5OrLessImages()  failed
			//no aditional feedback needed
			//all feedback given at haveAtLeast1Handle() and have5OrLessImages() when they run to handle change events
		}
	});  //jQuery submit
	
	
	//hide, show on click ; editDuenoShowNepes task 3
	jQuery.toggleOnClick();

}//  handleSubmit




//validation logic run as change event handler
jQuery.haveAtLeast1Handle = function(){
	if(jQuery.isVacioStr(jQuery('form#updateNepeForm input[name=red1]').val()) &&  jQuery.isVacioStr(jQuery('form#updateNepeForm input[name=red2]').val()) &&
	   jQuery.isVacioStr(jQuery('form#updateNepeForm input[name=red3]').val()) &&  jQuery.isVacioStr(jQuery('form#updateNepeForm input[name=red4]').val()) ) {
			jQuery.feedback('fieldset#socialHandleFieldset h3', 'Minimo 1 contacto');
			jQuery('fieldset#socialHandleFieldset').addClass('warn');
			jQuery.feedback('fieldset#submitButtonFieldset h3#handlesFeedback', 'Verifica secci\u00F3n : QUIEN');
			return false;
	}else{
			jQuery.feedback('fieldset#socialHandleFieldset h3', '');
			jQuery('fieldset#socialHandleFieldset').removeClass('warn');
			jQuery.feedback('fieldset#submitButtonFieldset h3#handlesFeedback', '');
			return true;
	}
}




jQuery.have5OrLessImages = function(){ //2 questions here 1) five or less files? 2)are all files images?
	submitVote2 = false;  // default or initial value
	reducedImagesArray = [];  // default or initial value


	fotoSrcFieldsetAddWarningClassVote1 = false;
	fotoSrcFieldsetAddWarningClassVote2 = false;
	// question 1
	if(jQuery('form#updateNepeForm input#fotosId')[0].files.length > 5 ){
		jQuery.feedback('fieldset#fotoSrcFieldset h3#max5Feedback', 'Maximo 5 fotos');
		fotoSrcFieldsetAddWarningClassVote1 = true;
	}else{
		jQuery.feedback('fieldset#fotoSrcFieldset h3#max5Feedback', '');
		fotoSrcFieldsetAddWarningClassVote1 = false;
	}
	// question 2
	if(jQuery.isNotImage()){
		jQuery.feedback('fieldset#fotoSrcFieldset h3#isImageFeedback', 'No es foto');
		fotoSrcFieldsetAddWarningClassVote2 = true;
	}else{
		jQuery.feedback('fieldset#fotoSrcFieldset h3#isImageFeedback', '');
		fotoSrcFieldsetAddWarningClassVote2 = false;
	}
	if(fotoSrcFieldsetAddWarningClassVote1 || fotoSrcFieldsetAddWarningClassVote2){
		jQuery('fieldset#fotoSrcFieldset').addClass('warn');
		jQuery.feedback('fieldset#submitButtonFieldset h3#fotosFeedback', 'Verifica secci\u00F3n : FOTOS');
		submitVote2 = false;
	}else{
		jQuery('fieldset#fotoSrcFieldset').removeClass('warn');
		jQuery.feedback('fieldset#submitButtonFieldset h3#fotosFeedback', '');

		submitVote2 = true;
		jQuery.getReducedImagesArray();
	}
}




jQuery.getReducedImagesArray = function(){ //helper function for jQuery.have5OrLessImages
			var forma = document.getElementById('updateNepeForm');
			var formData = new FormData(forma);
		 	var fotoFilesFromFormData = formData.getAll("fotoArr[]");
			formData.delete("fotoArr[]");
			for(var index = 0; index < fotoFilesFromFormData.length; index++){
				var unFotoFile = fotoFilesFromFormData[index];
				console.log("calling resize image " + index);
				jQuery.resizeImage(index, unFotoFile);
			}
}


jQuery.resizeImage = function(index, unFotoFile){  //helper function for jQuery.handleSubmit
	var reader = new FileReader();
	reader.readAsDataURL(unFotoFile);
	console.log('resizeImage():read as data url() :' + index);
	reader.onload = function(evento){	
		console.log('resizeImage():reader onload() :' + index);
		var imagen = new Image();
		imagen.src = reader.result;
		imagen.onload = function(evento){
			console.log('resizeImage:imagen onload() :' + index + '.  image width: ' + this.width);
			if(this.width > 640){		
				// reduce size to  width of 640 ////////////////////////////////////////////////////////////////
				var imagenRatio = this.height / this.width;  
				//var canvas = document.getElementById('elCanvas');
				var canvas = document.createElement("canvas");
				/*canvas.width = 320; */		canvas.width  = 640;
				/*canvas.height = 160;*/	    canvas.height = 640 * imagenRatio;
				canvas.getContext("2d").drawImage(imagen, 0, 0, canvas.width, canvas.height);
				var dataURL = canvas.toDataURL('image/jpeg', 0.95);
				console.log(index + ': dataURL: ' + dataURL);
				var dataBlob = dataURLToBlob( dataURL );
				reducedImagesArray.push( dataBlob ); 
				//debugger;   ?
				///////////////////////////////////////////////////////////////////////////////////////////////
			}else{
				reducedImagesArray.push( unFotoFile );
			}
		}
	}
}




jQuery.isNotImage = function(){ //helper function for jQuery.have5OrLessImages
	var i;
	for (i = 0; i < jQuery('form#updateNepeForm input#fotosId')[0].files.length; i++) {
		//var imageType = /image.*/;
		//file.type.match(imageType)     ;   instead of toLowerCase() and startsWith() you could use the previous regular expression
		if( ! jQuery('form#updateNepeForm input#fotosId')[0].files[i].type.toLowerCase().startsWith("image") ) return true; // if not an image, return true and break for loop
	}
	return false;
}




var dataURLToBlob = function(dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = parts[1];

        return new Blob([raw], {type: contentType});
    }

    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: contentType});
}




//validation logic functions are run as handlers to change events
var $redInputs = jQuery('form#updateNepeForm input[name^=red]');
$redInputs.on('change', function(evento){
	jQuery.haveAtLeast1Handle();
});

var $fotoInput = jQuery('form#updateNepeForm input#fotosId');
$fotoInput.on('change', function(evento){
	jQuery.have5OrLessImages();
});

var submitVote2 = false;
var reducedImagesArray = []; 

//major task 1
//when ajax complete ; build formdata and make post
//jQuery.handleCreaNepeSubmit = function(duenoId){
jQuery.handleCreaNepeSubmit = function(){
	jQuery('form#creaNepeForm').submit(function(evento){
		evento.preventDefault(); //not making a submit (POST request) from html action
		var submitVote1 = jQuery.haveAtLeast1Handle();
		// var submitVote2 es false por default, puede cambiar solo en have5OrLessImages() que corre como handler de un change event, este event es requerido ya que el input de fotoArr esta required en HTML
		if(submitVote1 && submitVote2){ // 2 votes come from validation by haveAtLeast1Handle() and have5OrLessImages()
			// 1) build and edit formdata
			var forma = document.getElementById('creaNepeForm');
			var formData = new FormData(forma);

			//nombre y video

			//quienSocialHandle is a JS array object, it is stringified before sending it
			var quienSocialHandle = {fbk:jQuery('form#creaNepeForm input[name=red1]').val(), tt:jQuery('form#creaNepeForm input[name=red2]').val(),
									igrm:jQuery('form#creaNepeForm input[name=red3]').val(),phn:jQuery('form#creaNepeForm input[name=red4]').val()};
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
			var cuando = { lun:jQuery('form#creaNepeForm input[name=dia1]').val(), mar:jQuery('form#creaNepeForm input[name=dia2]').val(),
						  mier:jQuery('form#creaNepeForm input[name=dia3]').val(), jue:jQuery('form#creaNepeForm input[name=dia4]').val(),
						  vier:jQuery('form#creaNepeForm input[name=dia5]').val(), sab:jQuery('form#creaNepeForm input[name=dia6]').val(),
						   dom:jQuery('form#creaNepeForm input[name=dia7]').val()};
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
			jQuery('form#creaNepeForm input[name^=que]').each(function(index){
				var cleanedQue = jQuery.cleanStr(jQuery(this).val());
				if(jQuery.isVacioStr(cleanedQue)) {  } else { que[index] = cleanedQue; }
				formData.delete(jQuery(this).attr("name")); //sending ques in array so delete them individually from formData
			});
			que = JSON.stringify(que); //alert(que);
			formData.append('que', que);

			//sending dondes in array
			var donde = new Array();
			jQuery('form#creaNepeForm input[name^=donde]').each(function(index){
				var cleanedDonde = jQuery.cleanStr(jQuery(this).val());
				if(jQuery.isVacioStr(cleanedDonde)) {  } else { donde[index] = cleanedDonde; }
				formData.delete(jQuery(this).attr("name")); //sending dondes in array so delete them individually from formData
			});
			donde = JSON.stringify(donde);  //alert(donde);
			formData.append('donde', donde);

			//formData.append('duenoId', duenoId);				////// using cookies now	///////////////
			//formData.append('nepeId', nepeId);				////// solo para nepe update  ////////////////////
			
			var videoUrl = jQuery('form#creaNepeForm textarea#videoUrlId').val();
			if(jQuery.isVacioStr(videoUrl)){
				formData.delete("videoUrl");	formData.append('videoUrl', 'no video');
			}else{ }

			console.log("form built");
			for (var value of formData.values()) {
			   console.log(value);
			}
			//formdata built


			// 2) do the post submition
			jQuery.ajax({method:"POST", url:"escritos/creaNepe.php", data:formData, processData:false, contentType:false, cache:false})
			.done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){
				//el getJSON no entra al .done y cae en .fail si detecta errores de parseo.
				//Con el post tengo yo que usar un try block para detectar errores de parseo y mandarlo a jQuery fallas
				try{
					//alert('datosJSONStr: ' + datosJSONStr);
					datosJSObj = JSON.parse(datosJSONStr);
					//alert('datosJSObj.registrado: ' + datosJSObj.registrado + '\ndatosJSObj.feedback: ' + datosJSObj.feedback + '\ndatosJSObj.duenoId: ' + datosJSObj.duenoId);
				}catch(errorParseo){
					var datosJSONStrAsXHRTexto = datosJSONStr;
					var textoEstatus = 'Error parseando la siguiente respuesta del server en escritos/creaNepe.php :<br> Mensaje: ' + errorParseo.message;
					var elError = errorParseo.name;
					
					var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // first arg is not xhr Object, so no responseText member will be obtained in encodeAndGetErrorPath() at functiones.js - will produce an undefined
					jQuery(window.location).attr('href', path);					
				}
				if(datosJSObj.nepeYBregandoCreado && datosJSObj.mediaFotoUrlActualizado){		//maybe if is not needed after try catch block
					jQuery(window.location).attr('href', window.location.pathname + '?look=profile&nepeId=' + datosJSObj.nepeId);
				}else{
					//jQuery.feedback('form#creaNepeForm h3', datosJSObj.feedback);
				}
			})
			.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
				var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
				var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
				jQuery(window.location).attr('href', path); 
			});			
			// post made
		}else{  	//submitVote1 && submitVote2; visible only after all html required fields are filled but js stop the submission
			//not posting ...  validation by haveAtLeast1Handle() and have5OrLessImages()  failed
			//no aditional feedback needed
			//all feedback given at haveAtLeast1Handle() and have5OrLessImages() when they run to handle change events
		}
	});  //jQuery submit
	
	
	//hide, show on click ; creaNepe task 3
	jQuery.toggleOnClick();
	//hide them  ; editDuenoShowNepes task 4
	jQuery.hideThem();
	
	
}//  handleSubmit




//validation logic run as change event handler
jQuery.haveAtLeast1Handle = function(){
	if(jQuery.isVacioStr(jQuery('form#creaNepeForm input[name=red1]').val()) &&  jQuery.isVacioStr(jQuery('form#creaNepeForm input[name=red2]').val()) &&
	   jQuery.isVacioStr(jQuery('form#creaNepeForm input[name=red3]').val()) &&  jQuery.isVacioStr(jQuery('form#creaNepeForm input[name=red4]').val()) ) {
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
	if(jQuery('form#creaNepeForm input#fotosId')[0].files.length > 5 ){
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
	}	// if no warning from both questions
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
			var forma = document.getElementById('creaNepeForm');
			var formData = new FormData(forma);
		 	var fotoFilesFromFormData = formData.getAll("fotoArr[]");
			formData.delete("fotoArr[]");
			for(var index = 0; index < fotoFilesFromFormData.length; index++){
				var unFotoFile = fotoFilesFromFormData[index];
				console.log("calling resize image :" + index);
				jQuery.resizeImage(index, unFotoFile);
			}
}





jQuery.isNotImage = function(){ 	//helper function for jQuery.have5OrLessImages
	var i;
	for (i = 0; i < jQuery('form#creaNepeForm input#fotosId')[0].files.length; i++) {
		//var imageType = /image.*/;
		//file.type.match(imageType)     ;   instead of toLowerCase() and startsWith() you could use the previous regular expression
		if( ! jQuery('form#creaNepeForm input#fotosId')[0].files[i].type.toLowerCase().startsWith("image") ) return true; // if not an image, return true and break for loop
	}
	return false;
}




//validation logic functions are run as handlers to change events
var $redInputs = jQuery('form#creaNepeForm input[name^=red]');
$redInputs.on('change', function(evento){
	jQuery.haveAtLeast1Handle();
});

var $fotoInput = jQuery('form#creaNepeForm input#fotosId');
$fotoInput.on('change', function(evento){
	jQuery.have5OrLessImages();
});

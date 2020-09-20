var submitVote2 = false;
var reducedImagesArray = []; 

//major task 1
//when ajax complete ; build formdata and make post
jQuery.handleCreaNepeSubmit = function(duenoId){
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

			formData.append('duenoId', duenoId);
			//formData.append('nepeId', nepeId);				////// solo para nepe update  ////////////////////

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
					jQuery.fallas(new Object(), 'Error parsing la siguiente respuesta del server desde escritos/creaNepe.php<br>' + errorParseo.name + ' : ' + errorParseo.message, datosJSONStr);
				}
				if(datosJSObj.nepeYBregandoCreado && datosJSObj.mediaFotoUrlActualizado){
					jQuery(window.location).attr('href', window.location.pathname + '?look=profile&nepeId=' + datosJSObj.nepeId);
				}else{
					//jQuery.feedback('form#creaNepeForm h3', datosJSObj.feedback);
				}
			})
			.fail(  jQuery.fallas  );  //failing post
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
	var forma = document.getElementById('creaNepeForm');
	var formData = new FormData(forma);
	var fotoFilesFromFormData = formData.getAll("fotoArr[]");

	formData.delete("fotoArr[]");

	for(var index = 0; index < fotoFilesFromFormData.length; index++){
		var unFotoFile = fotoFilesFromFormData[index];
		console.log("calling resizeImage for index: " + index);
		jQuery.resizeImage(index, unFotoFile);
	}
}




jQuery.resizeImage = function(index, unFotoFile){  //helper function for jQuery.handleSubmit
	var reader = new FileReader();
	reader.onload = function(evento){
		console.log('resizeImage: reader.onload for index:  ' + index);
		var nuevaImagen = new Image();
		nuevaImagen.onload = function(evento){
			console.log('resizeImage: nuevaImagen.onload for index: ' + index);
			//var canvas = document.getElementById('elCanvas');
			var canvas = document.createElement("canvas");
			canvas.width = 320;
			canvas.height = 160;
			canvas.getContext("2d").drawImage(nuevaImagen, 0, 0, 320, 160);
			var dataURL = canvas.toDataURL('image/jpeg', 0.95);
			console.log('dataURL for index: ' + index + '.  : ' + dataURL);
			var dataBlob = dataURLToBlob( dataURL );
	////////////////////////////////////////////////////////////////////////////////////////		
			//no reduction
			//reducedImagesArray.push( dataBlob );
			reducedImagesArray.push( unFotoFile );  // no reduction
			//debugger;
	////////////////////////////////////////////////////////////////////////////////////////
		}
		nuevaImagen.src = reader.result;
	}
	reader.readAsDataURL(unFotoFile);
	console.log('resizeImage: reader.readAsDataUrl for index: ' + index);
}




jQuery.isNotImage = function(){ //helper function for jQuery.have5OrLessImages
	var i;
	for (i = 0; i < jQuery('form#creaNepeForm input#fotosId')[0].files.length; i++) {
		//var imageType = /image.*/;
		//file.type.match(imageType)     ;   instead of toLowerCase() and startsWith() you could use the previous regular expression
		if( ! jQuery('form#creaNepeForm input#fotosId')[0].files[i].type.toLowerCase().startsWith("image") ) return true; // if not an image, return true and break for loop
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
var $redInputs = jQuery('form#creaNepeForm input[name^=red]');
$redInputs.on('change', function(evento){
	jQuery.haveAtLeast1Handle();
});
var $fotoInput = jQuery('form#creaNepeForm input#fotosId');
$fotoInput.on('change', function(evento){
	jQuery.have5OrLessImages();
});

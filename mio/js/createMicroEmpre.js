//major task 1
//when ajax complete ; if already existing micro empre then populate form using that data
jQuery.populateForm = function(datos){
	//nombre y video
	jQuery('form#createMicroEmpreForm input[name=nombre]').val(datos.nombre);
	jQuery('form#createMicroEmpreForm textarea[name=videoUrl]').val(datos.videoUrl);
	//quien
	jQuery('form#createMicroEmpreForm input[name=red1]').val(datos.quienSocialHandle.fbk);
	jQuery('form#createMicroEmpreForm input[name=red2]').val(datos.quienSocialHandle.tt);
	jQuery('form#createMicroEmpreForm input[name=red3]').val(datos.quienSocialHandle.igrm);
	jQuery('form#createMicroEmpreForm input[name=red4]').val(datos.quienSocialHandle.phn);

	//falta each para array de fotos

	//cuando
	jQuery('form#createMicroEmpreForm input[name=dia1]').val(datos.cuando.lun);
	jQuery('form#createMicroEmpreForm input[name=dia2]').val(datos.cuando.mar);
	jQuery('form#createMicroEmpreForm input[name=dia3]').val(datos.cuando.mier);
	jQuery('form#createMicroEmpreForm input[name=dia4]').val(datos.cuando.jue);
	jQuery('form#createMicroEmpreForm input[name=dia5]').val(datos.cuando.vier);
	jQuery('form#createMicroEmpreForm input[name=dia6]').val(datos.cuando.sab);
	jQuery('form#createMicroEmpreForm input[name=dia7]').val(datos.cuando.dom);

	//following code works when there are 10 or less 'que' coming from getJSON.
	//the html is prepared for a max of 10 'que'
	jQuery('form#createMicroEmpreForm input[name^=que]').each(function(index){
		if(index < datos.que.length) { jQuery(this).val(datos.que[index]); }
		else {  } //en el task3 aqui, entran al arreglo de ques, solo los cleaned ques que no son vacioStrs,
				  // ; en html profile solo se muestran los input field q entraron al arreglo los demas se remueven
	});

	//following code works when there are 5 or less 'donde' coming from getJSON.
	//the html is prepared for a max of 5 'donde'
	jQuery('form#createMicroEmpreForm input[name^=donde]').each(function(index){
		if(index < datos.donde.length) { jQuery(this).val(datos.donde[index]); }
		else {  } //en el task3 aqui, entran al arreglo de dondes, solo los cleaned dondes que no son vacioStrs,
				  // ; en html profile solo se muestran los input field q entraron al arreglo los demas se remueven
	});

	jQuery('form#createMicroEmpreForm input[value=si]').prop('checked', datos.atucasa);
	jQuery('form#createMicroEmpreForm input[value=no]').prop('checked', !datos.atucasa);
}

//major task 2 
//when ajax complete ; handle form submit and make post
jQuery.handleSubmit = function(duenoId, meId){
	jQuery('form#createMicroEmpreForm').submit(function(evento){
		evento.preventDefault(); //not making a submit (POST request) from html action
		var submitVote1 = jQuery.haveAtLeast1Handle();
		var submitVote2 = jQuery.have5OrLessImages();
		if(submitVote1 && submitVote2){ // post only validated data ; & used to force evaluation of both functions
			// 1) build formdata
			var formData = new FormData(this);

			//nombre y video
			
			//quienSocialHandle is a JS array object, it is stringified before sending it
			var quienSocialHandle = {fbk:jQuery('form#createMicroEmpreForm input[name=red1]').val(), tt:jQuery('form#createMicroEmpreForm input[name=red2]').val(),
									igrm:jQuery('form#createMicroEmpreForm input[name=red3]').val(),phn:jQuery('form#createMicroEmpreForm input[name=red4]').val()};
			formData.delete("red1"); //sending reds in array so delete them individually from formData
			formData.delete("red2"); //sending reds in array so delete them individually from formData
			formData.delete("red3"); //sending reds in array so delete them individually from formData
			formData.delete("red4"); //sending reds in array so delete them individually from formData
			quienSocialHandle = JSON.stringify(quienSocialHandle);
			formData.append('quienSocialHandle', quienSocialHandle);
			
			//falta quien foto src
			for(var i=0; i < jQuery('form#createMicroEmpreForm input#fotosId')[0].files.length; i++){
				alert(jQuery('form#createMicroEmpreForm input#fotosId')[0].files[i].name + ' size en bytes: ' + jQuery('form#createMicroEmpreForm input#fotosId')[0].files[i].size  + '\ntipo:' + jQuery('form#createMicroEmpreForm input#fotosId')[0].files[i].type);
			}
			
			//cuando is a JS array object, it is stringified before sending it
			var cuando = {lun:jQuery('form#createMicroEmpreForm input[name=dia1]').val(), mar:jQuery('form#createMicroEmpreForm input[name=dia2]').val(),
						  mier:jQuery('form#createMicroEmpreForm input[name=dia3]').val(), jue:jQuery('form#createMicroEmpreForm input[name=dia4]').val(),
						  vier:jQuery('form#createMicroEmpreForm input[name=dia5]').val(), sab:jQuery('form#createMicroEmpreForm input[name=dia6]').val(),
						  dom:jQuery('form#createMicroEmpreForm input[name=dia7]').val()};
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
			jQuery('form#createMicroEmpreForm input[name^=que]').each(function(index){
				var cleanedQue = jQuery.cleanStr(jQuery(this).val());
				if(jQuery.isVacioStr(cleanedQue)) {  } else { que[index] = cleanedQue; }
				formData.delete(jQuery(this).attr("name")); //sending ques in array so delete them individually from formData
			});
			que = JSON.stringify(que); //alert(que);
			formData.append('que', que);
			
			//sending dondes in array
			var donde = new Array();
			jQuery('form#createMicroEmpreForm input[name^=donde]').each(function(index){
				var cleanedDonde = jQuery.cleanStr(jQuery(this).val());
				if(jQuery.isVacioStr(cleanedDonde)) {  } else { donde[index] = cleanedDonde; }
				formData.delete(jQuery(this).attr("name")); //sending dondes in array so delete them individually from formData
			});
			donde = JSON.stringify(donde);  //alert(donde);
			formData.append('donde', donde);

			formData.append('duenoId', duenoId);
			formData.append('meId', meId);
			//formdata built
			
			
			// 2) do the post submition
			jQuery.ajax({method:"POST", url:"escritos/editMicroEmpreData.php", data:formData, processData:false, contentType:false, cache:false})
			.done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){
				//el getJSON no entra al .done y cae en .fail si detecta errores de parseo.
				//Con el post tengo yo que usar un try block para detectar errores de parseo y mandarlo a jQuery fallas
				try{
					//alert('datosJSONStr: ' + datosJSONStr);
					datosJSObj = JSON.parse(datosJSONStr);
					//alert('datosJSObj.registrado: ' + datosJSObj.registrado + '\ndatosJSObj.feedback: ' + datosJSObj.feedback + '\ndatosJSObj.duenoId: ' + datosJSObj.duenoId);
				}catch(errorParseo){
					jQuery.fallas(new Object(), 'Error parsing la siguiente respuesta del server desde escritos/editMicroEmpreData.php<br>' + errorParseo.name + ' : ' + errorParseo.message, datosJSONStr);
				}
				if(datosJSObj.actualizado){
					jQuery(window.location).attr('href', window.location.pathname + '?look=profile&meId=' + datosJSObj.meId);
				}else{
					//jQuery.feedback('form#createMicroEmpreForm h3', datosJSObj.feedback);
				}
			})
			.fail(  jQuery.fallas  );  //failing post
		}else{// not posting ... no aditional feedback needed
			//all feedback given at haveAtLeast1Handle() and have5OrLessImages() when they run to handle change events
		}
	});
}


	
	
//validation logic run as change event handler
jQuery.haveAtLeast1Handle = function(){
	if(jQuery.isVacioStr(jQuery('form#createMicroEmpreForm input[name=red1]').val()) &&  jQuery.isVacioStr(jQuery('form#createMicroEmpreForm input[name=red2]').val()) &&
	   jQuery.isVacioStr(jQuery('form#createMicroEmpreForm input[name=red3]').val()) &&  jQuery.isVacioStr(jQuery('form#createMicroEmpreForm input[name=red4]').val()) ) {
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
	fotoSrcFieldsetAddWarningClassVote1 = false;
	fotoSrcFieldsetAddWarningClassVote2 = false;
	// question 1
	if(jQuery('form#createMicroEmpreForm input#fotosId')[0].files.length > 5 ){
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
		return false;
	}else{
		jQuery('fieldset#fotoSrcFieldset').removeClass('warn');
		jQuery.feedback('fieldset#submitButtonFieldset h3#fotosFeedback', '');
		return true;
	}
}
jQuery.isNotImage = function(){ //helper function for jQuery.have5OrLessImages
	var i;
	for (i = 0; i < jQuery('form#createMicroEmpreForm input#fotosId')[0].files.length; i++) {
		if( ! jQuery('form#createMicroEmpreForm input#fotosId')[0].files[i].type.toLowerCase().startsWith("image") ) return true; // if not an image, return true and break for loop
	} 
	return false;
}

//validation logic functions are run as handlers to change events
var $redInputs = jQuery('form#createMicroEmpreForm input[name^=red]');
$redInputs.on('change', function(evento){
	jQuery.haveAtLeast1Handle();
});
var $fotoInput = jQuery('form#createMicroEmpreForm input#fotosId');
$fotoInput.on('change', function(evento){
	jQuery.have5OrLessImages();
});
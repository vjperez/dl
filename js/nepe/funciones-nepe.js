//validation logic run as change event handler
jQuery.haveAtLeast1Red = function(formaStr){
	var regexp = new RegExp(/[^a-z0-9ñüàáèéìíòóùú@\._\-+]/gi);	//	allowing letters, numbers plus los de login   @ . _ - +				escaping dot and minus
	if( jQuery.isVacioStr(jQuery.cleanStr(jQuery(formaStr + ' input[name=red1]').val(), regexp)) 
	&&  jQuery.isVacioStr(jQuery.cleanStr(jQuery(formaStr + ' input[name=red2]').val(), regexp))
	&&  jQuery.isVacioStr(jQuery.cleanStr(jQuery(formaStr + ' input[name=red3]').val(), regexp)) 
	&&  jQuery.isVacioStr(jQuery.cleanStr(jQuery(formaStr + ' input[name=red4]').val(), regexp)) ) {	
			jQuery.feedback('fieldset#socialHandleFieldset h5', 'Minimo 1 contacto');
			jQuery.feedback('fieldset#submitButtonFieldset h5#handlesFeedback', 'Verifica secci\u00F3n : QUIEN');
			submitVote1 = false;
	}else{
			jQuery.feedback('fieldset#socialHandleFieldset h5', '');
			jQuery.feedback('fieldset#submitButtonFieldset h5#handlesFeedback', '');
			submitVote1 = true;
	}
}


jQuery.have5OrLessImages = function(formaStr){ //2 questions here 1) five or less files? 2)are all files images?
	submitVote2 = false;  // default or initial value
	reducedImagesArray = [];  // default or initial value


	fotoSrcFieldsetAddWarningClassVote1 = true;
	fotoSrcFieldsetAddWarningClassVote2 = true;
	// question 1
	//alert("cuantas fotos " + jQuery(formaStr + ' input#fotosId')[0].files.length);
	if(jQuery(formaStr + ' input#fotosId')[0].files.length >= 1 && jQuery(formaStr + ' input#fotosId')[0].files.length <= 5){
		jQuery.feedback('fieldset#fotoSrcFieldset h5#max5min1Feedback', '');
		fotoSrcFieldsetAddWarningClassVote1 = false;
	}else{
		jQuery.feedback('fieldset#fotoSrcFieldset h5#max5min1Feedback', 'Minimo 1 foto, maximo 5');
		fotoSrcFieldsetAddWarningClassVote1 = true;
	}
	// question 2
	if(jQuery.isNotImage(formaStr)){
		jQuery.feedback('fieldset#fotoSrcFieldset h5#isImageFeedback', 'No es foto');
		fotoSrcFieldsetAddWarningClassVote2 = true;
	}else{
		jQuery.feedback('fieldset#fotoSrcFieldset h5#isImageFeedback', '');
		fotoSrcFieldsetAddWarningClassVote2 = false;
	}
	// if warning from any question
	if(fotoSrcFieldsetAddWarningClassVote1 || fotoSrcFieldsetAddWarningClassVote2){
		jQuery.feedback('fieldset#submitButtonFieldset h5#fotosFeedback', 'Verifica secci\u00F3n : FOTOS');
		jQuery.feedback('fieldset#fotoSrcFieldset h5#howManyFeedback', '');

		submitVote2 = false;
	}else{
		jQuery.feedback('fieldset#submitButtonFieldset h5#fotosFeedback', '');
		jQuery.feedback('fieldset#fotoSrcFieldset h5#howManyFeedback', 'fotos: ' + jQuery(formaStr + ' input#fotosId')[0].files.length);

		jQuery.getReducedImagesArray(formaStr);
		submitVote2 = true;
	}
}


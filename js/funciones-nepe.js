//validation logic run as change event handler
jQuery.haveAtLeast1Red = function(formaStr){
	var regexp = new RegExp(/[^a-z0-9ñüàáèéìíòóùú@\._\-+]/gi);	//	allowing letters, numbers plus los de login   @ . _ - +				escaping dot and minus
	if( jQuery.isVacioStr(jQuery.cleanStr(jQuery(formaStr + ' input[name=red1]').val(), regexp)) 
	&&  jQuery.isVacioStr(jQuery.cleanStr(jQuery(formaStr + ' input[name=red2]').val(), regexp))
	&&  jQuery.isVacioStr(jQuery.cleanStr(jQuery(formaStr + ' input[name=red3]').val(), regexp)) 
	&&  jQuery.isVacioStr(jQuery.cleanStr(jQuery(formaStr + ' input[name=red4]').val(), regexp)) ) {	
			jQuery.feedback('fieldset#socialHandleFieldset h3', 'Minimo 1 contacto');
			jQuery.feedback('fieldset#submitButtonFieldset h3#handlesFeedback', 'Verifica secci\u00F3n : QUIEN');
			submitVote1 = false;
	}else{
			jQuery.feedback('fieldset#socialHandleFieldset h3', '');
			jQuery.feedback('fieldset#submitButtonFieldset h3#handlesFeedback', '');
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
		jQuery.feedback('fieldset#fotoSrcFieldset h3#max5min1Feedback', '');
		fotoSrcFieldsetAddWarningClassVote1 = false;
	}else{
		jQuery.feedback('fieldset#fotoSrcFieldset h3#max5min1Feedback', 'Minimo 1 foto, maximo 5');
		fotoSrcFieldsetAddWarningClassVote1 = true;
	}
	// question 2
	if(jQuery.isNotImage(formaStr)){
		jQuery.feedback('fieldset#fotoSrcFieldset h3#isImageFeedback', 'No es foto');
		fotoSrcFieldsetAddWarningClassVote2 = true;
	}else{
		jQuery.feedback('fieldset#fotoSrcFieldset h3#isImageFeedback', '');
		fotoSrcFieldsetAddWarningClassVote2 = false;
	}
	// if warning from any question
	if(fotoSrcFieldsetAddWarningClassVote1 || fotoSrcFieldsetAddWarningClassVote2){
		jQuery.feedback('fieldset#submitButtonFieldset h3#fotosFeedback', 'Verifica secci\u00F3n : FOTOS');
		jQuery.feedback('fieldset#fotoSrcFieldset h3#howManyFeedback', '');

		submitVote2 = false;
	}else{
		jQuery.feedback('fieldset#submitButtonFieldset h3#fotosFeedback', '');
		jQuery.feedback('fieldset#fotoSrcFieldset h3#howManyFeedback', 'fotos: ' + jQuery(formaStr + ' input#fotosId')[0].files.length);

		jQuery.getReducedImagesArray(formaStr);
		submitVote2 = true;
	}
}


jQuery.getReducedImagesArray = function(formaStr){ //helper function for jQuery.have5OrLessImages
    //alert(formaStr);
    var forma = document.querySelector(formaStr);
    var formData = new FormData(forma);
    var fotoFilesFromFormData = formData.getAll("fotoArr[]");
    formData.delete("fotoArr[]");
    for(var index = 0; index < fotoFilesFromFormData.length; index++){
        var unFotoFile = fotoFilesFromFormData[index];
        console.log("calling resize image " + index);
        jQuery.resizeImage(index, unFotoFile);
    }
}

 
jQuery.isNotImage = function(formaStr){ //helper function for jQuery.have5OrLessImages
	var i;			
	var $fotoInput = jQuery(formaStr + ' input#fotosId');
	for (i = 0; i < $fotoInput[0].files.length; i++) {
		//var imageType = /image.*/;
		//file.type.match(imageType)     ;   instead of toLowerCase() and startsWith() you could use the previous regular expression
		if( ! $fotoInput[0].files[i].type.toLowerCase().startsWith("image") ) return true; // if not an image, return true and break for loop
	}
	return false;
}

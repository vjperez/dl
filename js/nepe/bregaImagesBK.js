//imagenes >= 1  imagenes <= 5
//todo bien getReducedImagesArray() 
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




//in array, resize image()
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




//resize and push
jQuery.resizeImage = function(index, unFotoFile, reducedImagesArray){  //helper function for jQuery.have5OrLessImages
	var reader = new FileReader();
	reader.readAsDataURL(unFotoFile);
	console.log('resizeImage():read as data url() :' + index);
	reader.onload = function(evento){	
		console.log('resizeImage():reader onload() :' + index);
		var imagen = new Image();
		imagen.src = reader.result;
		imagen.onload = function(evento){
			console.log('resizeImage()  imagen onload() :' + index + '  image width:' + this.width+ ' image height:' + this.height);
			var imageMaxWidth  = 200;
			if(this.width > imageMaxWidth){		
				////////////////////////////////////////////////////
				var imagenRatio = this.height / this.width;  
				//var canvas = document.getElementById('elCanvas');
				var canvas = document.createElement("canvas");
				canvas.width = imageMaxWidth;
				canvas.height  = imageMaxWidth * imagenRatio;
				canvas.getContext("2d").drawImage(imagen, 0, 0, canvas.width, canvas.height);
				var dataURL = canvas.toDataURL('image/jpeg', 0.95);
				console.log(index + ': dataURL: ' + dataURL);
				var dataBlob = dataURLToBlob( dataURL );
				reducedImagesArray.push( dataBlob ); 
				//debugger;   ?
				////////////////////////////////////////////////////
			}else{
				reducedImagesArray.push( unFotoFile );
			}
		}
	}
}

 
 
 
var dataURLToBlob = function(dataURL) {		//helper function for jQuery.have5OrLessImages
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


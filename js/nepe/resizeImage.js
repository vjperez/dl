//resize and push
jQuery.resizeImage = function(index, unFotoFile, formData){  //helper function for jQuery.have5OrLessImages
	var reader = new FileReader();
	reader.readAsDataURL(unFotoFile);
	console.log('... in resizeImage():read as data url() :' + index);
	reader.onload = function(evento){	
		console.log('... in resizeImage():reader onload() :' + index);
		var imagen = new Image();
		imagen.src = reader.result;
		imagen.onload = function(evento){
			console.log('...in resizeImage()  imagen onload() :' + index + '  image width:' + this.width+ ' image height:' + this.height);
			var imageMaxHeight  = 400;
			if(this.width > imageMaxHeight){		
				////////////////////////////////////////////////////
				var imageRatio = this.width / this.height;  
				//var canvas = document.getElementById('elCanvas');
				var canvas = document.createElement("canvas");
				canvas.height  = imageMaxHeight
				canvas.width = imageMaxHeight * imageRatio;
				canvas.getContext("2d").drawImage(imagen, 0, 0, canvas.width, canvas.height);
				var dataURL = canvas.toDataURL('image/jpeg', 0.95);
				console.log('...in resizeImage()  indice:' + index + ': dataURL: ' + dataURL);
				var dataBlob = dataURLToBlob( dataURL );
				//reducedImagesArray.push( dataBlob );
				formData.append("fotoArr[]", dataBlob);				
				//debugger;   ?
				////////////////////////////////////////////////////
			}else{
				//reducedImagesArray.push( unFotoFile );
				formData.append("fotoArr[]", unFotoFile);
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
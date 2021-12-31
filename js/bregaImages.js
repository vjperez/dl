jQuery.resizeImage = function(index, unFotoFile){  //helper function for jQuery.have5OrLessImages
	var reader = new FileReader();
	reader.readAsDataURL(unFotoFile);
	console.log('resizeImage():read as data url() :' + index);
	reader.onload = function(evento){	
		console.log('resizeImage():reader onload() :' + index);
		var imagen = new Image();
		imagen.src = reader.result;
		imagen.onload = function(evento){
			console.log('resizeImage:imagen onload() :' + index + '.  image width: ' + this.width);
			var imageMaxHeight  = 150;
			if(this.height > imageMaxHeight){		
				// reduce size to  height of imageMaxHeight ////////////////////////////////////////////////////////////////
				var imagenRatio = this.width / this.height;  
				//var canvas = document.getElementById('elCanvas');
				var canvas = document.createElement("canvas");
				canvas.height = imageMaxHeight;
				canvas.width  = imageMaxHeight * imagenRatio;
				canvas.getContext("2d").drawImage(imagen, 0, 0, canvas.width, canvas.height);
				var dataURL = canvas.toDataURL('image/jpeg', 0.95);
				console.log(index + ': dataURL: ' + dataURL);
				var dataBlob = dataURLToBlob( dataURL );
				reducedImagesArray.push( dataBlob ); 
				//debugger;   ?
				//////////////////////////////////////////////////////////////////////////////////////////////////
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



//resize and push
resizeImage = function(index, unFotoFile, formData){
	//helper function for jQuery.have5OrLessImages
	let reader = new FileReader();
	reader.readAsDataURL(unFotoFile);
	console.log('... in resizeImage():read as data url() :' + index);
	reader.onload = function(evento){	
		console.log('... in resizeImage():reader onload() :' + index);
		let imagen = new Image();
		imagen.src = reader.result;
		imagen.onload = function(evento){
			console.log('...in resizeImage()  imagen onload() :' + index + '  image width:' + this.width+ ' image height:' + this.height);
			let imageMaxHeight  = 400;
			if(this.width > imageMaxHeight){		
				////////////////////////////////////////////////////
				let imageRatio = this.width / this.height;  
				//let canvas = document.getElementById('elCanvas');
				let canvas = document.createElement("canvas");
				canvas.height  = imageMaxHeight
				canvas.width = imageMaxHeight * imageRatio;
				canvas.getContext("2d").drawImage(imagen, 0, 0, canvas.width, canvas.height);
				let dataURL = canvas.toDataURL('image/jpeg', 0.95);
				console.log('...in resizeImage()  indice:' + index + ': dataURL: ' + dataURL);
				let dataBlob = dataURLToBlob( dataURL );
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

 
 
 
function dataURLToBlob(dataURL) {		
	//helper function for jQuery.have5OrLessImages
    let BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        let parts = dataURL.split(',');
        let contentType = parts[0].split(':')[1];
        let raw = parts[1];

        return new Blob([raw], {type: contentType});
    }

    let parts = dataURL.split(BASE64_MARKER);
    let contentType = parts[0].split(':')[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;

    let uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: contentType});
}
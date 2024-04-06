//task 1
//populate form
jQuery.populateUpdateNepeForm = function(datos){
	//nombre
	jQuery('div#nepeTitulo h2').text(datos.nombre);
	jQuery('fieldset#nombreFieldset input[name=nombre]').val(datos.nombre);
	
	//cuando
	jQuery('fieldset#cuandoFieldset input[name=dia1]').val(datos.cuando.lun);
	jQuery('fieldset#cuandoFieldset input[name=dia2]').val(datos.cuando.mar);
	jQuery('fieldset#cuandoFieldset input[name=dia3]').val(datos.cuando.mie);
	jQuery('fieldset#cuandoFieldset input[name=dia4]').val(datos.cuando.jue);
	jQuery('fieldset#cuandoFieldset input[name=dia5]').val(datos.cuando.vie);
	jQuery('fieldset#cuandoFieldset input[name=dia6]').val(datos.cuando.sab);
	jQuery('fieldset#cuandoFieldset input[name=dia7]').val(datos.cuando.dom);
	
	//desdeCasa - suCasa
	let inputValue = datos.desdeCasa;
	let selector = 'fieldset#desdeCasaFieldset input[value=' + inputValue + ']';
	jQuery(selector).prop('checked', true);
	    inputValue = datos.suCasa;
	    selector = 'fieldset#suCasaFieldset    input[value=' + inputValue + ']';
	jQuery(selector).prop('checked', true);
	
	//  ------------------------          ---------------------  //
	
	//video
	jQuery('fieldset#videoFieldset textarea[name=videoUrl]').val(datos.videoUrl);
	
	//foto - falta each para array
	//jQuery('fieldset#fotoFieldset input[name^=fotoArr]').prop('required', false);
	
	let losQue = JSON.parse( datos.losQue );
	if(losQue !== null){
		jQuery('fieldset#queFieldset input[name^=que]').each(function(indice){
			if(indice < losQue.length) { jQuery(this).val( losQue[indice] ); }//the html is prepared for a max of 10 'que'
			//en submit entran al arreglo, luego de pasar por cleanStr() y  isNotVacioStr()		  
		});
	}
	
	let losDonde = JSON.parse( datos.losDonde );
	if(losDonde !== null){
		jQuery('fieldset#dondeFieldset input[name^=donde]').each(function(indice){
				if(indice < losDonde.length) { jQuery(this).val( losDonde[indice] ); }//the html is prepared for a max of 5 'donde'
			//en submit entran al arreglo, luego de pasar por cleanStr() y  isNotVacioStr()
		});
	}
}




//get data to populate form
let index = jQuery.urlParametro('index');			
jQuery.getJSON('escritos/nepe/read/getNepe.php', {nepe_index:index} )
.done(function(nepeDatos, estatusForDONE, xhrObjetoForDONE){
	jQuery.populateUpdateNepeForm(nepeDatos);
})
.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
	let xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
	let path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
	jQuery(window.location).attr('href', path); 
});




//task 2
//build formdata with cleanStr() and isVacioStr() returned values ... and make post
jQuery('form#nepeForm').submit(function(evento){
	evento.preventDefault();
	
	let forma = document.getElementById('nepeForm');
	let formData = new FormData(forma);
	function buildFormData(){
		// a) build and edit formdata

		//nombre
		let regexp = new RegExp(/[^a-z0-9\sñüàáèéìíòóùú@._+-]/gi);	//	allowing letters, numbers plus los de login   @ . _ + -
		let nombre = jQuery.cleanStr( jQuery('fieldset#nombreFieldset input[name=nombre]').val(), regexp );
		if(jQuery.isVacioStr(nombre)){
			formData.delete("nombre"); 			formData.append('nombre', 'sin nombre - no name provided');
		}else{
			formData.delete("nombre"); 			formData.append('nombre', nombre);
		}
		
		//cuando is a JS object, ... converted to string in JSON format
		regexp = new RegExp(/[^a-z0-9\sñüàáèéìíòóùú:,@._+-]/gi);	//	allowing letters, numbers plus los de login   @ . _ + -	y  : ,	
		let cuando = {  lun:jQuery.cleanStr( jQuery('fieldset#cuandoFieldset input[name=dia1]').val(), regexp ), 
						mar:jQuery.cleanStr( jQuery('fieldset#cuandoFieldset input[name=dia2]').val(), regexp ),
						mie:jQuery.cleanStr( jQuery('fieldset#cuandoFieldset input[name=dia3]').val(), regexp ),
						jue:jQuery.cleanStr( jQuery('fieldset#cuandoFieldset input[name=dia4]').val(), regexp ),
						vie:jQuery.cleanStr( jQuery('fieldset#cuandoFieldset input[name=dia5]').val(), regexp ),
						sab:jQuery.cleanStr( jQuery('fieldset#cuandoFieldset input[name=dia6]').val(), regexp ),
						dom:jQuery.cleanStr( jQuery('fieldset#cuandoFieldset input[name=dia7]').val(), regexp )
		};
		formData.delete("dia1"); //sending all dias in a JSON string, so delete individual values from formData
		formData.delete("dia2"); 
		formData.delete("dia3"); 
		formData.delete("dia4");
		formData.delete("dia5"); 
		formData.delete("dia6"); 
		formData.delete("dia7"); 
		cuando = JSON.stringify(cuando);
		formData.append('cuando', cuando);

		//desdeCasa - suCasa

		//video
		regexp = new RegExp(/[^a-z0-9\sñüàáèéìíòóùú.:/=?&@._+-]/gi);	//	allowing letters, numbers and simbols needed for a url .:/=?& plus los de login   @ . _  + -
		let videoUrl = jQuery.cleanStr( jQuery('fieldset#videoFieldset textarea[name=videoUrl]').val(), regexp );
		if(jQuery.isVacioStr(videoUrl)){
			formData.delete("videoUrl"); 		formData.append('videoUrl', 'no video provided');
		}else{
			formData.delete("videoUrl"); 		formData.append('videoUrl', videoUrl);
		}
		
		
		//que is a JS array, ... converted to string in JSON format
		let que = new Array();
		jQuery('fieldset#queFieldset input[name^=que]').each(function(indice){
			regexp = new RegExp(/[^a-z0-9\sñüàáèéìíòóùú@._+-]/gi);	//	allowing letters, numbers plus los de login   @ . _ + -	
			let cleanedQue = jQuery.cleanStr(jQuery(this).val(), regexp );
			if(jQuery.isNotVacioStr(cleanedQue)) { que[indice] = cleanedQue; }
			formData.delete(jQuery(this).attr("name")); //sending all ques in JSON string so delete them individually from formData
		});
		que = JSON.stringify(que); 
		formData.append('losQue', que);
		
		
		//donde is a JS array, ... converted to string in JSON format
		let donde = new Array();
		jQuery('fieldset#dondeFieldset input[name^=donde]').each(function(indice){
			regexp = new RegExp(/[^a-z0-9\sñüàáèéìíòóùú@._+-]/gi);	//	allowing letters, numbers plus los de login   @ . _  +  -	
			let cleanedDonde = jQuery.cleanStr(jQuery(this).val(), regexp );
			if(jQuery.isNotVacioStr(cleanedDonde)) { donde[indice] = cleanedDonde; }
			formData.delete(jQuery(this).attr("name")); //sending all dondes in JSON string so delete them individually from formData
		});
		donde = JSON.stringify(donde);
		formData.append('losDonde', donde);
		
		formData.append('nepe_index', index );
		
		console.log("la forma...");
		for (const pareja of formData.entries()) {
			console.log('llave: ' + pareja[0] + '   valor: ' + pareja[1]);
		}
		//  a) formdata built
	}//function


	function fotoArr(){
		//foto
		//let filesOnFotoArr = formData.getAll("fotoArr[]");  	la linea de abajo para filesOnFotoArr, works tambien
		let filesOnFotoArr = jQuery('fieldset#fotoFieldset   input[name^=fotoArr]')[0].files;
		if( filesOnFotoArr.length === 0){
			formData.delete("fotoArr[]");     
			formData.delete("MAX_FILE_SIZE");
		}else if( filesOnFotoArr.length > 0 ){ 
			jQuery.includeScript('js/nepe/resizeImage.js');
			
			formData.delete("fotoArr[]"); 
			for(let index = 0; index < filesOnFotoArr.length; index++){
				let unFile = filesOnFotoArr[index];
				if( filesOnFotoArr[index].type.toLowerCase().startsWith("image") ){
					console.log("calling resizeImage(), file:" + index);
					jQuery.resizeImage(index, unFile, formData);
				}else{ 
					console.log("skipping file:" + index);
					continue; 
				}
			}
		}
	}
	
	
	function postea(){
		alert('@ postea despues de delay...');
		// b) do the post submition
		jQuery.ajax({method:"POST", url:"escritos/nepe/update.php", data:formData, processData:false, contentType:false, cache:false})
		.done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){
			//el getJSON no entra al .done y cae en .fail si detecta errores de parseo.
			//Con el post tengo yo que usar un try block para detectar errores de parseo y mandarlo a encodeAndGetErrorPath()
			try{
				datosJSObj = JSON.parse(datosJSONStr);
			}catch(errorParseo){
				let datosJSONStrAsXHRTexto = datosJSONStr;
				let textoEstatus = 'Error parseando la siguiente respuesta del server desde escritos/nepe/update.php :<br> Mensaje: ' + errorParseo.message;
				let elError = errorParseo.name;
				
				let path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); 
				jQuery(window.location).attr('href', path); 					
			}
			if(datosJSObj.nepeCoreUpdated && datosJSObj.queDondeUpdated && (datosJSObj.videoInserted || datosJSObj.videoUpdated)){
				jQuery(window.location).attr('href', window.location.pathname + '?look=viewNepe&nepeId=' + datosJSObj.nepeId);
			}else{
				//aqui quiza falta algo
				//jQuery.feedback('form#updateNepeForm h2', datosJSObj.feedback);
			}
		})
		.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
			let xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
			let path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
			jQuery(window.location).attr('href', path); 
		});
		// b) post made
	}//postea function

	fotoArr();
	setTimeout(function(){ buildFormData(); }, 1500);
	setTimeout(function(){ postea(); },3000);	
	
});  //jQuery submit
	



	



//jQuery.hideThemSections();
jQuery('fieldset#submitButtonFieldset button').on('click', function(evento){
	jQuery.showThemSections();
});

let $fotoBoton = jQuery('fieldset#fotoFieldset   button[type=button]');
let $fotoInput = jQuery('fieldset#fotoFieldset   input[name^=fotoArr]');
$fotoBoton.on('click', function(evento){
	$fotoInput.click();
});

/*
let formaStr = 'form#nepeForm';
//validation logic functions are run as handlers to change events
let $redInputs = jQuery( formaStr + ' input[name^=red]');
$redInputs.on('change', function(evento){
	jQuery.haveAtLeast1Red(formaStr);
});
*/
/*
let $fotoInput = jQuery( formaStr + ' input#fotoArrId');
$fotoInput.on('change', function(evento){
	jQuery.have5OrLessImages(formaStr);
});
*/
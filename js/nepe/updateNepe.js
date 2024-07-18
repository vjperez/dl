//task 1
//define populate form function
populateUpdateNepeForm = function(datos){
	//nombre
	document.querySelector('div#nepeTitulo label#nombre').innerText = datos.nombre;
	document.querySelector('fieldset#nombreFieldset input[name=nombre]').value = datos.nombre;
	
	//cuando
	document.querySelector('fieldset#cuandoFieldset input[name=dia1]').value = datos.cuando.lun;
	document.querySelector('fieldset#cuandoFieldset input[name=dia2]').value = datos.cuando.mar;
	document.querySelector('fieldset#cuandoFieldset input[name=dia3]').value = datos.cuando.mie;
	document.querySelector('fieldset#cuandoFieldset input[name=dia4]').value = datos.cuando.jue;
	document.querySelector('fieldset#cuandoFieldset input[name=dia5]').value = datos.cuando.vie;
	document.querySelector('fieldset#cuandoFieldset input[name=dia6]').value = datos.cuando.sab;
	document.querySelector('fieldset#cuandoFieldset input[name=dia7]').value = datos.cuando.dom;
	
	//desdeCasa - suCasa
	let inputValue = datos.desdeCasa;
	let selector = 'fieldset#desdeCasaFieldset input[value=' + inputValue + ']';
	document.querySelector(selector).checked = true;
		inputValue = datos.suCasa;
		selector = 'fieldset#suCasaFieldset    input[value=' + inputValue + ']';
	document.querySelector(selector).checked = true;
	
	//  ------------------------          ---------------------  //
	
	//video
	selector = 'fieldset#videoFieldset textarea[name=videoUrl]';
	document.querySelector(selector).value = datos.videoUrl;
	
	//foto - falta each para array
	//document.querySelector('fieldset#fotoFieldset input[name^=fotoArr]').prop('required', false);
	
	let losQue = JSON.parse( datos.losQue );
	if(losQue !== null){
		selector = 'fieldset#queFieldset input[name^=que]';
		document.querySelectorAll(selector)
		.forEach(
		function(queEl, indice){
			if(indice < losQue.length){
				queEl.value = losQue[indice]; 
			}
			//the html is prepared for a max of 10 'que'
			//en submit entran al arreglo, luego de pasar por cleanStr() y  isNotVacioStr()		  
		});
	}
	
	let losDonde = JSON.parse( datos.losDonde );
	if(losDonde !== null){
		selector = 'fieldset#dondeFieldset input[name^=donde]';
		document.querySelectorAll(selector)
		.forEach(
		function(dondeEl, indice){
			if(indice < losDonde.length){
				dondeEl.value = losDonde[indice];
			}
			//the html is prepared for a max of 5 'donde'
			//en submit entran al arreglo, luego de pasar por cleanStr() y  isNotVacioStr()
		});
	}
}//populate function

//get data to populate form
let index = urlParametro('index');
let urlParams = new URLSearchParams('escritos/nepe/read/getNepe.php');
urlParams.set("nepe_index", index);
fetch('escritos/nepe/read/getNepe.php' + '?' + urlParams.toString() )
.then(
function(respuesta){
  console.log(' fetch, then 1');
  console.log(respuesta);
  return respuesta.json();
})
.then(
function(nepeDatos){
  console.log(' fetch, then 2: ');
  console.log(nepeDatos);
  populateUpdateNepeForm(nepeDatos);
})
.catch(
function(error){
  const href = encodeAndGetErrorPath(error);
  window.location.href = href;
});


hideThemSections();


//task 2
//build formdata with cleanStr() and isVacioStr() returned values ... and make post
document.querySelector('form#nepeForm')
.addEventListener('submit',
function(evento){
	evento.preventDefault();
	fotoArr();
	setTimeout(function(){ buildFormData(); }, 10);
	setTimeout(function(){ postea(); }, 20);	
});  //submit


	function fotoArr(){
		//foto
		//let filesOnFotoArr = formData.getAll("fotoArr[]");
		//la linea de abajo para filesOnFotoArr, works tambien
		let selector = 'fieldset#fotoFieldset   input[name^=fotoArr]';
		let filesOnFotoArr = document.querySelector(selector).files;
		console.log(filesOnFotoArr);
		if( filesOnFotoArr.length === 0){
			formData.delete("fotoArr[]");     
			formData.delete("MAX_FILE_SIZE");
		}else if( filesOnFotoArr.length > 0 ){ 
			ponScript('js/nepe/resizeImage.js');
			
			formData.delete("fotoArr[]"); 
			for(let index = 0; index < filesOnFotoArr.length; index++){
				let unFile = filesOnFotoArr[index];
				if( filesOnFotoArr[index].type.toLowerCase().startsWith("image") ){
					console.log("calling resizeImage(), file:" + index);
					resizeImage(index, unFile, formData);
				}else{ 
					console.log("skipping file:" + index);
					continue; 
				}
			}
		}
	}

	let forma = document.querySelector('form#nepeForm');
	let formData = new FormData(forma);
	function buildFormData(){
		// a) build and edit formdata

		//nombre
		let regexp = new RegExp(/[^a-z0-9\sñüàáèéìíòóùú@._+-]/gi);	//	allowing letters, numbers plus los de login   @ . _ + -
		let nombre = cleanStr( document.querySelector('fieldset#nombreFieldset input[name=nombre]').value, regexp );
		if(isVacioStr(nombre)){
			formData.delete("nombre"); 			formData.append('nombre', 'sin nombre - no name provided');
		}else{
			formData.delete("nombre"); 			formData.append('nombre', nombre);
		}
		
		//cuando is a JS object, ... converted to string in JSON format
		regexp = new RegExp(/[^a-z0-9\sñüàáèéìíòóùú:,@._+-]/gi);	//	allowing letters, numbers plus los de login   @ . _ + -	y  : ,	
		let cuando = {  
			lun:cleanStr( document.querySelector('fieldset#cuandoFieldset input[name=dia1]').value, regexp ), 
			mar:cleanStr( document.querySelector('fieldset#cuandoFieldset input[name=dia2]').value, regexp ),
			mie:cleanStr( document.querySelector('fieldset#cuandoFieldset input[name=dia3]').value, regexp ),
			jue:cleanStr( document.querySelector('fieldset#cuandoFieldset input[name=dia4]').value, regexp ),
			vie:cleanStr( document.querySelector('fieldset#cuandoFieldset input[name=dia5]').value, regexp ),
			sab:cleanStr( document.querySelector('fieldset#cuandoFieldset input[name=dia6]').value, regexp ),
			dom:cleanStr( document.querySelector('fieldset#cuandoFieldset input[name=dia7]').value, regexp )
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
		let suCasa = document.querySelector('input[name="suCasa"]:checked').value;
		formData.append('suCasa', suCasa);
		let desdeCasa = document.querySelector('input[name="desdeCasa"]:checked').value;
		formData.append('desdeCasa', desdeCasa);

		//video
		regexp = new RegExp(/[^a-z0-9\sñüàáèéìíòóùú.:/=?&@._+-]/gi);	//	allowing letters, numbers and simbols needed for a url .:/=?& plus los de login   @ . _  + -
		let videoUrl = cleanStr( document.querySelector('fieldset#videoFieldset textarea[name=videoUrl]').value, regexp );
		if(isVacioStr(videoUrl)){
			formData.delete("videoUrl"); 		formData.append('videoUrl', 'no video provided');
		}else{
			formData.delete("videoUrl"); 		formData.append('videoUrl', videoUrl);
		}
		
		
		//que is a JS array, ... converted to string in JSON format
		let que = new Array();
		document.querySelectorAll('fieldset#queFieldset input[name^=que]')
		.forEach(
		function(inputEl, indice){
			regexp = new RegExp(/[^a-z0-9\sñüàáèéìíòóùú@._+-]/gi);	//	allowing letters, numbers plus los de login   @ . _ + -	
			let cleanedQue = cleanStr(inputEl.value, regexp );
			if(isNotVacioStr(cleanedQue)) { que[indice] = cleanedQue; }
			formData.delete( inputEl.getAttribute("name") ); //sending all ques in JSON string so delete them individually from formData
		});
		que = JSON.stringify(que); 
		formData.append('losQue', que);
		
		
		//donde is a JS array, ... converted to string in JSON format
		let donde = new Array();
		document.querySelectorAll('fieldset#dondeFieldset input[name^=donde]')
		.forEach(
		function(inputEl, indice){
			regexp = new RegExp(/[^a-z0-9\sñüàáèéìíòóùú@._+-]/gi);	//	allowing letters, numbers plus los de login   @ . _  +  -	
			let cleanedDonde = cleanStr(inputEl.value, regexp );
			if(isNotVacioStr(cleanedDonde)) { donde[indice] = cleanedDonde; }
			formData.delete( inputEl.getAttribute("name") ); //sending all dondes in JSON string so delete them individually from formData
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

	function postea(){ 
	  //alert('@ postea despues de delay...');
	  const opciones = { body:formData, method:'post' };
	  fetch('escritos/nepe/update.php', opciones )
	  .then(
	  function(respuesta){
      console.log(' fetch, then 1');
      console.log(respuesta);
      return respuesta.text();  
	  })
	  .then(
	  function(datos){
      console.log(' fetch, then 2: ');
      console.log( datos );
      /////////////////////////try catch////////////////////////
      let datosJSOBJ;
      try{
        datosJSOBJ = JSON.parse( datos );
      }
      catch( err ){
        throw new Error( err + '<br><br>' + datos ); 
      }
      //////////////////////////////////////////////////////////
      if(datosJSOBJ.nepeCoreUpdated && datosJSOBJ.queDondeUpdated && (datosJSOBJ.videoInserted || datosJSOBJ.videoUpdated)){
        window.location.href = window.location.pathname + '?look=viewNepe&nepeId=' + datosJSOBJ.nepeId;
      }else{
        //falta algo ?
        //feedback('form#updateNepeForm h2', datosJSOBJ.feedback);
      } 
	  })
	  .catch(
	  function(error){
      const href = encodeAndGetErrorPath(error);
      window.location.href = href;
	  });
	}//postea function
	






let fotoBoton = document.querySelector('fieldset#fotoFieldset   button[type=button]');
let fotoInput = document.querySelector('fieldset#fotoFieldset   input[name^=fotoArr]');
fotoBoton.addEventListener('click', function(evento){
	fotoInput.click();
});

/*
jQuery('fieldset#submitButtonFieldset button').on('click', function(evento){
	jQuery.showThemSections();
});
*/
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
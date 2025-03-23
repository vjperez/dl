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
  if(datos.videoUrl !== null){
    let ytStr = datos.videoUrl;   //yt:0123456789a
    let ytStrId = ytStr.substring(ytStr.length - 11, ytStr.length)   //0123456789a, youtube videos has 11 chars ids
    
    //selector = 'fieldset#videoFieldset textarea[name=videoUrl]';
    selector = 'fieldset#videoFieldset input[name=videoUrl]';

    //link provided by youtube share, https://youtu.be/0123456789a"
    document.querySelector(selector).value = 'https://youtu.be/' + ytStrId;
  }
	
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
			//en submit entran al arreglo, luego de pasar por minimizeStr() y  isNotVacioStr()		  
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
			//en submit entran al arreglo, luego de pasar por minimizeStr() y  isNotVacioStr()
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
let forma = document.querySelector('form#nepeForm');
let formData = new FormData(forma);
forma.addEventListener('submit',
function(evento){
	evento.preventDefault();

  buildFormData( postea );
});  //submit


    function buildFormData( callbackPostFunction ){
      let regexpNQD =    new RegExp(/[^a-z0-9ñäàáëèéïìíöòóüùú@._+-\s]/gi);	//	allowing letters, numbers plus los de login   @ . _ + -
      let regexpCuando = new RegExp(/[^a-z0-9ñäàáëèéïìíöòóüùú:,@._+-\s]/gi);	//	allowing letters, numbers plus los de login   @ . _ + -	  y   : ,	
      //let regexpURL =    new RegExp(/[^a-z0-9.:/=?&@._+-\s]/gi);	//	allowing letters, numbers and simbols needed for a url .:/=?& plus los de login   @ . _  + -

      // a) build and edit formdata  // core nepe //
      
      //nombre
      let nombre = removeExtraSpacesAndChars( document.querySelector('fieldset#nombreFieldset input[name=nombre]').value, regexpNQD );
      if(isVacioStr(nombre)){
        formData.delete("nombre");      formData.append('nombre', 'no-name-provided');
      }else{
        formData.delete("nombre"); 			formData.append('nombre', nombre);
      }
      
      //cuando is a JS object, ... converted to string in JSON format
      let cuando = {  
        lun:removeExtraSpacesAndChars( document.querySelector('fieldset#cuandoFieldset input[name=dia1]').value, regexpCuando ), 
        mar:removeExtraSpacesAndChars( document.querySelector('fieldset#cuandoFieldset input[name=dia2]').value, regexpCuando ),
        mie:removeExtraSpacesAndChars( document.querySelector('fieldset#cuandoFieldset input[name=dia3]').value, regexpCuando ),
        jue:removeExtraSpacesAndChars( document.querySelector('fieldset#cuandoFieldset input[name=dia4]').value, regexpCuando ),
        vie:removeExtraSpacesAndChars( document.querySelector('fieldset#cuandoFieldset input[name=dia5]').value, regexpCuando ),
        sab:removeExtraSpacesAndChars( document.querySelector('fieldset#cuandoFieldset input[name=dia6]').value, regexpCuando ),
        dom:removeExtraSpacesAndChars( document.querySelector('fieldset#cuandoFieldset input[name=dia7]').value, regexpCuando )
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
      formData.delete("suCasa"); 
      formData.delete("desdeCasa");
      let suCasa = document.querySelector('input[name="suCasa"]:checked').value;
      formData.append('suCasa', suCasa);
      let desdeCasa = document.querySelector('input[name="desdeCasa"]:checked').value;
      formData.append('desdeCasa', desdeCasa);
      //  end of core nepe //

      
      //  beyond core nepe //
      //video
      //let videoUrl = removeExtraSpacesAndChars( document.querySelector('fieldset#videoFieldset input[name=videoUrl]').value, regexpURL );
      let videoUrl = document.querySelector('fieldset#videoFieldset input[name=videoUrl]').value;

      if(isVacioStr(videoUrl)){
        formData.delete("videoUrl"); 		//tested with isset on php
            //append nothing, for isset on php to work    formData.append('videoUrl', 'no-video-provided');
      }else{
        formData.delete("videoUrl"); 		formData.append('videoUrl', videoUrl);
      }
      
      
      //que is a JS array, ... converted to string in JSON format
      let que = new Array();
      document.querySelectorAll('fieldset#queFieldset input[name^=que]')
      .forEach(
      function(inputEl, indice){
        let cleanedQue = minimizeStr(inputEl.value, regexpNQD );
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
        let cleanedDonde = minimizeStr(inputEl.value, regexpNQD );
        if(isNotVacioStr(cleanedDonde)) { donde[indice] = cleanedDonde; }
        formData.delete( inputEl.getAttribute("name") ); //sending all dondes in JSON string so delete them individually from formData
      });
      donde = JSON.stringify(donde);
      formData.append('losDonde', donde);
      // end of beyond core nepe //


      formData.append('nepe_index', index );
      //formdata built
    

    
      console.log("la forma...");
      for (const pareja of formData.entries()) {
        console.log('llave: ' + pareja[0] + '   valor: ' + pareja[1]);
      }
      callbackPostFunction();
    }//buildFormData function


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
        if(datosJSOBJ.nepeCoreUpdated && datosJSOBJ.queDondeUpdated && (datosJSOBJ.videoInserted || datosJSOBJ.videoUpdated  || datosJSOBJ.videoRemoved || datosJSOBJ.videoNothingDone )){
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
	





//task 3
let fotoBoton = document.querySelector('fieldset#fotoFieldset   button[type=button]');
let fotoInput = document.querySelector('fieldset#fotoFieldset   input[name^=fotoArr]');
fotoBoton.addEventListener('click', function(evento){
	fotoInput.click();
});

fotoInput.addEventListener('input', function(evento){
      console.log("fotoInput listener...");
      //fotos
      //let filesOnFotoArr = formData.getAll("fotoArr[]");
      //la linea de abajo para filesOnFotoArr, works tambien
      //let select = 'fieldset#fotoFieldset   input[name^=fotoArr]';
      let filesOnFotoArr = fotoInput.files;
      if( filesOnFotoArr.length > 0 ){
        ponScript('js/nepe/resizeImage.js');
        console.log("procezando: " + filesOnFotoArr.length + " files...");
      }else{ //if( filesOnFotoArr.length === 0){
        formData.delete("fotoArr[]");     //tested with isset on php
        formData.delete("MAX_FILE_SIZE");
      }
      //end of fotos
});





let botonSubmit = document.querySelector('section#submitButtonFieldset   button[type=submit]');
botonSubmit.addEventListener('click', function(evento){
	showThemSections();
});

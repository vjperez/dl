hideThemSections();


//major task 1
//build formdata and make post
let forma = document.querySelector('form#nepeForm');
forma.addEventListener('submit',
function(evento){
	evento.preventDefault(); //not making a submit (POST request) from html action
	
  buildFormData( postea );
});  //submit


  
  let formData = new FormData(forma);
  function buildFormData( callbackPostFunction ){
    // core nepe //

    //nombre
    let regexpN = new RegExp(/[^a-z0-9ñäàáëèéïìíöòóüùú@._+-\s]/gi);	//	allowing letters, numbers plus los de login   @ . _  +  -	
    let nombre = removeExtraSpacesAndChars( document.querySelector('form#nepeForm input[name=nombre]').value, regexpN );
    if(isVacioStr(nombre)){
      formData.delete("nombre"); 			formData.append('nombre', 'sin nombre - no name provided');
    }else{
      formData.delete("nombre"); 			formData.append('nombre', nombre);
    }

    //cuando is a JS object, it is stringified before sending it
    let regexpCuando = new RegExp(/[^a-z0-9ñäàáëèéïìíöòóüùú:,@._+-\s]/gi);	//	allowing letters, numbers plus los de login   @ . _ + -	  y  : ,
    let cuando = {  
      lun:removeExtraSpacesAndChars( document.querySelector('form#nepeForm input[name=dia1]').value, regexpCuando ), 
      mar:removeExtraSpacesAndChars( document.querySelector('form#nepeForm input[name=dia2]').value, regexpCuando ),
      mie:removeExtraSpacesAndChars( document.querySelector('form#nepeForm input[name=dia3]').value, regexpCuando ),
      jue:removeExtraSpacesAndChars( document.querySelector('form#nepeForm input[name=dia4]').value, regexpCuando ),
      vie:removeExtraSpacesAndChars( document.querySelector('form#nepeForm input[name=dia5]').value, regexpCuando ),
      sab:removeExtraSpacesAndChars( document.querySelector('form#nepeForm input[name=dia6]').value, regexpCuando ),
      dom:removeExtraSpacesAndChars( document.querySelector('form#nepeForm input[name=dia7]').value, regexpCuando )
    };
    formData.delete("dia1"); //sending dias in array so delete them individually from formData
    formData.delete("dia2"); //sending dias in array so delete them individually from formData
    formData.delete("dia3"); //sending dias in array so delete them individually from formData
    formData.delete("dia4"); //sending dias in array so delete them individually from formData
    formData.delete("dia5"); //sending dias in array so delete them individually from formData
    formData.delete("dia6"); //sending dias in array so delete them individually from formData
    formData.delete("dia7"); //sending dias in array so delete them individually from formData
    cuando = JSON.stringify(cuando);
    formData.append('cuando', cuando);

    //desdeCasa - suCasa
		let suCasa = document.querySelector('form#nepeForm input[name="suCasa"]:checked').value;
		formData.append('suCasa', suCasa);
		let desdeCasa = document.querySelector('form#nepeForm input[name="desdeCasa"]:checked').value;
		formData.append('desdeCasa', desdeCasa);
    // end of core nepe //

    console.log("la forma...");
    for (const pareja of formData.entries()) {
			console.log('llave: ' + pareja[0] + '   valor: ' + pareja[1]);
		}
    //for (let value of formData.values()) {
    //	console.log(value);
    //}
    console.log(formData);
    //formdata built

    callbackPostFunction();
  }//buildFormData function


	function postea(){
    const opciones = { body:formData, method:'post' };
    fetch('escritos/nepe/crea.php', opciones )
    .then(
    function(respuesta){
      console.log(' fetch, then 1');
      console.log(respuesta);
      return respuesta.text();  
    })
    .then(
    function(datoTxt){
      console.log(' fetch, then 2: ');
      console.log( datoTxt );
      /////////////////////////try catch////////////////////////
      let datoJsObj;
      try{
        datoJsObj = JSON.parse( datoTxt );
      }
      catch( err ){
        throw new Error( err + '<br><br>::php<br>' + datoTxt ); 
      }
      //////////////////////////////////////////////////////////
      if(datoJsObj.nepeCoreCreado){
        window.location.href = window.location.pathname +  '?look=updateNepe&index=' + datoJsObj.index;
      }else{
        //falta algo ?
        //feedback('form#xxxxNepeForm hx', datosJSOBJ.feedback);
      } 
    })
    .catch(
    function(error){
      const href = encodeAndGetErrorPath(error);
      window.location.href = href;
    });		
    // post made
  }//postea function
	





let botonSubmit = document.querySelector('section#submitButtonFieldset   button[type=submit]');
botonSubmit.addEventListener('click', function(evento){
	showThemSections();
});


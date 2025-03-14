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
    let nombre = cleanStr( document.querySelector('form#nepeForm input[name=nombre]').value, regexpN );
    if(isVacioStr(nombre)){
      formData.delete("nombre"); 			formData.append('nombre', 'sin nombre - no name provided');
    }else{
      formData.delete("nombre"); 			formData.append('nombre', nombre);
    }

    //cuando is a JS object, it is stringified before sending it
    let regexpCuando = new RegExp(/[^a-z0-9ñäàáëèéïìíöòóüùú:,@._+-\s]/gi);	//	allowing letters, numbers plus los de login   @ . _ + -	  y  : ,
    let cuando = {  
      lun:cleanStr( document.querySelector('form#nepeForm input[name=dia1]').value, regexpCuando ), 
      mar:cleanStr( document.querySelector('form#nepeForm input[name=dia2]').value, regexpCuando ),
      mie:cleanStr( document.querySelector('form#nepeForm input[name=dia3]').value, regexpCuando ),
      jue:cleanStr( document.querySelector('form#nepeForm input[name=dia4]').value, regexpCuando ),
      vie:cleanStr( document.querySelector('form#nepeForm input[name=dia5]').value, regexpCuando ),
      sab:cleanStr( document.querySelector('form#nepeForm input[name=dia6]').value, regexpCuando ),
      dom:cleanStr( document.querySelector('form#nepeForm input[name=dia7]').value, regexpCuando )
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

    console.log("form built");
    //for (let value of formData.values()) {
    //	console.log(value);
    //}
    console.log(formData);
    //formdata built

    //callbackPostFunction();
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
      if(datosJSOBJ.nepeCoreCreado){
        window.location.href = window.location.pathname +  '?look=updateNepe&index=' + datosJSOBJ.index;
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


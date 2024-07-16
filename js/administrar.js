hideThemSections();

////////////////////////////////// //handle functions  ////////////////////////////////////////////
//erase feedback when user writting
document.querySelector('form#adminEditClaveForm  input')
.addEventListener('keydown',
function(){
	feedback('form#adminEditClaveForm h3.feedback', '');
});
//erase feedback when user writting
document.querySelector('form#adminNepesForm  input[type=text]')
.addEventListener('keydown',
function(){
	feedback('form#adminNepesForm h3.feedback', '');
});


//handle form submit ; adminNepesForm
document.querySelector('form#adminNepesForm')
.addEventListener('submit',
function(evento){
	evento.preventDefault(); //not making a submit (POST request) from html action.
	
  let userNumber = document.querySelector('#userNumber02Id').value;
	let usuario = getNombre( userNumber );		
	let label = '<label class="">' + 'Negocios de ' + usuario + '</label>'; 
	//document.querySelector('fieldset#labelContainer').innerHTML = '';
	document.querySelector('fieldset#labelContainer').append(label);


  let urlParams = new URLSearchParams('escritos/dueno/getOwnNepesWithIds.php');
  urlParams.set("userNumber", userNumber);
  fetch('escritos/dueno/getOwnNepesWithIds.php' + '?' + urlParams.toString())
  .then(
  function(respuesta){
    console.log('view nepe fetch, then 1');
    console.log(respuesta);
    return respuesta.json();
  })
  .then(
  function(datos){
    console.log('view nepe fetch, then 2: ');
    console.log(datos);

    let table =  '<table class="subArea">';
		let cuantos = 0;
		datos.forEach(
    function(dato, index){
			table += '<tr><td><a class="" href="portada.html?look=adminDuenoNepes'
			+ '&acto=deleteNepe' +  '&nepeId=' + dato.nepeId + '">' 
			+ dato.nepeNombre + '<i class="fas fa-trash-alt"></i>' 
			+ '</a></td></tr>';	
			cuantos++;
		});
		
		if(cuantos > 1){
			table += '<tr><td>Los ' + cuantos + ' negocios.</td></tr>';
			table += '<tr><td> </td></tr>';		
			table += '<tr><td><a class="" href="portada.html?look=adminDuenoNepes'
			+ '&acto=deleteHerNepes' +  '&userId=' + userNumber + '">' 
			+ ' Borra ALL nepes de ' + dato + '<i class="fas fa-trash-alt"></i>' 
			+ '</a></td></tr>';
		}
		table += '</table>';
		//document.querySelector('fieldset#tableContainer').innerHTML = '';
		document.querySelector('fieldset#tableContainer').appendChild(table);
  })
	
});	


//handle form submit ; adminEditClaveForm
let formaCl = document.querySelector('form#adminEditClaveForm');
let formDataCl = new FormData(formaCl);

formaCl.addEventListener('submit',
function(evento){
	evento.preventDefault(); //not making a submit (POST request) from html action.
	let user = 'valorDummy';
	let pass01 = document.querySelector('form#adminEditClaveForm #passwordId').value;
	let pass02 = document.querySelector('form#adminEditClaveForm #passwordConfirmId').value; 
	
  if( areValidUserYPass(user, pass01, pass02, 'fullFeedback', 'form#adminEditClaveForm h3.feedback') ){
		//Valid values son los q cumplen estas 3 cosas.
		//Estas cosas se pueden chequear antes del post y evito post sin sentido
		// 1)lenght >= 4; 2)only numbers or letters; 3)both pass are equal;
		//Si tengo valores q fueron registrables entonces, Making a submit (POST request) here. Not in look=editDuenoShowEmpresas
		
		let userNumber = document.querySelector('#userNumberId').value;
    let usuario = getNombre( userNumber );

		formDataCl.append('pass01', pass01);  formDataCl.append('userNumber', userNumber);
    const opciones = { body:formDataCl, method:'post' };

	  fetch('escritos/dueno/editClave.php', opciones )
	  .then(
	  function(respuesta){
	    console.log(' fetch, then 1');
	    console.log(respuesta);
	    return respuesta.text();
	  })
	  .then(
	  function(dato){
	    console.log(' fetch, then 2: ');
	    console.log(dato);
      /////////////////////////try catch////////////////////////
      let datosJSOBJ;
      try{
        datosJSOBJ = JSON.parse( dato );
      }
      catch( err ){
        throw new Error( err + '<br><br>' + dato ); 
      }
      //////////////////////////////////////////////////////////
			if(datosJSOBJ.editado){	
				let feedbackStr = 'Password de ' + usuario + ' fue editado.'; 
				feedback('form#adminEditClaveForm h3.feedback', feedbackStr, 'feedbackgreen', 'downdelayup');
			}else{
				let feedbackStr = 'Password de ' + usuario + ' no fue editado.';
				feedback('form#adminEditClaveForm h3.feedback', feedbackStr, 'feedbackwarn', 'downdelayup');
			}
	  })
	  .catch(
	  function(error){
	    const href = encodeAndGetErrorPath(error);
	    window.location.href = href;
	  });

	}//if

});//submit event listener

/////////////////////////function to get nombre ; same as ajax to populate on home page ///////////
function getNombre( userNumber ){
  let urlParams = new URLSearchParams('escritos/dueno/getNombre.php');
  urlParams.set("userNumber", userNumber);
  fetch('escritos/dueno/getNombre.php' + '?' + urlParams.toString())
  .then(
  function(respuesta){
    console.log('view nepe fetch, then 1');
    console.log(respuesta);
    return respuesta.json();
  })
  .then(
  function(dato){
    console.log('view nepe fetch, then 2: ');
    console.log(dato);
    return dato; 
  })
  .catch(
  function(error){
    const href = encodeAndGetErrorPath(error);
    window.location.href = href;
  });

}
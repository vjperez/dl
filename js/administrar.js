hideThemSections();


 
//handle form submit ; adminEditClaveForm
let formaCl = document.querySelector('form#adminEditClaveForm');
let formDataCl = new FormData(formaCl);

formaCl.addEventListener('submit', 
function(evento){
  evento.preventDefault();

  let userNumber = document.querySelector('#userNumberId').value;
  getNombre( userNumber, submitHandlerAEC );
});//submit event listener

function submitHandlerAEC( userNumber, usuario ){
	let user = 'valorDummy';
	let pass01 = document.querySelector('form#adminEditClaveForm #passwordId').value;
	let pass02 = document.querySelector('form#adminEditClaveForm #passwordConfirmId').value; 
	
  if( areValidUserYPass(user, pass01, pass02, 'fullFeedback', 'form#adminEditClaveForm h3.feedback') ){

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

}




//handle form submit ; adminNepesForm
document.querySelector('form#adminNepesForm')
.addEventListener('submit',
function(evento){
  evento.preventDefault();
  
  let userNumber = document.querySelector('#userNumber02Id').value;
  getNombre( userNumber, submitHandlerAN );
});//submit event listener

function submitHandlerAN( userNumber, usuario ){
	let label = '<label class="cabe">' + 'Negocios de ' + usuario + '</label>'; 
	document.querySelector('section#labelContainer').innerHTML = label;

  let urlParams = new URLSearchParams('escritos/dueno/getOwnNepesWithIds.php');
  urlParams.set("userNumber", userNumber);
  fetch('escritos/dueno/getOwnNepesWithIds.php' + '?' + urlParams.toString())
  .then(
  function(respuesta){
    console.log('fetch, then 1');
    console.log(respuesta);
    return respuesta.json();
  })
  .then(
  function(datos){
    console.log('fetch, then 2: ');
    console.log(datos);

    let table =  '<table class="subArea">';
		let cuantos = 0;
		datos.forEach(
    function(dato, index){
			table += '<tr><td>'
      + '<i class="fa-solid fa-trash-alt"></i>'
      + '<a href="portada.html?look=administrar'
			+ '&acto=deleteNepe' +  '&nepeId=' + dato.nepeId + '">' 
			+ dato.nepeNombre  
			+ '</a></td></tr>';	
			cuantos++;
		});
		
		if(cuantos > 1){
			table += '<tr><td>Los ' + cuantos + ' negocios.</td></tr>';
			table += '<tr><td> </td></tr>';		
			table += '<tr><td>'
      + '<i class="fa-solid fa-trash-alt"></i>'
      + '<a class="" href="portada.html?look=administrar'
			+ '&acto=deleteHerNepes' +  '&userId=' + userNumber + '">' 
			+ ' Borra ALL nepes de ' + usuario 
			+ '</a></td></tr>';
		}
		table += '</table>';
		document.querySelector('fieldset#tableContainer').innerHTML = table;
  })
	
}



function getNombre( numero, f ){
  let urlParams = new URLSearchParams('escritos/dueno/getNombre.php');
  urlParams.set("userNumber", numero);
  fetch('escritos/dueno/getNombre.php' + '?' + urlParams.toString())
  .then(
  function(respuesta){
    console.log('fetch, then 1');
    console.log(respuesta);
    return respuesta.text();
  })
  .then(
  function(nombre){
    console.log('fetch, then 2: ');
    console.log(nombre);

      /////////////////////////try catch////////////////////////
      let nombreJSOBJ;
      try{
        nombreJSOBJ = JSON.parse( nombre );
      }
      catch( err ){
        throw new Error( 'El err:' + err + '<br><br>El nombre:' + nombre ); 
      }
      //////////////////////////////////////////////////////////

      f( numero, nombre ); 
  })
  .catch(
  function(error){
    const href = encodeAndGetErrorPath(error);
    window.location.href = href;
  });

}



//erase feedback when user writting
/*
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
*/




//task - show and hide 
//erase feedback when user writes
function showHideConfirm(){
	//feedback('form[id*=Form] h3', '', '');
  let pass01 = document.querySelector('#passwordId').value;
  if( pass01.length > 0 ){
    document.querySelector('fieldset label.confirm').style.display = '';
    document.querySelector('input.confirm').style.display = '';
  }
  else{
    document.querySelector('fieldset label.confirm').style.display = 'none';
    document.querySelector('input.confirm').style.display = 'none';
  }
}
document.querySelector('form[id*=Form]  input[name^=password]').addEventListener('keyup', showHideConfirm);
//document.querySelector('form[id*=Form]  input[name=^red]' ).addEventListener('keyup', showHideConfirm);
showHideConfirm();
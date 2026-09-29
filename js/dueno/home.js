let usuario = ""; // this value is used for feedback on forms submit
let cuantosNepes = 0; 
 
//task 1 - get info
////////////////////// fetch to populate home page /////////////////
fetch('escritos/dueno/home/getEmilio.php')
.then(
function(respuesta){
  console.log('view nepe fetch, then 1');
  console.log(respuesta);
  return respuesta.text();
})
.then(
function(datoTxt){
  console.log('view nepe fetch, then 2: ');
  console.log(datoTxt);

  /////////////////////try-catch/////////////////
  let datoJsObj;
  try{
    datoJsObj = JSON.parse( datoTxt );
  }
  catch( err ){
    throw new Error( err + '<br><br>::php<br>' + datoTxt ); 
  }
  ///////////////////////////////////////////////

  usuario = datoJsObj;
  document.querySelector('div#labelTableContainer label').innerHTML = '' + usuario ; 
})
.catch(
function(error){
  const href = encodeAndGetErrorPath(error);
  window.location.href = href;
});


////////////////////// fetch to populate home page /////////////////
fetch('escritos/dueno/home/getOwnNepesWithIds.php')
.then(
function(respuesta){
  console.log('view nepe fetch, then 1');
  console.log(respuesta);
  return respuesta.text();
})
.then(
function(datosTxt){
  console.log('view nepe fetch, then 2: ');
  console.log(datosTxt);

  /////////////////////try-catch/////////////////
  let datosJsObj;
  try{
    datosJsObj = JSON.parse( datosTxt );
  }
  catch( err ){
    throw new Error( err + '<br><br>::php<br>' + datosTxt ); 
  }
  ///////////////////////////////////////////////

  let elTable = "";
	datosJsObj.forEach(
    function(nepe, index){
      elTable += '<tr><td>';
      elTable += '<a class="link" href="portada.html?look=updateNepe&index=' + index + '">' + nepe.nepeNombre + '</a>';
      elTable += '</td></tr>';

      cuantosNepes++;
	  });	
	document.querySelector('div#labelTableContainer table').innerHTML = elTable;
  boton();
})
.catch(
function(error){
  const href = encodeAndGetErrorPath(error);
  window.location.href = href;
});



////////////////////// fetch to populate home page /////////////////
fetch('escritos/dueno/home/getSocials.php')
.then(
function(respuesta){
  console.log('view nepe fetch, then 1');
  console.log(respuesta);
  return respuesta.text();
})
.then(
function(datosTxt){
  console.log('view nepe fetch, then 2: ');
  console.log(datosTxt);

  /////////////////////try-catch/////////////////
  let socialDatosJsObj;
  try{
    socialDatosJsObj = JSON.parse( datosTxt );
  }
  catch( err ){
    throw new Error( err + '<br><br>::php<br>' + datosTxt ); 
  }
  ///////////////////////////////////////////////

	if( socialDatosJsObj[0] ) document.querySelector('fieldset#editContactosFieldset input#telefonoId').value = socialDatosJsObj[0];
	if( socialDatosJsObj[1] ) document.querySelector('fieldset#editContactosFieldset input#nombreId').value = socialDatosJsObj[1];
	if( socialDatosJsObj[2] ) document.querySelector('fieldset#editContactosFieldset input#redinstaId').value = socialDatosJsObj[2];
	if( socialDatosJsObj[3] ) document.querySelector('fieldset#editContactosFieldset input#redcaralibroId').value = socialDatosJsObj[3];
})
.catch(
function(error){
  const href = encodeAndGetErrorPath(error);
  window.location.href = href;
});




hideThemSections();




//task 2 - submit
let formaClTxt = 'form#editClaveForm'; 
let formaCl = document.querySelector(formaClTxt);
let formDataCl = new FormData(formaCl);

formaCl.addEventListener('submit', 
function(evento){
  evento.preventDefault(); //not making a submit (POST request) from html action.
  let user = 'valorDummy';
  let pass01tb = document.querySelector('form#editClaveForm #passwordId').value;
  let pass02tb = document.querySelector('form#editClaveForm #passwordConfirmId').value;

  if( areValidNombreYPass(user, pass01tb, pass02tb, 'fullFeedback', 'form#editClaveForm h3.feedback') ){

    formDataCl.append('pass', pass01tb);
    const opciones = { body:formDataCl, method:'post' };
	  fetch('escritos/dueno/editClave.php', opciones )
	  .then(
	  function(respuesta){
	    console.log('edit clave fetch, then 1');
	    console.log(respuesta);
	    return respuesta.text();
	  })
	  .then(
	  function(datoTxt){
	    console.log('edit clave fetch, then 2: ');
	    console.log(datoTxt);

      /////////////////////////try-catch////////////////////////
      let datoJsObj;
      try{
        datoJsObj = JSON.parse( datoTxt );
      }
      catch( err ){
        throw new Error( err + '<br><br>::php<br>' + datoTxt ); 
      }
      //////////////////////////////////////////////////////////

      if(datoJsObj.editado){
        let feedbackStr = usuario + ', tu password fue editado.'; 
        feedback(formaClTxt + ' h3.feedback', feedbackStr, 'feedbackgreen', 'downdelayup');
      }else{
        let feedbackStr = usuario + ', no se pudo con tu pass.';
        feedback(formaClTxt + ' h3.feedback', feedbackStr, 'feedbackwarn', 'downdelayup');
      }
	  })
	  .catch(
	  function(error){
	    const href = encodeAndGetErrorPath(error);
	    window.location.href = href;
	  });

  }//if

}); // editClaveForm submit eventlistener



let formaConTxt = 'form#editContactosForm';
let formaCon = document.querySelector(formaConTxt);
let formDataCon = new FormData(formaCon);

formaCon.addEventListener('submit', 
function(evento){
  evento.preventDefault(); //not making a submit (POST request) from html action.
  let tel        = document.querySelector('fieldset#editContactosFieldset input#telefonoId').value;
	let nombre      = document.querySelector('fieldset#editContactosFieldset input#nombreId').value;
  let redinsta = document.querySelector('fieldset#editContactosFieldset input#redinstaId').value;
  let redcaralibro = document.querySelector('fieldset#editContactosFieldset input#redcaralibroId').value;

  formDataCon.append('tel', tel);               formDataCon.append('nombre', nombre);
  formDataCon.append('redinsta', redinsta); formDataCon.append('redcaralibro', redcaralibro);
  const opciones = { body:formDataCon, method:'post' };
  fetch('escritos/dueno/editContactos.php', opciones )
  .then(
  function(respuesta){
    console.log('edit contactos fetch, then 1');
    console.log(respuesta);
    return respuesta.text();
  })
  .then(
  function(datoTxt){
    console.log('edit contactos fetch, then 2: ');
    console.log(datoTxt);

    /////////////////////////try-catch////////////////////////
    let datoJsObj;
    try{
      datoJsObj = JSON.parse( datoTxt );
    }
    catch( err ){
      throw new Error( err + '<br><br>::php<br>' + datoTxt ); 
    }
    //////////////////////////////////////////////////////////

		if(datoJsObj.actualizados){
			let feedbackStr = usuario + ', tus contactos fueron actualizados.'; 
			feedback(formaConTxt + ' h3.feedback', feedbackStr, 'feedbackgreen', 'downdelayup');
		}
  })
  .catch(
  function(error){
    const href = encodeAndGetErrorPath(error);
    window.location.href = href;
  });

}); // editContactosForm submit




//task 3 - show and hide 
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



function boton(){
  //handle link to crea nepe when click on button
  let elboton = document.querySelector('div#labelTableContainer button');
  if(cuantosNepes < 1){
    console.log('menor que uno:'+cuantosNepes);
    //elboton.disabled = false;
    elboton.addEventListener('click',
    function(){
      window.location.href = window.location.pathname + '?look=creaNepe';
    });
  }else{
    console.log('uno o mas:'+cuantosNepes);
    //elboton.disabled = true;
    elboton.removeEventListener('click',
    function(){
      window.location.href = window.location.pathname + '?look=creaNepe';
    });
  }
}
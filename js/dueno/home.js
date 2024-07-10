let usuario = ""; // this value is used for feedback on forms submit
////////////////////// fetch to populate home page /////////////////

fetch('escritos/dueno/getNombre.php')
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
  document.querySelector('div#labelTableContainer label').innerHTML = 'Negocios de ' + dato ;
	usuario = dato; 
})
.catch(
function(error){
  const href = encodeAndGetErrorPath(error);
  window.location.href = href;
});


fetch('escritos/dueno/getOwnNepesWithIds.php')
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
  let elTable = "";
	datos.forEach(
    function(dato, index){
      elTable += '<tr><td>';
      elTable += '<a class="link" href="portada.html?look=updateNepe&index=' + index + '">' + dato.nepeNombre + '</a>';
      elTable += '</td></tr>';
	  });	
	document.querySelector('div#labelTableContainer table').innerHTML = elTable;
})
.catch(
function(error){
  const href = encodeAndGetErrorPath(error);
  window.location.href = href;
});


fetch('escritos/dueno/getSocials.php')
.then(
function(respuesta){
  console.log('view nepe fetch, then 1');
  console.log(respuesta);
  return respuesta.json();
})
.then(
function(socialDatos){
  console.log('view nepe fetch, then 2: ');
  console.log(socialDatos);
	if( socialDatos[0] ) document.querySelector('fieldset#editContactosFieldset input#red1Id').value = socialDatos[0];
	if( socialDatos[1] ) document.querySelector('fieldset#editContactosFieldset input#red2Id').value = socialDatos[1];
	if( socialDatos[2] ) document.querySelector('fieldset#editContactosFieldset input#red3Id').value = socialDatos[2];
	if( socialDatos[3] ) document.querySelector('fieldset#editContactosFieldset input#red4Id').value = socialDatos[3];
})
.catch(
function(error){
  const href = encodeAndGetErrorPath(error);
  window.location.href = href;
});


hideThemSections();


document.querySelector('form#editClaveForm')
.addEventListener('submit', 
function(evento){
  evento.preventDefault(); //not making a submit (POST request) from html action.
  let user = 'valorDummy';
  let pass01 = document.querySelector('#passwordId').value;
  let pass02 = document.querySelector('#passwordConfirmId').value;
  if( areValidUserYPass(user, pass01, pass02, 'fullFeedback', 'form#editClaveForm h3.feedback') ){
    const opciones = { pass01:pass01, method:'post' };
	  fetch('escritos/dueno/editClave.php', opciones )
	  .then(
	  function(respuesta){
	    console.log(' fetch, then 1');
	    console.log(respuesta);
	    return respuesta.json();
	  })
	  .then(
	  function(dato){
	    console.log(' fetch, then 2: ');
	    console.log(dato);
      if(dato.editado){
        let feedbackStr = usuario + ', tu clave fue editada.'; 
        feedback('form#editClaveForm h3.feedback', feedbackStr, 'feedbackgreen', 'downdelayup');
      }else{
        let feedbackStr = usuario + ', trata otra vez.';
        feedback('form#editClaveForm h3.feedback', feedbackStr, 'feedbackwarn', 'downdelayup');
      }
	  })
	  .catch(
	  function(error){
	    const href = encodeAndGetErrorPath(error);
	    window.location.href = href;
	  });
  }
}); // editClaveForm submit

document.querySelector('form#editContactosForm')
.addEventListener('submit', 
function(evento){
  evento.preventDefault(); //not making a submit (POST request) from html action.
  let tel        = document.querySelector('form#editContactosForm  input#red1Id').value;
	let email      = document.querySelector('form#editContactosForm  input#red2Id').value;
  let redSocial1 = document.querySelector('form#editContactosForm  input#red3Id').value;
  let redSocial2 = document.querySelector('form#editContactosForm  input#red4Id').value;

  const opciones = { tel:tel, email:email, redSocial1:redSocial1, redSocial2:redSocial2, method:'post' };
  fetch('escritos/dueno/bregaContactos.php', opciones )
  .then(
  function(respuesta){
    console.log(' fetch, then 1');
    console.log(respuesta);
    return respuesta.json();
  })
  .then(
  function(dato){
    console.log(' fetch, then 2: ');
    console.log(dato);
		if(dato.actualizados){
			let feedbackStr = usuario + ', tus contactos fueron actualizados.'; 
			feedback('form#editContactosForm h3.feedback', feedbackStr, 'feedbackgreen', 'downdelayup');
		}
  })
  .catch(
  function(error){
    const href = encodeAndGetErrorPath(error);
    window.location.href = href;
  });    
}); // editContactosForm submit

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

//handle link to crea nepe when click on button
document.querySelector('div#labelTableContainer button')
.addEventListener('click',
function(){
  window.location.href = window.location.pathname + '?look=creaNepe';
});

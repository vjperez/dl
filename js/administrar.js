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
  if(usuario !== false){
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
      function(datoTxt){
        console.log(' fetch, then 2: ');
        console.log(datoTxt);
        /////////////////////////try catch////////////////////////
        let datosJsObj;
        try{
          datosJsObj = JSON.parse( datoTxt );
        }
        catch( err ){
          throw new Error( err + '<br><br>::php<br>' + datoTxt ); 
        }
        //////////////////////////////////////////////////////////
        if(datosJsObj.editado){	
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

    }//if valid pass

  }else{
    //usuario === false); ver llamada del callback al final de getNombre()
    let feedbackStr = 'Id invalido: ' + userNumber + '.  El Usuario: ' + usuario + ', no existe.';
    feedback('form#adminEditClaveForm h3.feedback', feedbackStr, 'feedbackwarn', 'downdelayup');
  }
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
  if(usuario !== false){
    let label = '<label class="cabe">' + 'Negocios de ' + usuario + '</label>'; 
    document.querySelector('section#labelContainer').innerHTML = label;

    let urlParams = new URLSearchParams('escritos/dueno/getOwnNepesWithIds.php');
    urlParams.set("userNumber", userNumber);
    fetch('escritos/dueno/getOwnNepesWithIds.php' + '?' + urlParams.toString())
    .then(
    function(respuesta){
      console.log('fetch, then 1');
      console.log(respuesta);
      return respuesta.text();
    })
    .then(
    function(datosTxt){ datosTxt = datosTxt + 'dx}';
      console.log('fetch, then 2: ');
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
  

      let table =  '<table class="subArea">';
      let cuantos = 0;
      datosJsObj.forEach(
      function(dato, index){
        table += '<tr><td>'
        + '<i class="fa-solid fa-trash-alt"></i>'
        + '<a href="portada.html?look=administrar'
        + '&acto=deleteNepe' +  '&nepeId=' + dato.nepeId + '">' 
        + dato.nepeNombre  
        + '</a></td></tr>';	
        cuantos++;
      });
      
      if(cuantos == 0){
        table += '<tr><td> ' + usuario + ' tiene ' + cuantos+ ' negocios.</td></tr>';
        table += '<tr><td> </td></tr>';		
        table += '<tr><td>'
        + '<i class="fa-solid fa-trash-alt"></i>'
        + '<a class="" href="portada.html?look=administrar'
        + '&acto=deleteUser' +  '&userNo=' + userNumber + '">' 
        + ' Borra usuario :  ' + usuario 
        + '</a></td></tr>';
      }

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
    .catch(
      function(error){
        const href = encodeAndGetErrorPath(error);
        window.location.href = href;
    });
  }else{
    //usuario === false); ver llamada del callbacck al final de getNombre()
    let feedbackStr = 'Id invalido: ' + userNumber + '.  El Usuario: ' + usuario + ', no existe.'; 
    feedback('form#adminNepesForm h3.feedback', feedbackStr, 'feedbackwarn', 'downdelayup');
    
    document.querySelector('section#labelContainer').innerHTML = '';
    document.querySelector('fieldset#tableContainer').innerHTML = '';
  }
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
  function(nombreTxt){
    console.log('fetch, then 2: ');
    console.log(nombreTxt);

      /////////////////////////try catch////////////////////////
      let nombreJsObj;
      try{
        nombreJsObj = JSON.parse( nombreTxt );
        //alert(nombreJSOBJ);
      }
      catch( err ){
        throw new Error( 'El err:' + err + '<br><br>El nombre:' + nombreTxt ); 
      }
      //////////////////////////////////////////////////////////

      //when nombreJSOBJ es false ...
      //numero es un userNumber que no existe en db
      //getNombre.php retorno false en vez de username
      f( numero, nombreJsObj ); 
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
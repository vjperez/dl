let forma = document.querySelector('form#registroForm');
let formData = new FormData(forma);

forma.addEventListener('submit', 
function(evento){
    evento.preventDefault(); //not making a submit (POST request) from html action
    let usertb = document.querySelector('#usernameId').value;
    let pass01 = document.querySelector('#passwordId').value;
    let pass02 = document.querySelector('#passwordConfirmId').value;

    if( areValidUserYPass(usertb, pass01, pass02, 'fullFeedback', 'form#registroForm h3.feedback') ){

      formData.append('usertb', usertb);
      formData.append('pass01', pass01);
      const opciones = { body:formData, method:'post' };
      fetch('escritos/dueno/creaDueno.php', opciones )
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
        if(datosJSOBJ.registrado){
          window.location.href = window.location.pathname + '?look=home';
        }else{ // usuario ya existe
          feedback('form#registroForm h3.feedback', datosJSOBJ.feedback, 'feedbackwarn', 'downdelayup');
        }
      })
      .catch(
      function(error){
        const href = encodeAndGetErrorPath(error);
        window.location.href = href;
      });      

    }//if

});//eventlistener


function showHideConfirm(evento){    
  const usertb = document.querySelector('#usernameId').value;
  const pass01 = document.querySelector('#passwordId').value;
  if( usertb.length > 0  &&  pass01.length > 0 ){
    document.querySelector('fieldset label.confirm').style.display = '';
    document.querySelector('input.confirm').style.display = '';
  }else{
    document.querySelector('label.confirm').style.display = 'none';
    document.querySelector('input.confirm').style.display = 'none';
  }	
}
document.querySelector('form[id*=Form]  input[name^=password]').addEventListener('keyup', showHideConfirm);
document.querySelector('form[id*=Form]  input[name=username]' ).addEventListener('keyup', showHideConfirm);

showHideConfirm();

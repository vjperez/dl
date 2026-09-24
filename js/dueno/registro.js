let forma = document.querySelector('form#registroForm');
let formData = new FormData(forma);

forma.addEventListener('submit', 
function(evento){
    evento.preventDefault(); //not making a submit (POST request) from html action
    let nombretb = document.querySelector('#nombreId').value;
    let pass01 = document.querySelector('#passwordId').value;
    let pass02 = document.querySelector('#passwordConfirmId').value;

    if( areValidNombreYPass(nombretb, pass01, pass02, 'fullFeedback', 'form#registroForm h3.feedback') ){

      formData.append('nombretb', nombretb);
      formData.append('pass01', pass01);
      let opciones = { body:formData, method:'post' };
      fetch('escritos/dueno/creaDueno.php', opciones )
      .then(
      function(respuesta){
        console.log(' fetch, then 1:');
        console.log(respuesta);
        return respuesta.text();  
      })
      .then(
      function(datoTxt){
        console.log(' fetch, then 2: ');
        console.log( datoTxt );

        /////////////////////////try-catch////////////////////////
        let datoJsObj;
        try{
          datoJsObj = JSON.parse( datoTxt );
        }
        catch( err ){
          throw new Error( err + '<br><br>::php<br>' + datoTxt ); 
        }
        //////////////////////////////////////////////////////////
        
        if(datoJsObj.registrado){
          window.location.href = window.location.pathname + '?look=home';
        }else{ // usuario ya existe
          feedback('form#registroForm h3.feedback', datoJsObj.feedback, 'feedbackwarn', 'downdelayup');
        }
      })
      .catch(
      function(error){
        let href = encodeAndGetErrorPath(error);
        window.location.href = href;
      });      

    }//if

});//submit eventlistener


function showHideConfirm(evento){    
  let nombretb = document.querySelector('#nombreId').value;
  let pass01 = document.querySelector('#passwordId').value;
  if( nombretb.length > 0  &&  pass01.length > 0 ){
    document.querySelector('section.confirm').style.display = '';
    document.querySelector('div.confirm').style.display = '';
  }else{
    document.querySelector('section.confirm').style.display = 'none';
    document.querySelector('div.confirm').style.display = 'none';
  }	
}
document.querySelector('form[id*=Form]  input[name^=password]').addEventListener('keyup', showHideConfirm);
document.querySelector('form[id*=Form]  input[name=nombre]' ).addEventListener('keyup', showHideConfirm);

showHideConfirm();

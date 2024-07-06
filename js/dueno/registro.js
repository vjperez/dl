document.querySelector('form#registroForm')
.addEventListener('submit', 
function(evento){
    evento.preventDefault(); //not making a submit (POST request) from html action
    const usertb = document.querySelector('#usernameId').value;
    const pass01 = document.querySelector('#passwordId').value;
    const pass02 = document.querySelector('#passwordConfirmId').value;
    if( areValidUserYPass(usertb, pass01, pass02, 'fullFeedback', 'form#registroForm h3.feedback') ){
        jQuery.post('escritos/dueno/creaDueno.php', {usertb:usertb, pass01:pass01} )//check here that password are equal
        .done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){
            //el getJSON no entra al .done y cae en .fail si detecta errores de parseo.
            //Con el post tengo yo que usar un try block para detectar errores de parseo y mandarlo a jQuery fallas
            try{
                datosJSObj = JSON.parse(datosJSONStr);
            }catch(errorParseo){
                var datosJSONStrAsXHRTexto = datosJSONStr;
                var textoEstatus = 'Error parseando la siguiente respuesta del server en escritorios/dueno/creaDueno.php :<br> Mensaje: ' + errorParseo.message;
                var elError = errorParseo.name;
                
                var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); 
                jQuery(window.location).attr('href', path); 				
            }
            if(datosJSObj.registrado){
                jQuery(window.location).attr('href', window.location.pathname + '?look=home');
            }else{ // usuario ya existe
              feedback('form#registroForm h3.feedback', datosJSObj.feedback, 'feedbackwarn', 'downdelayup');
            }
        })
        .fail(function(xhrObjetoForFAIL, textoEstatus, elError){
            var xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
            var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
            jQuery(window.location).attr('href', path); 
        });
    }
});


function showHideConfirm(evento){    
  const usertb = document.querySelector('#usernameId').value;
  const pass01 = document.querySelector('#passwordId').value;
  if( usertb.length > 0  &&  pass01.length > 0 ){
    document.querySelector('fieldset label.confirm').style.display = '';
    document.querySelector('input.confirm').style.display = '';
  }else{
    document.querySelector('fieldset label.confirm').style.display = 'none';
    document.querySelector('input.confirm').style.display = 'none';
  }	
}
document.querySelector('form[id*=Form]  input[name^=password]').addEventListener('keyup', showHideConfirm);
document.querySelector('form[id*=Form]  input[name=username]' ).addEventListener('keyup', showHideConfirm);

showHideConfirm();

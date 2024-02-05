jQuery('#footer').css('visibility','visible');


//erase feedback when user writting
jQuery('form#registroForm  input[name^=password],  form#registroForm  input[name=username]').keydown(function(){
    jQuery.feedback('form#registroForm h3.feedback', '');
});


jQuery('form#registroForm').submit(function(evento){
    evento.preventDefault(); //not making a submit (POST request) from html action
    var usertb = jQuery('#usernameId').val();
    var pass01 = jQuery('#passwordId').val();
    var pass02 = jQuery('#passwordConfirmId').val();
    if( jQuery.areValidUserYPass(usertb, pass01, pass02, 'fullFeedback', 'form#registroForm h3.feedback') ){
        //Making a submit (POST request) here. Not in look=editDuenoShowEmpresas
        jQuery.post('escritos/dueno/creaDueno.php', {usertb:usertb, pass01:pass01} )//check here that password are equal
        .done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){
            //el getJSON no entra al .done y cae en .fail si detecta errores de parseo.
            //Con el post tengo yo que usar un try block para detectar errores de parseo
            try{
                //alert('datosJSONStr: ' + datosJSONStr);
                datosJSObj = JSON.parse(datosJSONStr);
            }catch(errorParseo){
				//alert('errorParseo message: ' + errorParseo.message);
                var datosJSONStrAsXHRTexto = datosJSONStr;
                var textoEstatus = 'Error parseando la siguiente respuesta del server en escritorios/dueno/creaDueno.php :<br> Mensaje: ' + errorParseo.message + '</b>';
                var elError = errorParseo.name;
                
                var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); 
                jQuery(window.location).attr('href', path); 				
            }
            if(datosJSObj.registrado){
                jQuery(window.location).attr('href', window.location.pathname + '?look=home');
            }else{ // usuario ya existe
                jQuery.feedback('form#registroForm h3.feedback', datosJSObj.feedback);
            }
        })
        .fail(function(xhrObjetoForFAIL, textoEstatus, elError){
            var xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
            var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
            jQuery(window.location).attr('href', path); 
        });
    }
});
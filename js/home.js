jQuery.home_populate = function(){
        //label and table
        var elLabel = ''; 	
        var elTable = '';  

        //alert('get username...');
        jQuery.ajax({
            //cache: false,
            url: 'escritos/getUsername.php',
            dataType: "json"
        })
        .done(function(dato, estatusForDONE, xhrObjetoForDONE){
            elLabel = 'Negocios de ' + dato; 
            jQuery('fieldset#labelTableContainer label').html( elLabel );
        })
        .fail(function(xhrObjetoForFAIL, textoEstatus, elError){
            var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
            var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
            jQuery(window.location).attr('href', path);
        });



        //alert('show nepes get ids...');
        jQuery.ajax({
            //cache: false,
            url: 'escritos/showNepesGetIds.php',
            dataType: "json"
        })
        .done(function(datos, estatusForDONE, xhrObjetoForDONE){
            //alert('datos: ' + datos);
            jQuery.each(datos, function(index){
                elTable += '<tr><td><a class="link" href="portada.html?look=updateNepe'  
                + '&nepeId=' + datos[index].nepeId  + '">'
                + datos[index].nepeNombre + '</a></td></tr>';
            });	
            jQuery('fieldset#labelTableContainer table').html( elTable );
        })
        .fail(function(xhrObjetoForFAIL, textoEstatus, elError){
            var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
            var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
            jQuery(window.location).attr('href', path); 
        });
}

//do this when form submitted ;
//alert('.submit @ home...') 
jQuery('form#editDuenoForm').submit(function(evento){
    evento.preventDefault(); //not making a submit (POST request) from html action.
    var user = 'valorDummy';
    var pass01 = jQuery('#passwordId').val();
    var pass02 = jQuery('#passwordConfirmId').val();
    if( jQuery.areValidUserYPass(user, pass01, pass02, 'fullFeedback', 'form#editDuenoForm h3') ){
        //Valid values son los q cumplen estas 3 cosas.
        //Estas cosas se pueden chequear antes del post y evito post sin sentido
        // 1)lenght >= 4; 2)only numbers or letters; 3)both pass are equal;
        //Si tengo valores q fueron registrables entonces, Making a submit (POST request) here. Not in look=editDuenoShowEmpresas
        
    //jQuery.post('escritos/editDuenoContrasena.php', {duenoId:duenoId, pass01:pass01} )
        jQuery.post('escritos/editDuenoContrasena.php', {pass01:pass01} )
        .done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){
            //el getJSON no entra al .done y cae en .fail si detecta errores de parseo.
            //Con el post tengo yo que usar un try block para detectar errores de parseo y mandarlo a jQuery fallas
            try{
                //alert('datosJSONStr: ' + datosJSONStr);
                datosJSObj = JSON.parse(datosJSONStr);
                //alert('datosJSObj.loguea: ' + datosJSObj.loguea);
            }catch(errorParseo){
                var datosJSONStrAsXHRTexto = datosJSONStr;
                var textoEstatus = 'Error parseando la siguiente respuesta del servidor en escritos/editDuenoContrasena.php :<br> Mensaje: ' + errorParseo.message;
                var elError = errorParseo.name;
                
                //var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // first arg is not xhr Object, so no responseText member will be obtained in encodeAndGetErrorPath() at functiones.js - will produce an undefined
                //jQuery(window.location).attr('href', path);
                jQuery('ul.navega li a.look-error').data( 'xhrObjetoForFAILTexto', encodeURIComponent(datosJSONStrAsXHRTexto) );
                jQuery('ul.navega li a.look-error').data( 'textoEstatus', encodeURIComponent(textoEstatus) );
                jQuery('ul.navega li a.look-error').data( 'elError', encodeURIComponent(elError) );
                jQuery('.look-error').click();				
            }
            if(datosJSObj.cambiado){
                jQuery.feedback('form#editDuenoForm h3', 'Tu password fue cambiado.');
            }else{
                jQuery.feedback('form#editDuenoForm h3', 'Trata otra vez. No cambiamos NADA !');
            }
        })
        .fail(function(xhrObjetoForFAIL, textoEstatus, elError){
            var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
            var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
            jQuery(window.location).attr('href', path); 
        });
    }
});



//erase feedback when user writting
jQuery('form#editDuenoForm  input[name^=password]').keyup(function(){
    jQuery.feedback('form#editDuenoForm h3', '');
});



//link to crea nepe when click on button
jQuery('div#nepes :button').click(function(){
    //alert(window.location.pathname + '?look=creaNepe'); 
    jQuery(window.location).attr('href', window.location.pathname + '?look=creaNepe');
});
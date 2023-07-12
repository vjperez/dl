////////////////////////////////// //handle functions  ////////////////////////////////////////////
//erase feedback when user writting
jQuery('form#editClaveForm  input[name^=password]').keydown(function(){
    jQuery.feedback('form#editClaveForm h3.feedback', '');
    jQuery.feedback('form#editClaveForm h5.warn', '');
});

jQuery('form#editContactosForm  input[name^=red]').keydown(function(){
    jQuery.feedback('form#editContactosForm h3.feedback', '');
    jQuery.feedback('form#editContactosForm h5.warn', '');
});

//handle link to crea nepe when click on button
jQuery('form#labelTableContainerForm :button').click(function(){
    //alert(window.location.pathname + '?look=creaNepe'); 
    jQuery(window.location).attr('href', window.location.pathname + '?look=creaNepe');
});

//handle form submit;
//alert('.submit @ home...') 
var usuario = "";
jQuery('form#editClaveForm').submit(function(evento){
    evento.preventDefault(); //not making a submit (POST request) from html action.
    var user = 'valorDummy';
    var pass01 = jQuery('#passwordId').val();
    var pass02 = jQuery('#passwordConfirmId').val();
    if( jQuery.areValidUserYPass(user, pass01, pass02, 'fullFeedback', 'form#editClaveForm h3.feedback') ){
        jQuery.post('escritos/dueno/editClave.php', {pass01:pass01} )
        .done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){ 
            //el getJSON no entra al .done y cae en .fail si detecta errores de parseo.
            //Con el post tengo yo que usar un try block para detectar errores de parseo y mandarlo a jQuery fallas
            try{
                //alert('datosJSONStr: ' + datosJSONStr);
                datosJSObj = JSON.parse(datosJSONStr);
                //alert('datosJSObj.loguea: ' + datosJSObj.loguea);
            }catch(errorParseo){
                var datosJSONStrAsXHRTexto = datosJSONStr;
                var textoEstatus = 'Error parseando la siguiente respuesta del servidor desde escritos/dueno/editClave.php :<br> Mensaje: ' + errorParseo.message;
                var elError = errorParseo.name;
                
                var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError);
                jQuery(window.location).attr('href', path);			
            }
			
            if(datosJSObj.editado){
				var feedback = usuario + ' tu password fue editado.'; 
				jQuery.feedback('form#editClaveForm h3.feedback', feedback);
            }else{
				var feedback = 'Trata otra vez, ' + usuario + '.';
                jQuery.feedback('form#editClaveForm h3.feedback', feedback);
            }
        })
        .fail(function(xhrObjetoForFAIL, textoEstatus, elError){
            var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
            var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
            jQuery(window.location).attr('href', path); 
        });
    }
}); // editClaveForm submit

jQuery('form#editContactosForm').submit(function(evento){
    evento.preventDefault(); //not making a submit (POST request) from html action.
    var tel        = jQuery('form#editContactosForm  input#red1Id').val();
	var email      = jQuery('form#editContactosForm  input#red2Id').val();
    var redSocial1 = jQuery('form#editContactosForm  input#red3Id').val();
    var redSocial2 = jQuery('form#editContactosForm  input#red4Id').val();
	jQuery.post('escritos/dueno/bregaContactos.php', {tel:tel, email:email, redSocial1:redSocial1, redSocial2:redSocial2} )
	.done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){ 
		//el getJSON no entra al .done y cae en .fail si detecta errores de parseo.
		//Con el post tengo yo que usar un try block para detectar errores de parseo y mandarlo a jQuery fallas
		try{
			//alert('datosJSONStr: ' + datosJSONStr);
			datosJSObj = JSON.parse(datosJSONStr);
			//alert('datosJSObj.loguea: ' + datosJSObj.loguea);
		}catch(errorParseo){
			var datosJSONStrAsXHRTexto = datosJSONStr;
			var textoEstatus = 'Error parseando la siguiente respuesta del servidor desde escritos/dueno/editContactos.php :<br> Mensaje: ' + errorParseo.message;
			var elError = errorParseo.name;
			
			var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError);
			jQuery(window.location).attr('href', path);			
		}
		
		if(datosJSObj.editados){
			var feedback = usuario + ' tus contactos fueron editados.'; 
			jQuery.feedback('form#editContactosForm h3.feedback', feedback);
		}else if(datosJSObj.creados){
			var feedback = usuario + ' tus contactos fueron creados.'; 
			jQuery.feedback('form#editContactosForm h3.feedback', feedback);
		}else{
			var feedback = 'Trata otra vez, ' + usuario + '.';
			jQuery.feedback('form#editContactosForm h3.feedback', feedback);
		}
	})
	.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
		var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
		var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
		jQuery(window.location).attr('href', path); 
	});
    
}); // editContactosForm submit

////////////////////////////////////// handlers ///////////////////////////////////////////////////


////////////////////////////////////// ajax to populate home page /////////////////////////////////
jQuery.ajax({
	//cache: false,
	url: 'escritos/dueno/getNombre.php',
	dataType: "json"
})
.done(function(dato, estatusForDONE, xhrObjetoForDONE){
	jQuery('form#labelTableContainerForm label').html( 'Negocios de ' + dato );
	usuario = dato; // this value is also used on forms submit
})
.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
	var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
	var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
	jQuery(window.location).attr('href', path);
});


jQuery.ajax({
	//cache: false,
	url: 'escritos/dueno/getOwnNepesWithIds.php',
	dataType: "json"
})
.done(function(datos, estatusForDONE, xhrObjetoForDONE){
	//alert('datos: ' + datos);
	var elTable = "";
	jQuery.each(datos, function(index){
		elTable += '<tr><td><a class="link" href="portada.html?look=updateNepe'  
		+ '&nepeId=' + datos[index].nepeId  + '">'
		+ datos[index].nepeNombre + '</a></td></tr>';
	});	
	jQuery('form#labelTableContainerForm table').html( elTable );
})
.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
	var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
	var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
	jQuery(window.location).attr('href', path); 
});


jQuery.ajax({
	//cache: false,
	url: 'escritos/dueno/getSocials.php',
	dataType: "json"
})
.done(function(socialDatos, estatusForDONE, xhrObjetoForDONE){
	jQuery.each(socialDatos, function(index){
		if(socialDatos[index].tipo == 'tel')   jQuery('fieldset#editContactosFieldset input#red1Id').val( socialDatos[index].handle );
		if(socialDatos[index].tipo == 'email') jQuery('fieldset#editContactosFieldset input#red2Id').val( socialDatos[index].handle );
		if(socialDatos[index].tipo == 'rs1')   jQuery('fieldset#editContactosFieldset input#red3Id').val( socialDatos[index].handle );
		if(socialDatos[index].tipo == 'rs2')   jQuery('fieldset#editContactosFieldset input#red4Id').val( socialDatos[index].handle );
	});
})
.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
	var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
	var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
	jQuery(window.location).attr('href', path);
});

jQuery.hideThemSections();
jQuery('#footer').css('visibility','visible');
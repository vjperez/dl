var usuario = ""; // this value is used for feedback on forms submit
////////////////////////////////////// ajax to populate home page /////////////////////////////////
jQuery.ajax({
	//cache: false,
	url: 'escritos/dueno/getNombre.php',
	dataType: "json"
})
.done(function(dato, estatusForDONE, xhrObjetoForDONE){
	jQuery('div#labelTableContainer label').html( 'Negocios de ' + dato );
	usuario = dato;
})
.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
	 var xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
     var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
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
	jQuery('div#labelTableContainer table').html( elTable );
})
.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
	var xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
    var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
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
	var xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
    var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
    jQuery(window.location).attr('href', path);
});

jQuery.hideThemSections();



jQuery('form#editClaveForm').submit(function(evento){
    evento.preventDefault(); //not making a submit (POST request) from html action.
    var user = 'valorDummy';
    var pass01 = jQuery('#passwordId').val();
    var pass02 = jQuery('#passwordConfirmId').val();
    if( jQuery.areValidUserYPass(user, pass01, pass02, 'fullFeedback', 'form#editClaveForm h3.feedback') ){
        jQuery.post('escritos/dueno/editClave.php', {pass01:pass01} )
        .done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){ 
            try{
                datosJSObj = JSON.parse(datosJSONStr);
            }catch(errorParseo){
                var datosJSONStrAsXHRTexto = datosJSONStr;
                var textoEstatus = 'Error parseando la siguiente respuesta del servidor desde escritos/dueno/editClave.php :<br> Mensaje: ' + errorParseo.message;
                var elError = errorParseo.name;
                
                var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError);
                jQuery(window.location).attr('href', path);			
            }
            if(datosJSObj.editado){
				var feedback = 'Clave de ' + usuario + ', fue editada.'; 
				jQuery.feedback('form#editClaveForm h3.feedback', feedback);
            }else{
				var feedback = 'Trata otra vez, ' + usuario + '.';
                jQuery.feedback('form#editClaveForm h3.feedback', feedback);
            }
        })
        .fail(function(xhrObjetoForFAIL, textoEstatus, elError){
            var xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
            var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
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
		try{
			datosJSObj = JSON.parse(datosJSONStr);
		}catch(errorParseo){
			var datosJSONStrAsXHRTexto = datosJSONStr;
			var textoEstatus = 'Error parseando la siguiente respuesta del servidor desde escritos/dueno/editContactos.php :<br> Mensaje: ' + errorParseo.message;
			var elError = errorParseo.name;
			
			var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError);
			jQuery(window.location).attr('href', path);			
		}
		if(datosJSObj.actualizados){
			var feedbackStr = usuario + ', ' + datosJSObj.feedback; 
			jQuery.feedback('form#editContactosForm h3.feedback', feedbackStr);
		}
	})
	.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
		var xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
		var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
        jQuery(window.location).attr('href', path);
	});
    
}); // editContactosForm submit

//erase feedback when user writes
jQuery('form[id*=Form]  input[name^=password],  form[id*=Form]  input[name^=red]').keydown(function(){
	jQuery.feedback('form[id*=Form] h3', '');
	jQuery.feedback('form[id*=Form] h5', '');
});

//handle link to crea nepe when click on button
jQuery('div#labelTableContainer :button').click(function(){
    jQuery(window.location).attr('href', window.location.pathname + '?look=creaNepe');
});

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
     var path = jQuery.encodeAndGetErrorPath('On home.js getNombre<br>' + xhrObjetoForFAILString, textoEstatus, elError);
     jQuery(window.location).attr('href', path);
});


jQuery.ajax({
	//cache: false,
	url: 'escritos/dueno/getOwnNepesWithIds.php',
	dataType: "json"
})
.done(function(datos, estatusForDONE, xhrObjetoForDONE){
	var elTable = "";
	jQuery.each(datos, function(index){
		elTable += '<tr><td>';
		elTable += '<a class="link" href="portada.html?look=updateNepe&index=' + index + '">' + datos[index].nepeNombre + '</a>';
		elTable += '</td></tr>';
	});	
	jQuery('div#labelTableContainer table').html( elTable );
})
.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
	var xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
    var path = jQuery.encodeAndGetErrorPath('On home.js own nepes<br>' + xhrObjetoForFAILString, textoEstatus, elError);
    jQuery(window.location).attr('href', path);
});

jQuery.ajax({
	//cache: false,
	url: 'escritos/dueno/getSocials.php',
	dataType: "json"
})
.done(function(socialDatos, estatusForDONE, xhrObjetoForDONE){
	//alert(socialDatos);
	if( socialDatos[0]   ) jQuery('fieldset#editContactosFieldset input#red1Id').val( socialDatos[0]  );
	if( socialDatos[1] ) jQuery('fieldset#editContactosFieldset input#red2Id').val( socialDatos[1]);
	if( socialDatos[2]   ) jQuery('fieldset#editContactosFieldset input#red3Id').val( socialDatos[2]  );
	if( socialDatos[3]   ) jQuery('fieldset#editContactosFieldset input#red4Id').val( socialDatos[3]  );
})
.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
	var xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
    var path = jQuery.encodeAndGetErrorPath('On home.js getSocials<br>' + xhrObjetoForFAILString, textoEstatus, elError);
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
				let feedbackStr = usuario + ', tu clave fue editada.'; 
				jQuery.feedback('form#editClaveForm h3.feedback', feedbackStr, 'feedbackgreen', 'downdelayup');
            }else{
				let feedbackStr = usuario + ', trata otra vez.';
                jQuery.feedback('form#editClaveForm h3.feedback', feedbackStr, 'feedbackwarn', 'downdelayup');
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
			let feedbackStr = usuario + ', tus contactos fueron actualizados.'; 
			jQuery.feedback('form#editContactosForm h3.feedback', feedbackStr, 'feedbackgreen', 'downdelayup');
		}
	})
	.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
		var xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
		var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
        jQuery(window.location).attr('href', path);
	});
    
}); // editContactosForm submit

//erase feedback when user writes
jQuery('form[id*=Form]  input[name^=password],  form[id*=Form]  input[name^=red]').keyup(function(){
	jQuery.feedback('form[id*=Form] h3', '', '');
	jQuery.feedback('form[id*=Form] h5', '', '');

    var pass01 = jQuery('#passwordId').val();
    if( pass01.length > 0 )
        jQuery('.confirm').show();
    else
        jQuery('.confirm').hide();	
});
jQuery('.confirm').hide();

//handle link to crea nepe when click on button
jQuery('div#labelTableContainer :button').click(function(){
    jQuery(window.location).attr('href', window.location.pathname + '?look=creaNepe');
});

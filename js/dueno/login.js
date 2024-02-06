jQuery('form#loginForm').submit(function(evento){
	evento.preventDefault(); //not making a submit (POST request) from html action.
	var user = jQuery('#usernameId').val();
	var pass = jQuery('#passwordId').val();
	if( jQuery.areValidUserYPass(user, pass, pass, "genericFeedback", 'form#loginForm h3') ){
		jQuery.post('escritos/dueno/login.php', {user:user, pass:pass} )
		.done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){
			//el getJSON no entra al .done y cae en .fail si detecta errores de parseo.
			//Con el post tengo yo que usar un try block para detectar errores de parseo y mandarlo a jQuery fallas
			try{
				//alert('datosJSONStr: ' + datosJSONStr);
				datosJSObj = JSON.parse(datosJSONStr);
			}catch(errorParseo){
				var datosJSONStrAsXHRTexto = datosJSONStr;
				var textoEstatus = 'Error parseando la siguiente respuesta del server desde escritos/dueno/login.php :<br> Mensaje: ' + errorParseo.message;
				var elError = errorParseo.name;
				
				var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // first arg is not xhr Object, so no responseText member will be obtained in encodeAndGetErrorPath() at functiones.js - will produce an undefined
				jQuery(window.location).attr('href', path); 
			}
			if(datosJSObj.logueado){
				jQuery(window.location).attr('href', window.location.pathname + '?look=home');
			}else{
				jQuery.feedback('form#loginForm h3', 'Trata otra vez.');
			}
		})
		.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
			var xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
			var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
            jQuery(window.location).attr('href', path);
		});
	}
});

//erase feedback when user writes
jQuery('form[id*=Form]  input[name^=password],  form[id*=Form]  input[name=username]').keydown(function(){
	jQuery.feedback('form[id*=Form] h3', '');
});

jQuery('#footer').css('visibility','visible');
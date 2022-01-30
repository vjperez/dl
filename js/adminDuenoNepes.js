//jQuery.adminDuenoNepes = function(duenoId){	
jQuery.adminDuenoNepes = function(){
    

    //hide, show on click ; adminDuenoNepes 
	//jQuery.toggleOnClick();
	//hide them  ; adminDuenoNepes
	jQuery.hideThem();

	//erase feedback when user writting
	jQuery('form#adminDuenoForm  input').keyup(function(){
		jQuery.feedback('form#adminDuenoForm h3', '');
	});
    //erase feedback when user writting
	jQuery('form#adminNepesForm  input[type=text]').keyup(function(){
		jQuery.feedback('form#adminNepesForm h3', '');
	});
	


	//do this when form submitted ; adminNepesForm
    jQuery('form#adminNepesForm').submit(function(evento){
        evento.preventDefault(); //not making a submit (POST request) from html action.
		var userNumber = jQuery('#userNumber02Id').val();


		jQuery.getJSON('escritos/getUsername.php',  {userNumber:userNumber} )
		.done(function(dato, estatusForDONE, xhrObjetoForDONE){
			var elLabel = '<label class="">' + 'Negocios de ' + dato + '</label>'; 
			jQuery('fieldset#labelTableContainer').append(elLabel);
		})
		.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
			var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
			//var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
			//jQuery(window.location).attr('href', path); 
			jQuery('ul.navega li a.look-error').data( 'xhrObjetoForFAILTexto', encodeURIComponent(xhrObjetoForFAILTexto) );
			jQuery('ul.navega li a.look-error').data( 'textoEstatus', encodeURIComponent(textoEstatus) );
			jQuery('ul.navega li a.look-error').data( 'elError', encodeURIComponent(elError) );
			jQuery('.look-error').click();
		});


        jQuery.post('escritos/showNepesGetIds.php', {userNumber:userNumber} )
        .done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){
			try{
				//alert('datosJSONStr: ' + datosJSONStr);
				datosJSObj = JSON.parse(datosJSONStr);
				//alert('datosJSObj: ' + datosJSObj);
			}catch(errorParseo){
				var datosJSONStrAsXHRTexto = datosJSONStr;
				var textoEstatus = 'Error parseando la siguiente respuesta del servidor desde escritos/showNepesGetIds.php en adminDuenoNepes :<br> Mensaje: ' + errorParseo.message;
				var elError = errorParseo.name;
				
				var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // first arg is not xhr Object, so no responseText member will be obtained in encodeAndGetErrorPath() at functiones.js - will produce an undefined
				jQuery(window.location).attr('href', path);				
			}
            var table =  '<table class="subArea">';
			var cuantos = 0;
			jQuery.each(datosJSObj, function(index){
				cuantos++;
				table += '<tr><td><a class="" href="portada.html?look=adminDuenoNepes'
				+ '&acto=deleteNepe' +  '&nepeId=' + datosJSObj[index].nepeId + '">' 
				+ datosJSObj[index].nepeNombre + '<i class="fas fa-trash-alt"></i>' 
				+ '</a></td></tr>';	
			});
			table += '</table>';
            jQuery('fieldset#labelTableContainer').append(table);
			jQuery('fieldset#labelTableContainer').append('<p>Los ' + cuantos + ' negocios.<p/>');
        })
        .fail(function(xhrObjetoForFAIL, textoEstatus, elError){
            var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
            //var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
            //jQuery(window.location).attr('href', path); 
			jQuery('ul.navega li a.look-error').data( 'xhrObjetoForFAILTexto', encodeURIComponent(xhrObjetoForFAILTexto) );
			jQuery('ul.navega li a.look-error').data( 'textoEstatus', encodeURIComponent(textoEstatus) );
			jQuery('ul.navega li a.look-error').data( 'elError', encodeURIComponent(elError) );
			jQuery('.look-error').click();
        });


    });	
	

	

	//do this when form submitted ; adminDuenoForm
	jQuery('form#adminDuenoForm').submit(function(evento){
		evento.preventDefault(); //not making a submit (POST request) from html action.
		var user = 'valorDummy';
		var pass01 = jQuery('#passwordId').val();
		var pass02 = jQuery('#passwordConfirmId').val(); 
		if( jQuery.areValidUserYPass(user, pass01, pass02, 'fullFeedback', 'form#adminDuenoForm h3') ){
			//Valid values son los q cumplen estas 3 cosas.
			//Estas cosas se pueden chequear antes del post y evito post sin sentido
			// 1)lenght >= 4; 2)only numbers or letters; 3)both pass are equal;
			//Si tengo valores q fueron registrables entonces, Making a submit (POST request) here. Not in look=editDuenoShowEmpresas
			
			var userNumber = jQuery('#userNumberId').val();
			jQuery.post('escritos/editDuenoContrasena.php', {pass01:pass01, userNumber:userNumber} )
			.done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){
				//el getJSON no entra al .done y cae en .fail si detecta errores de parseo.
				//Con el post tengo yo que usar un try block para detectar errores de parseo y mandarlo a jQuery fallas
				try{
					//alert('datosJSONStr: ' + datosJSONStr);
					datosJSObj = JSON.parse(datosJSONStr);
					//alert('datosJSObj.loguea: ' + datosJSObj.loguea);
				}catch(errorParseo){
					var datosJSONStrAsXHRTexto = datosJSONStr;
					var textoEstatus = 'Error parseando la siguiente respuesta del servidor desde escritos/editDuenoContrasena.php en adminDuenoNepes :<br> Mensaje: ' + errorParseo.message;
					var elError = errorParseo.name;
					
					var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // first arg is not xhr Object, so no responseText member will be obtained in encodeAndGetErrorPath() at functiones.js - will produce an undefined
					jQuery(window.location).attr('href', path);				
				}
				if(datosJSObj.cambiado){
					jQuery.getJSON('escritos/getUsername.php',  {userNumber:userNumber} )
					.done(function(dato, estatusForDONE, xhrObjetoForDONE){
						var feedback = 'Password de ' + dato + ' fue cambiado.'; 
						jQuery.feedback('form#adminDuenoForm h3', feedback);
					})
					.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
						var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
						//var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
						//jQuery(window.location).attr('href', path); 
						jQuery('ul.navega li a.look-error').data( 'xhrObjetoForFAILTexto', encodeURIComponent(xhrObjetoForFAILTexto) );
						jQuery('ul.navega li a.look-error').data( 'textoEstatus', encodeURIComponent(textoEstatus) );
						jQuery('ul.navega li a.look-error').data( 'elError', encodeURIComponent(elError) );
						jQuery('.look-error').click();
					});
				}else{
					jQuery.feedback('form#adminDuenoForm h3', 'Trata otra vez. Pass VALIDO, pero, NO cambiamos NADA !');
				}
			})
			.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
				var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
				//var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
				//jQuery(window.location).attr('href', path); 
				jQuery('ul.navega li a.look-error').data( 'xhrObjetoForFAILTexto', encodeURIComponent(xhrObjetoForFAILTexto) );
				jQuery('ul.navega li a.look-error').data( 'textoEstatus', encodeURIComponent(textoEstatus) );
				jQuery('ul.navega li a.look-error').data( 'elError', encodeURIComponent(elError) );
				jQuery('.look-error').click();
			});
		}
	});	
	
	
}
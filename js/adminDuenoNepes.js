//jQuery.adminDuenoNepes = function(duenoId){	
jQuery.adminDuenoNepes = function(){
    

    //hide, show on click ; adminDuenoNepes 
	jQuery.toggleOnClick();
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
	
	jQuery('div#nepes :button').click(function(){
		//alert(window.location.pathname + '?look=creaNepe'); 
		//jQuery(window.location).attr('href', window.location.pathname + '?look=creaNepe');
	});



	//do this when form submitted ; adminNepesForm
    jQuery('form#adminNepesForm').submit(function(evento){
        evento.preventDefault(); //not making a submit (POST request) from html action.
        jQuery.post('escritos/getHisNepes.php', {llave:llave} )
        .done(function(datos, estatusForDONE, xhrObjetoForDONE){
            var labelTable = '<label class="">Tus Negocios:</label>';
            labelTable   +=  '<table class="subArea">';
                jQuery.each(datos, function(index){
                //labelTable += '<tr><td><a class="link" href="portada.html?look=updateNepe'  +  '&duenoId=' + datos.duenoId 
                    labelTable += '<tr><td><a class="link" href="portada.html?look=updateNepe'
                    +  '&nepeId=' + datos[index].nepeId  + '">' + datos[index].nepeNombre + '</a></td></tr>';
                });
                
            //labelTable += '<tr><td><a class="link" href="portada.html?look=creaNepe'  +  '&duenoId=' datos.duenoId + '">' + 'Crea Nuevo NePe' + '</a></td></tr>';
            
                labelTable += '</table>';
                
            jQuery('fieldset#labelTableContainer').prepend(labelTable);
        })
        .fail(function(xhrObjetoForFAIL, textoEstatus, elError){
            var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
            var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
            jQuery(window.location).attr('href', path); 
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
					var textoEstatus = 'Error parseando la siguiente respuesta del servidor en escritos/editDuenoContrasena.php :<br> Mensaje: ' + errorParseo.message;
					var elError = errorParseo.name;
					
					var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // first arg is not xhr Object, so no responseText member will be obtained in encodeAndGetErrorPath() at functiones.js - will produce an undefined
					jQuery(window.location).attr('href', path);				
				}
				if(datosJSObj.cambiado){
					jQuery.feedback('form#adminDuenoForm h3', 'Tu password fue cambiado.');
				}else{
					jQuery.feedback('form#adminDuenoForm h3', 'Trata otra vez. No cambiamos NADA !');
				}
			})
			.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
				var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
				var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
				jQuery(window.location).attr('href', path); 
			});
		}
	});	
	
	
}
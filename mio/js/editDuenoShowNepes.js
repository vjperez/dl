jQuery.editDuenoShowNepes = function(duenoId){	

	//do this when form submitted ; editDuenoShowNepes task 1
	jQuery('form#editDuenoDataForm').submit(function(evento){
		evento.preventDefault(); //not making a submit (POST request) from html action.
		var user = 'valorDummy';
		var pass01 = jQuery('#passwordId').val();
		var pass02 = jQuery('#passwordConfirmId').val();
		if( jQuery.areValidUserYPass(user, pass01, pass02, 'fullFeedback', 'form#editDuenoDataForm h3') ){
			//Valid values son los q cumplen estas 3 cosas.
			//Estas cosas se pueden chequear antes del post y evito post sin sentido
			// 1)lenght >= 4; 2)only numbers or letters; 3)both pass are equal;
			//Si tengo valores q fueron registrables entonces, Making a submit (POST request) here. Not in look=editDuenoShowEmpresas
			jQuery.post('escritos/editDuenoContrasena.php', {duenoId:duenoId, pass01:pass01} )
			.done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){
				//el getJSON no entra al .done y cae en .fail si detecta errores de parseo.
				//Con el post tengo yo que usar un try block para detectar errores de parseo y mandarlo a jQuery fallas
				try{
					//alert('datosJSONStr: ' + datosJSONStr);
					datosJSObj = JSON.parse(datosJSONStr);
					//alert('datosJSObj.loguea: ' + datosJSObj.loguea);
				}catch(errorParseo){
					jQuery.fallas(new Object(), 'Error parsing la siguiente respuesta del server en escritos/editDuenoContrasena.php<br>' + errorParseo.name + ' : ' + errorParseo.message, datosJSONStr);
				}
				if(datosJSObj.cambiado){
					jQuery.feedback('form#editDuenoDataForm h3', 'Tu contrasena fue cambiada.');
				}else{
					jQuery.feedback('form#editDuenoDataForm h3', 'Trata otra vez. No cambiamos NADA !');
				}
			})
			.fail(  jQuery.fallas  );//fail
		}
	});

	//show empresas ; editDuenoShowNepes task 2
	jQuery.getJSON('escritos/showNepesGetIds.php', {duenoId:duenoId} )
	.done(function(datos, estatusForDONE, xhrObjetoForDONE){
		var labelAndTable = '<label class="notHidable">Tus NePes:</label>';
		labelAndTable   +=  '<table class="hidaxxxble">';
			jQuery.each(datos, function(index, meId, nombre){
				labelAndTable += '<tr><td><a class="link" href="portada.html?look=updateMicroEmpre&meId=' + datos[index].nepeId + '&duenoId=' + duenoId + '">' + datos[index].nepeNombre + '</a></td></tr>';
			});
			labelAndTable += '<tr><td><a class="link" href="portada.html?look=createMicroEmpre&duenoId=' + duenoId + '">' + 'Crea NePe' + '</a></td></tr>';
			labelAndTable += '</table>';
		jQuery('#labelAndTableContainer').html(labelAndTable);
	})
	.fail(  jQuery.fallas  );//fail
	
	
	//hide, show on click ; editDuenoShowNepes task 3
	jQuery.toggleOnClick();
	
}
jQuery.getJSON('escritos/nepe/read/getRecentNepes.php')
.done(function(datos, estatusForDONE, xhrObjetoForDONE){
	var tableRows = '';
	jQuery.each(datos, function(index){
			tableRows += '<tr class="texto"><td>' 
			+ '<a class="" href="portada.html?look=profile'
			+  '&nepeId=' + datos[index].nepeId  + '">' 
			+ datos[index].nepeNombre + '   <span class="diasOld">[' +  datos[index].dias  +  ' dias]</span>'
			+'</a>' 
			+ '</td></tr>'; 

			tableRows +=  '<tr class="foto"><td>' 
			+ '<a class="" href="portada.html?look=profile'
			+  '&nepeId=' + datos[index].nepeId  + '">' 
			+ '<img class="" src="imagenes/profile/subidas/' + datos[index].nepeFotoName + '">'
			+ '</a>' 
			+ '</td></tr>'; 
			tableRows += '<tr><td></td></tr><tr><td></td></tr>';
	});
	jQuery('#labelAndTableContainer table').html(tableRows);
})
.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
	var xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
	var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
	jQuery(window.location).attr('href', path); 
});
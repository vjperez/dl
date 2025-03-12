jQuery.getJSON('escritos/nepe/read/getRecentNepes.php')
.done(function(datos, estatusForDONE, xhrObjetoForDONE){
	var tableRows = '';
	jQuery.each(datos, function(index){
		let link = '"portada.html?look=viewNepe&nepeId=' + datos[index].nepeId  + '"';
		tableRows += '<tr class="texto"><td>' 
		+ '<a href=' + link + '>' 
		+ datos[index].nepeNombre + '</a>   <span class="diasOld">['  +   datos[index].dias  +  ' dia'  + 
		( (datos[index].dias == 1)? '' : 's' )  +  ']</span>'
		+ '</td></tr>'; 

		tableRows +=  '<tr class="foto"><td>' 
		+ '<a href=' + link + '>' 
		+ '<img src="imagenes/nepe/subidas/' + datos[index].nepeFotoName + '">'
		+ '</a>' 
		+ '</td></tr>'; 
		tableRows += '<tr><td></td></tr><tr><td></td></tr>';
	});
	jQuery('#labelAndTableContainer table').html(tableRows);
})
.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
	/*
	var xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
	var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
	jQuery(window.location).attr('href', path); 
	*/
	var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
	var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
	jQuery(window.location).attr('href', path);

});
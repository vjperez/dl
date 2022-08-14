jQuery.getRecentNepes = function(){	
    
    // task 1
	jQuery.getJSON('escritos/getRecentNepes.php')
	.done(function(datos, estatusForDONE, xhrObjetoForDONE){
		var tableRows = '';
		jQuery.each(datos, function(index){
				tableRows += '<tr><td>' 
				+ '<a class="" href="portada.html?look=profile'
				+  '&nepeId=' + datos[index].nepeId  + '">' + datos[index].nepeNombre + '   (' +  datos[index].dias  +  ' dias)' 
				+ '</a></td></tr>';
		});
		
		jQuery('#labelAndTableContainer table').html(tableRows);
		jQuery('#footer').css('visibility','visible');
	})
	.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
		var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
		var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
		jQuery(window.location).attr('href', path); 
	});
		
}
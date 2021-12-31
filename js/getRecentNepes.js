jQuery.getRecentNepes = function(){	
    
    // task 1
	jQuery.getJSON('escritos/getRecentNepes.php')
	.done(function(datos, estatusForDONE, xhrObjetoForDONE){
		var labelAndTable = '<label class="">Negocios Recientes:</label>';
		labelAndTable   +=  '<table class="">';
		jQuery.each(datos, function(index){
				labelAndTable += '<tr><td>' 
				+ '<a class="link" href="portada.html?look=profile'
				+  '&nepeId=' + datos[index].nepeId  + '">' + datos[index].nepeNombre + '   (' +  datos[index].dias  +  ' dias)' 
				+ '</a></td></tr>';
		});
		labelAndTable += '</table>';
		jQuery('#labelAndTableContainer').html(labelAndTable);
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
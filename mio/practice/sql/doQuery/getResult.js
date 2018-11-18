jQuery(document).ready(function(){
	
	jQuery('form#formaQuery').submit(function(evento){
		evento.preventDefault(); //not making a submit (GET request) here.
		var query = jQuery('input[name=query]').val(); 
		
		alert('query: ' + query + '  Length: ' + query.length);
		if(query.length > 0){
		
				jQuery.getJSON('queries.php', {query:query} )
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){
					alert('datos: automatically parsed to object object by getJSON: ' + datos + '\nxhrObjetoForDONE status ' + xhrObjetoForDONE.status + '\nxhrObjetoForDONE statustext ' + xhrObjetoForDONE.statusText + '\nestatusForDONE ' + estatusForDONE );
					var losLis = '';
					jQuery.each(datos, function(indice, fila){
						if(indice==0){// here fila contains just a number
							jQuery('div#result h5').text(fila + ' num rows, ');
						}else if(indice==1){// here fila contains just a number
							jQuery('div#result h5').append(fila + ' affected rows');
						}else{// here fila contains an array
							losLis += '<li>';
							jQuery.each(fila, function(columna){
								losLis += '<span class="colorenfasis">' + fila[columna] + '</span>';
							});
							losLis += '</li>';
						}
					});
					jQuery('#containerForResult').html(losLis);
				})
				.fail(function(xhrObjetoForFAIL, estatusForFAIL, errorMessageSentByServer){ //learn about error handling; 2 possible type of errors here
					var losLis = '<li>even a <span class="colorenfasis">server</span> makes errors.</li>';
					losLis += '<li>' + estatusForFAIL + '</li>';
					losLis += '<li>' + errorMessageSentByServer + '</li>';
					losLis += '<li>' + xhrObjetoForFAIL.responseText + '</li>';
					jQuery('#containerForResult').html(losLis);
				});		

		
		}else{
			jQuery('form#formaQuery h3').text('en serio? query vacio! ...').slideDown(500).delay(1000).slideUp(2000);
		}
	});	
	
});
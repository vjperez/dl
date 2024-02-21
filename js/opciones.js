let que   = decodeURIComponent( jQuery.urlParametro('que') );      
let donde = decodeURIComponent( jQuery.urlParametro('donde') );  
jQuery.getJSON('escritos/ojo/getOpciones.php', {que:que, donde:donde} )
.done(function(datos, estatusForDONE, xhrObjetoForDONE){
	if(datos.cuantasOpciones > 0){
		//alert('datos: automatically parsed to object object por getJSON = ' + datos + '\nxhrObjetoForDONE.status = ' + xhrObjetoForDONE.status + '\nxhrObjetoForDONE.statustext = ' + xhrObjetoForDONE.statusText + '\nestatusForDONE = ' + estatusForDONE );
		var htmlForMain = '';
		jQuery.each(datos.opciones, function(buscaMode, trios){
				htmlForMain += '<div id="opcionesdiv" class="opcionesfotos ">';
				if(buscaMode.indexOf("buscaBoth") > -1){
					htmlForMain += '<h2 class="notHidable">'  + que + ' + ' + donde + '</h2>';
				}else if (buscaMode.indexOf("buscaQue") > -1){
					htmlForMain += '<h2 class="notHidable">'  + que + '</h2>';
				}else if (buscaMode.indexOf("buscaDonde") > -1){
					htmlForMain += '<h2 class="notHidable">'  + donde + '</h2>';
				}
				jQuery.each(trios, function(index, pares){
					jQuery.each(pares, function(nepeId, fotoSrc){
						htmlForMain += '<a href="portada.html?look=profile&nepeId=' + nepeId + '">';
						htmlForMain += '<img class="" src="imagenes/profile/subidas/' + fotoSrc + '">'; 
						htmlForMain += '</a>';
					});
				}); // each in trios
				htmlForMain += '</div>'; // <div class="ver-borde opcionesfotos">
		}); // each in datos
		jQuery('#main').html(htmlForMain);
	}else{
		jQuery(window.location).attr('href', window.location.pathname + '?look=nada');  
	}
})
.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
	var xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
	var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
	jQuery(window.location).attr('href', path); 
});
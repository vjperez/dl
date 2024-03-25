let que   = decodeURIComponent( jQuery.urlParametro('que') );      
let donde = decodeURIComponent( jQuery.urlParametro('donde') ); 
//alert('[' + que + '][' + donde + ']');
jQuery.getJSON('escritos/nepe/read/getOpciones.php', {que:que, donde:donde} )
.done(function(datos, estatusForDONE, xhrObjetoForDONE){
	if(datos.length > 0){
		//alert('datos: automatically parsed to object object por getJSON = ' + datos + '\nxhrObjetoForDONE.status = ' + xhrObjetoForDONE.status + '\nxhrObjetoForDONE.statustext = ' + xhrObjetoForDONE.statusText + '\nestatusForDONE = ' + estatusForDONE );
		var htmlForMain = '';
		jQuery.each(datos, function(index){
			alert( datos[index].nepeId );
			htmlForMain += '<div id="opcionesdiv" class="opcionesfotos ">';


			buscaMode = datos[index].buscaMode;
			if(buscaMode.indexOf("buscaBoth") > -1){
				htmlForMain += '<h2 class="notHidable">'  + que + ' + ' + donde + '</h2>';
			}else if (buscaMode.indexOf("buscaQue") > -1){
				htmlForMain += '<h2 class="notHidable">'  + que + '</h2>';
			}else if (buscaMode.indexOf("buscaDonde") > -1){
				htmlForMain += '<h2 class="notHidable">'  + donde + '</h2>';
			}
			nepeId =  datos[index].nepeId;
			fotoUrl = datos[index].fotoUrl;
			htmlForMain += '<a href="portada.html?look=viewNepe&nepeId=' + nepeId + '">';
			htmlForMain += '<img class="" src="imagenes/nepe/subidas/' + fotoUrl + '">'; 
			htmlForMain += '</a>';
			
			
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
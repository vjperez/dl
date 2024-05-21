let que   = decodeURIComponent( jQuery.urlParametro('que') );      
let donde = decodeURIComponent( jQuery.urlParametro('donde') ); 
//alert('[' + que + '][' + donde + ']');
jQuery.getJSON('escritos/nepe/read/getOpciones.php', {que:que, donde:donde} )
.done(function(datos, estatusForDONE, xhrObjetoForDONE){
	if(datos.length > 0){
		//alert('datos: automatically parsed to object object por getJSON = ' + datos + '\nxhrObjetoForDONE.status = ' + xhrObjetoForDONE.status + '\nxhrObjetoForDONE.statustext = ' + xhrObjetoForDONE.statusText + '\nestatusForDONE = ' + estatusForDONE );
		var htmlForMain = '';
		jQuery.each(datos, function(index){
			queDondeTag   = datos[index].queDondeTag;
			ranqueoDeNepe = datos[index].ranqueoDeNepe;
			nepeId =  datos[index].nepeId;
			fotoUrl = datos[index].fotoUrl;

			//alert( datos[index].nepeId );
			htmlForMain += '<div id="opcionesdiv" class="opcionesfotos ">';

			htmlForMain += '<fieldset class="notHidable"><label>'  + queDondeTag  + '</label></fieldset>' + '<h5>[' + ranqueoDeNepe + ']</h5>';
			//htmlForMain += '<fieldset class="notHidable"><label>'  + queDondeTag  + '</label></fieldset>';
			
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
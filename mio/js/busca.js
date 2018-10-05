jQuery(document).ready(
	function(){			
		jQuery.get('busca.html', function(datosDeRespuesta, estatus, xhrObjeto){
			jQuery('#main').removeClass('margen');
			var mainDeBusca = jQuery(datosDeRespuesta).filter('#main');
			jQuery('#main').html(mainDeBusca);
		});
	}
);
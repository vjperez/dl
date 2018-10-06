jQuery(document).ready(
	function(){
		//extracs parameters from the url
		jQuery.urlParam = function(name){
			var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
			if(results == null) return null;
			else return results[1];
			//return results[1] || 0;
		}

		var look = jQuery.urlParam('look');
		switch(look) {
			//you can join the null case and busca case together, should avoid requesting portada.html
			//twice when there is NO look parameter 
			case null:
				jQuery(window.location).attr('href', window.location.href + '?look=busca');
			break;
			case 'busca':
				jQuery.get('busca.html', function(datosDeRespuesta, estatus, xhrObjeto){
					//console.log(jQuery(datosDeRespuesta));
					var mainDeBusca = jQuery(datosDeRespuesta).filter('#main');
					//console.log(mainDeBusca);
					jQuery('#containerForMain').html(mainDeBusca);
				});
				jQuery('#navBusca').hide();
			break;
			case 'faq':
				jQuery.get('faq.html', function(datosDeRespuesta, estatus, xhrObjeto){
					//console.log(jQuery(datosDeRespuesta));
					var mainDeFaq = jQuery(datosDeRespuesta).filter('#main');
					//console.log(mainDeFaq);
					jQuery('#containerForMain').html(mainDeFaq);
				});	
				jQuery(document).ajaxComplete(function(evento, xhrObjeto, opciones){
					//alert('opciones.url ' + opciones.url + '\nxhrObjeto status ' + xhrObjeto.status + '\nxhrObjeto statustext ' + xhrObjeto.statusText);
					//essentially this IF is the js/hidable.js file
					if(opciones.url === 'faq.html'){ // === means true without type coersion - the type and value most both be equal
						var $todosLosNotHidable = jQuery('.notHidable');
						var $todosLosHidable = jQuery('.hidable');
						
						$todosLosHidable.hide();

						$todosLosNotHidable.on('click', function(evento){
							var $toToggle = jQuery(evento.currentTarget).children('.hidable');
							$toToggle.toggle();
						});
					}						
				});					
			break;			
		}//switch
		
		
	}//function
);



/*
var pathname = window.location.pathname; // Returns path only
var url      = window.location.href;     // Returns full URL
var origin   = window.location.origin;   // Returns base URL
*/
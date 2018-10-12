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
			//twice when there is NO look parameter (null)
			case null:
				//jQuery(window.location).attr('href', window.location.pathname + '?look=busca');
			break;
			case 'busca':
				jQuery.get('looks/busca.html', function(datosDeRespuesta, estatus, xhrObjeto){
					//console.log(jQuery(datosDeRespuesta));
					var mainDeBusca = jQuery(datosDeRespuesta).filter('#main');
					//console.log(mainDeBusca);
					jQuery('#containerForMain').html(mainDeBusca);
				});
				jQuery('#navBusca').hide();
				jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
					//alert('settingsObjeto.url ' + settingsObjeto.url + '\nxhrObjeto status ' + xhrObjeto.status + '\nxhrObjeto statustext ' + xhrObjeto.statusText);
					//This code runs when get isCompleted and IF the get was requesting busca.html
					if(settingsObjeto.url === 'looks/busca.html'){ // === means true without type coersion - the type and value most both be equal
						jQuery('form').submit(function(evento){
							evento.preventDefault(); //not making a submit (GET request) here. Let do it at look=opciones
							var que = jQuery('#queId').val();
							var donde = jQuery('#dondeId').val(); 
							//alert(que + ' ' + que.length + '\n' + donde + ' ' + donde.length);
							if(que.length > 0 || donde.length > 0){
								jQuery(window.location).attr('href', window.location.pathname + '?look=opciones&que=' + que + '&donde=' + donde);
							}else{
								jQuery('form#queDondeForm h3').text('Buscas algo? ...').slideDown(500).delay(1000).slideUp(2000);
							}
						});
					}						
				});	
			break;
			case 'faq':
				jQuery.get('looks/faq.html', function(datosDeRespuesta, estatus, xhrObjeto){
					var mainDeFaq = jQuery(datosDeRespuesta).filter('#main');
					jQuery('#containerForMain').html(mainDeFaq);
				});	
				jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
					//alert('settingsObjeto.url ' + settingsObjeto.url + '\nxhrObjeto status ' + xhrObjeto.status + '\nxhrObjeto statustext ' + xhrObjeto.statusText);
					//This code runs when get isCompleted and IF the get was requesting faq.html
					if(settingsObjeto.url === 'looks/faq.html'){ // === means true without type coersion - the type and value most both be equal
						var $todosLosNotHidable = jQuery('.notHidable');
						var $todosLosHidable = jQuery('.hidable');	
						$todosLosHidable.hide();
						$todosLosNotHidable.click(function(evento){
							var $toToggle = jQuery(evento.currentTarget).children('.hidable');
							$toToggle.toggle();
						});
					}						
				});					
			break;
			case 'opciones':
				var que = jQuery.urlParam('que');
				var donde = jQuery.urlParam('donde');
				jQuery.getJSON('uiTests/show15RandomOptionsTest.php', {que:que, donde:donde} )
				.done(function(datos){
					var mainDeOpciones = '<div id="main" class="contenido margen"><div id="opcionesfotos" class="ver-borde">';
					jQuery.each(datos, function(fotoSrc, id){
						mainDeOpciones += '<a href="portada.html?look=profile&id=' + id + '"><img class="ancho-sensi-cell-1de2 ancho-sensi-ipad-1de4 ver-borde" src="';
						mainDeOpciones += fotoSrc + '"></a>';
					});
					mainDeOpciones += '</div></div>';
					jQuery('#containerForMain').html(mainDeOpciones);
				})
				.fail(function(xhrObjetoForFAIL, estatusForFAIL, errorMessageSentByServer){ //learn about error handling; 2 diferent type of errors here
					jQuery.get('looks/error.html', function(datosDeRespuesta, estatus, xhrObjeto){
						var mainDeError = jQuery(datosDeRespuesta).filter('#main');
						jQuery('#containerForMain').html(mainDeError);
					});					
				});		
			break;
			default :
					jQuery.get('looks/default.html', function(datosDeRespuesta, estatus, xhrObjeto){
						var mainDeDefault = jQuery(datosDeRespuesta).filter('#main');
						jQuery('#containerForMain').html(mainDeDefault);
					});
			break;
		}//switch
		
		
	}); // ready function and statement



/*
var pathname = window.location.pathname; // Returns path only- http://localhost/WebDevelopmentStuff/mio/portada.html - saca parametros viejos
var url      = window.location.href;     // Returns full URL - http://localhost/WebDevelopmentStuff/mio/portada.html - deja parametros viejos
var origin   = window.location.origin;   // Returns base URL - localhost/
*/
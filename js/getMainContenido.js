jQuery(document).ready(function(){

		var acto = jQuery.urlParametro('acto');
		switch(acto){
			case 'logout':
				jQuery.logout();
			break;
			case 'deleteNepe':
				var nepeId = jQuery.urlParametro('nepeId');
				
				jQuery.getJSON('escritos/deleteNepe.php', {nepeId:nepeId})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
					if(datos.nepeBorrado)  {  }
					else             {   }
				})
				.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
					var xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
					var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
					jQuery(window.location).attr('href', path);
				});				
			break;
			case 'deleteHerNepes':
				var userId = jQuery.urlParametro('userId');
				
				jQuery.getJSON('escritos/deleteHerNepes.php', {userId:userId})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
					if(datos.nepesBorrados > 0)  {  }
					else             {   }
				})
				.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
					var xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
					var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
					jQuery(window.location).attr('href', path);
				});				
			break;
			case null:
			default :
			break;
		}

		var look = jQuery.urlParametro('look');
		switch(look) {
			case 'busca':	
				jQuery.lookYelScript('looks/busca.html', 'js/busca.js');
			break;
			case 'opciones':
				jQuery.lookYelScript('looks/opciones.html', 'js/opciones.js');
			break;
			case 'viewNepe':
				jQuery.lookYelScript('looks/viewNepe.html', 'js/nepe/viewNepe.js');
			break;						
			case 'login':
				jQuery.lookYelScript('looks/login.html', 'js/dueno/login.js');
				//jQuery(window.location).attr('href', window.location.pathname + '?look=home');		
			break;
			case 'home':
				jQuery.lookYelScript('looks/home.html', 'js/dueno/home.js');
				//error when solicita home sin estar logueado, se supone ni pueda
			break;			
			case 'creaNepe':
				jQuery.lookYelScript('looks/creaNepe.html', 'js/nepe/creaNepe.js');		
			break;
			case 'updateNepe':

				var key = 'dueno_id';
				jQuery.getJSON('escritos/session/isSessionSet.php', {key:key})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
					if(datos.isSet){
						jQuery('#navLogin').hide();  jQuery('#navSignup').hide();
						jQuery('#navHome').addClass("seleccionado");
						jQuery('ul.navega').css('visibility','visible');
						
						key = 'own_nepes';
						jQuery.getJSON('escritos/session/isSessionSet.php', {key:key})
						.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
							//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
							if(datos.isSet){  
								key = 'own_nepes';
								jQuery.getJSON('escritos/session/getSessionValue.php', {key:key})
								.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
									//alert('key: ' + key + '\ndatos: ' + datos);
									var nepeId = jQuery.urlParametro('nepeId');
									if( jQuery.isNepeIdOnOwnNepesSession(datos, nepeId) ){
										jQuery.getJSON('escritos/ojo/getNepe.php', {nepeId:nepeId} )
										.done(function(datos, estatusForDONE, xhrObjetoForDONE){
											jQuery.dameLook('looks/updateNepe.html');
											jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
												if(settingsObjeto.url === 'looks/updateNepe.html'){	
													jQuery.hideThemSections();										
													jQuery.populateUpdateNepeForm(datos);
													jQuery('#footer').css('visibility','visible');
													jQuery.handleUpdateNepeSubmit(nepeId);
													//submit event listener and handler
												}//if
											});//ajaxComplete
										})
										.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
											var xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
											var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
											jQuery(window.location).attr('href', path); 
										});
									}else{
										var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
										var textoEstatus = 'Error, usuario solicito editar nepe q no es de el.';
										var elError = 'Error humano.';
										
										var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
										jQuery(window.location).attr('href', path);								
									}
								})
								.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
									var xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
									var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
									jQuery(window.location).attr('href', path); 
								});
							}else{  
								var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
								var textoEstatus = 'Error, usuario esta logueado pero sin own_nepes seteado. (for whatever reason)';
								var elError = 'Error humano.';
								
								var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
								jQuery(window.location).attr('href', path);	
							}
						})
						.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
							var xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
							var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
							jQuery(window.location).attr('href', path); 
						});
					}else{  
						var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
						var textoEstatus = 'Error, usuario solicito updateNepe look, sin estar logueado.';
						var elError = 'Error humano.';

						var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
						jQuery(window.location).attr('href', path);	
					}
				})
				.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
					var xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
					var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
					jQuery(window.location).attr('href', path); 
				});
			break;			
			case 'registro':
				jQuery.lookYelScript('looks/registro.html', 'js/dueno/registro.js');
				//jQuery(window.location).attr('href', window.location.pathname + '?look=home');
			case 'recentNepes':
				var key = 'dueno_id';
				jQuery.getJSON('escritos/session/isSessionSet.php', {key:key})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
					if(datos.isSet)  { jQuery('#navLogin').hide();   jQuery('#navSignup').hide(); }
					else             { jQuery('#navLogout').hide();  jQuery('#navHome').hide();   }
					jQuery('ul.navega').css('visibility','visible');

					jQuery.lookYelScript('looks/recentNepes.html');
				})
				.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
					var xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
					var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
					jQuery(window.location).attr('href', path); 
				});
			break;			
			case 'administrar':
				var key = 'dueno_id';
				jQuery.getJSON('escritos/session/isSessionSet.php', {key:key})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
					if(datos.isSet){ 
						jQuery('#navLogin').hide();  jQuery('#navSignup').hide();
						jQuery('#navHome').addClass("seleccionado");
						jQuery('ul.navega').css('visibility','visible');

						jQuery.dameLook('looks/administrar.html');

						//once look is in, use jQuery to update look with profile values
						jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
							if(settingsObjeto.url === 'looks/administrar.html'){
								jQuery.hideThemSections();
								jQuery('#footer').css('visibility','visible');
							}//if
						});//ajaxComplete
					}else{	
						var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
						var textoEstatus = 'Error, usuario solicito admin look, sin estar logueado.';
						var elError = 'Error humano.';

						var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
						jQuery(window.location).attr('href', path);	
					}
				})
				.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
					var xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
					var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
					jQuery(window.location).attr('href', path); 
				});
			break;		
			case 'faq':
				jQuery('#navFaq').addClass("seleccionado");
				var key = 'dueno_id';
				jQuery.getJSON('escritos/session/isSessionSet.php', {key:key})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
					if(datos.isSet)  { jQuery('#navLogin').hide();   jQuery('#navSignup').hide(); }
					else             { jQuery('#navLogout').hide();  jQuery('#navHome').hide();   }
					jQuery('ul.navega').css('visibility','visible');	

					jQuery.dameLook('looks/faq.html');
				})
				.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
					var xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
					var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
					jQuery(window.location).attr('href', path); 
				});

				jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
					//alert('settingsObjeto.url ' + settingsObjeto.url + '\nxhrObjeto status ' + xhrObjeto.status + '\nxhrObjeto statustext ' + xhrObjeto.statusText);
					//This code runs when get isCompleted and IF the get was requesting faq.html
					if(settingsObjeto.url === 'looks/faq.html'){ // === means true without type coersion - the type and value most both be equal
						jQuery.hideThemSections();
						jQuery('#footer').css('visibility','visible');
					}
				});
			break;
			case 'nada':
				var key = 'dueno_id';
				jQuery.getJSON('escritos/session/isSessionSet.php', {key:key})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
					if(datos.isSet)  { jQuery('#navLogin').hide();   jQuery('#navSignup').hide(); }
					else             { jQuery('#navLogout').hide();  jQuery('#navHome').hide();   }
					jQuery('ul.navega').css('visibility','visible');

					jQuery.dameLook('looks/nada.html');
				})
				.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
					var xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
					var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
					jQuery(window.location).attr('href', path); 
				});

				break;				
			case 'error':
				var key = 'dueno_id';
				jQuery.getJSON('escritos/session/isSessionSet.php', {key:key})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
					if(datos.isSet)  { jQuery('#navLogin').hide();   jQuery('#navSignup').hide(); }
					else             { jQuery('#navLogout').hide();  jQuery('#navHome').hide();   }
					jQuery('ul.navega').css('visibility','visible');
				
					jQuery.lookYelScript('looks/error.html', 'js/error.js');
				});
				/*
				if(DEBUGUEO){
					var xhrObjetoForFAILString = decodeURIComponent (jQuery.urlParametro('xhrObjetoForFAILString'));
					var textoEstatus           = decodeURIComponent (jQuery.urlParametro('textoEstatus'));
					var elError                = decodeURIComponent (jQuery.urlParametro('elError'));
					
					
					jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
						//alert('settingsObjeto.url ' + settingsObjeto.url + '\nxhrObjeto status ' + xhrObjeto.status + '\nxhrObjeto statustext ' + xhrObjeto.statusText);
						//This code runs when get isCompleted and IF the get was requesting error.html
						if(settingsObjeto.url === 'looks/error.html'){ // === means true without type coersion - the type and value most both be equal
							//when ajax complete ; 
							jQuery.appendDebugErrors( xhrObjetoForFAILString, textoEstatus, elError );  
							jQuery('#footer').css('visibility','visible');
						}//if
					}); //ajax complete
					
				}else{
					jQuery('#footer').css('visibility','visible');
				}
				*/
				break;

			case null:
			default:
				jQuery(window.location).attr('href', window.location.pathname + '?look=recentNepes');
				break;
		}//switch	

}); // ready function and statement
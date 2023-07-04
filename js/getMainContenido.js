jQuery(document).ready(
	function(){

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
					var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
					var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
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
					var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
					var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
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
				jQuery('#navBusca').addClass("activo");
				var key = 'dueno_id';
				jQuery.getJSON('escritos/session/isSessionSet.php', {key:key})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
					if(datos.isSet)  { jQuery('#navLogin').hide();   jQuery('#navSignup').hide(); }
					else             { jQuery('#navLogout').hide();  jQuery('#navHome').hide();   }
					jQuery('ul.navega').css('visibility','visible');
					jQuery.dameLook('looks/busca.html');
				})
				.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
					var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
					var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
					jQuery(window.location).attr('href', path); 
				});

				/*
					jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
						if(settingsObjeto.url === 'looks/busca.html'){ // === means true without type coersion - the type and value most both be equal
							//jQuery.handleSubmit();
						} // if busca
					}); //ajax
				*/
			break;
			case 'opciones':
				var key = 'dueno_id';
				jQuery.getJSON('escritos/session/isSessionSet.php', {key:key})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
					if(datos.isSet)  { jQuery('#navLogin').hide();   jQuery('#navSignup').hide(); }
					else             { jQuery('#navLogout').hide();  jQuery('#navHome').hide();   }
					jQuery('ul.navega').css('visibility','visible');
				})
				.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
					var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
					var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
					jQuery(window.location).attr('href', path); 
				});
			//This look completely depends on the amount of options to be presented.  It doesn't make
			//much sense to do a GET request for html, like other looks.  It is better to build mainDeOpciones
			//concatenating strings inside an each loop, with the requested JSON datos.
				var que = decodeURIComponent( jQuery.urlParametro('que') );      
				var donde = decodeURIComponent( jQuery.urlParametro('donde') );  
				jQuery.getJSON('escritos/ojo/getOpciones.php', {que:que, donde:donde} )
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){
					if(datos.cuantasOpciones > 0){
						//alert('datos: automatically parsed to object object por getJSON = ' + datos + '\nxhrObjetoForDONE.status = ' + xhrObjetoForDONE.status + '\nxhrObjetoForDONE.statustext = ' + xhrObjetoForDONE.statusText + '\nestatusForDONE = ' + estatusForDONE );
						var mainDeOpciones = '<div id="main" class="">';
						jQuery.each(datos.opciones, function(buscaMode, trios){

								mainDeOpciones += '<div id="opcionesdiv" class="opcionesfotos ">';
								if(buscaMode.indexOf("buscaBoth") > -1){
									mainDeOpciones += '<h2 class="notHidable">'  + que + ' + ' + donde + '</h2>';
								}else if (buscaMode.indexOf("buscaQue") > -1){
									mainDeOpciones += '<h2 class="notHidable">'  + que + '</h2>';
								}else if (buscaMode.indexOf("buscaDonde") > -1){
									mainDeOpciones += '<h2 class="notHidable">'  + donde + '</h2>';
								}
								jQuery.each(trios, function(index, pares){
									jQuery.each(pares, function(nepeId, fotoSrc){
										mainDeOpciones += '<a href="portada.html?look=profile&nepeId=' + nepeId + '">';
										mainDeOpciones += '<img class="" src="imagenes/profile/subidas/' + fotoSrc + '">'; 
										mainDeOpciones += '</a>';
									});
								}); // each in trios
								mainDeOpciones += '</div>'; // <div class="ver-borde opcionesfotos">

						}); // each in datos
						mainDeOpciones += '</div>'; //  <div id="main" class="contenido margen">
						jQuery('#containerForMain').html(mainDeOpciones);
						jQuery('#footer').css('visibility','visible');
					}else{
						jQuery(window.location).attr('href', window.location.pathname + '?look=nada');  
					}
				})
				.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
					var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
					var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
					jQuery(window.location).attr('href', path); 
				});
			break;
			case 'profile':			
				var key = 'dueno_id';
				jQuery.getJSON('escritos/session/isSessionSet.php', {key:key})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
					if(datos.isSet)  { jQuery('#navLogin').hide();   jQuery('#navSignup').hide(); }
					else             { jQuery('#navLogout').hide();  jQuery('#navHome').hide();   }
					jQuery('ul.navega').css('visibility','visible');
				})
				.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
					var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
					var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
					jQuery(window.location).attr('href', path); 
				});

				//get nepeId then
				var nepeId = jQuery.urlParametro('nepeId');	
				
				jQuery.getJSON('escritos/ojo/getNepe.php', {nepeId:nepeId} )
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){
						jQuery.dameLook('looks/profile.html');
						jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
							if(settingsObjeto.url === 'looks/profile.html'){
									//alert('datos: automatically parsed to object object by getJSON : ' + datos + '\nxhrObjetoForDONE status ' + xhrObjetoForDONE.status + '\nxhrObjetoForDONE statustext ' + xhrObjetoForDONE.statusText + '\nestatusForDONE ' + estatusForDONE + '\nrevisado: ' + datos.revisado );
									jQuery.hideThemSections();
									jQuery.populate(datos);
									jQuery('#footer').css('visibility','visible');
							} // if profile
						}); //ajax
				})
				.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
					var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
					var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
					jQuery(window.location).attr('href', path); 
				});
				
			break;						
			case 'login':
				//remove navegation before requesting new html.  Less likely user will notice it going away.
				var key = 'dueno_id';
				jQuery.getJSON('escritos/session/isSessionSet.php', {key:key})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
				
					if(datos.isSet){  
						//1) redirect to home, when already logged
						jQuery(window.location).attr('href', window.location.pathname + '?look=home');
						//2) redirect to error, when already logged
						
						//jQuery('#navSignup').hide();
						
						
						//var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
						//var textoEstatus = 'Error, usuario solicito login look, estando logueado.';
						//var elError = 'Error humano.';

						//var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError);
						//jQuery(window.location).attr('href', path);	
						
					}else{
						jQuery('#navLogout').hide(); jQuery('#navHome').hide();
						jQuery('#navLogin').addClass("activo");
						jQuery('ul.navega').css('visibility','visible');
						
						//get login look
						jQuery.dameLook('looks/login.html');
					/*
						//once look is in, use jQuery on loaded elements to get values
						jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
							//This code runs when get isCompleted and IF the get was requesting login.html
							if(settingsObjeto.url === 'looks/login.html'){
								//when ajax complete ; handle form submit and make post
									//event handlers on login js
							}//if
						});//ajax complete
					*/
					}
				})
				.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
					var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
					var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
					jQuery(window.location).attr('href', path); 
				});			
			break;
			case 'home':
				var key = 'dueno_id';
				jQuery.getJSON('escritos/session/isSessionSet.php', {key:key})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
					if(datos.isSet){ 
						jQuery('#navLogin').hide();  jQuery('#navSignup').hide();
						jQuery('#navHome').addClass("activo");
						jQuery('ul.navega').css('visibility','visible');
						
						jQuery.dameLook('looks/home.html');

						//once look is in, use jQuery to update look with profile values
						jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
							if(settingsObjeto.url === 'looks/home.html'){
								//jQuery.home(duenoId);
								//hide ThemSections  
								jQuery.hideThemSections();
								jQuery.home_populate();
								jQuery('#footer').css('visibility','visible');
							}//if
						});//ajaxComplete
					}else{
						var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
						var textoEstatus = 'Error, usuario solicito home look, sin estar logueado.';
						var elError = 'Error humano.';

						var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
						jQuery(window.location).attr('href', path);	
					}
				})
				.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
					var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
					var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
					jQuery(window.location).attr('href', path); 
				});

			break;			
			case 'creaNepe':
				var key = 'dueno_id';
				jQuery.getJSON('escritos/session/isSessionSet.php', {key:key})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
					if(datos.isSet){
						jQuery('#navLogin').hide();  jQuery('#navSignup').hide();
						jQuery('#navHome').addClass("activo");
						jQuery('ul.navega').css('visibility','visible');

						jQuery.dameLook('looks/creaNepe.html');

						jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
							if(settingsObjeto.url === 'looks/creaNepe.html'){
								jQuery.hideThemSections();
								jQuery('#footer').css('visibility','visible');
							}//if
						});//ajaxComplete
					}else{
						var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
						var textoEstatus = 'Error, usuario solicito creaNepe look, sin estar logueado.';
						var elError = 'Error humano.';

						var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
						jQuery(window.location).attr('href', path);							   
					}
				})
				.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
					var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
					var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
					jQuery(window.location).attr('href', path); 
				});		
			break;
			case 'updateNepe':
				var key = 'dueno_id';
				jQuery.getJSON('escritos/session/isSessionSet.php', {key:key})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
					if(datos.isSet){
						jQuery('#navLogin').hide();  jQuery('#navSignup').hide();
						jQuery('#navHome').addClass("activo");
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
											var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
											var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
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
									var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
									var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
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
							var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
							var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
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
					var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
					var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
					jQuery(window.location).attr('href', path); 
				});
			break;			
			case 'registro':
				var key = 'dueno_id';
				jQuery.getJSON('escritos/session/isSessionSet.php', {key:key})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
					if(datos.isSet){
						//1) redirect to home, when already logged
						jQuery(window.location).attr('href', window.location.pathname + '?look=home');
						//2) redirect to error look, when logged 
						
						//jQuery('#navLogin').hide();
						
						
						//var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
						//var textoEstatus = 'Error, usuario solicito registro look, estando logueado.';
						//var elError = 'Error humano.';

						//var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
						//jQuery(window.location).attr('href', path);	
						
					}else{ 
						jQuery('#navLogout').hide(); jQuery('#navHome').hide();
						jQuery('#navSignup').addClass("activo");
						jQuery('ul.navega').css('visibility','visible');
						
						//get registro look
						jQuery.dameLook('looks/registro.html');
					}
				})
				.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
					var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
					var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
					jQuery(window.location).attr('href', path); 
				});
			break;	
			case 'recentNepes':
				var key = 'dueno_id';
				jQuery.getJSON('escritos/session/isSessionSet.php', {key:key})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
					if(datos.isSet)  { jQuery('#navLogin').hide();   jQuery('#navSignup').hide(); }
					else             { jQuery('#navLogout').hide();  jQuery('#navHome').hide();   }
					jQuery('ul.navega').css('visibility','visible');

					jQuery.dameLook('looks/recentNepes.html');
				})
				.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
					var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
					var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
					jQuery(window.location).attr('href', path); 
				});
		
				jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
					//alert('settingsObjeto.url ' + settingsObjeto.url + '\nxhrObjeto status ' + xhrObjeto.status + '\nxhrObjeto statustext ' + xhrObjeto.statusText);
					if(settingsObjeto.url === 'looks/recentNepes.html'){ // === means true without type coersion - the type and value most both be equal
						jQuery.getRecentNepes();
					}//if
				}); //ajax complete
			break;			
			case 'administrar':
				var key = 'dueno_id';
				jQuery.getJSON('escritos/session/isSessionSet.php', {key:key})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
					if(datos.isSet){ 
						jQuery('#navLogin').hide();  jQuery('#navSignup').hide();
						jQuery('#navHome').addClass("activo");
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
					var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
					var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
					jQuery(window.location).attr('href', path); 
				});
			break;		
			case 'faq':
				jQuery('#navFaq').addClass("activo");
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
					var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
					var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
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
					var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
					var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
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
				
					jQuery.dameLook('looks/error.html');
				});
				
				if(DEBUGUEO){
					var xhrObjetoForFAILTexto = decodeURIComponent (jQuery.urlParametro('xhrObjetoForFAILTexto'));
					var textoEstatus          = decodeURIComponent (jQuery.urlParametro('textoEstatus'));
					var elError               = decodeURIComponent (jQuery.urlParametro('elError'));
					
					jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
						//alert('settingsObjeto.url ' + settingsObjeto.url + '\nxhrObjeto status ' + xhrObjeto.status + '\nxhrObjeto statustext ' + xhrObjeto.statusText);
						//This code runs when get isCompleted and IF the get was requesting error.html
						if(settingsObjeto.url === 'looks/error.html'){ // === means true without type coersion - the type and value most both be equal
							//when ajax complete ; 
							jQuery.appendDebugErrors( xhrObjetoForFAILTexto, textoEstatus, elError );  
							jQuery('#footer').css('visibility','visible');
						}//if
					}); //ajax complete
				}else{
					jQuery('#footer').css('visibility','visible');
				}
				break;

			case null:
			default:
				jQuery(window.location).attr('href', window.location.pathname + '?look=recentNepes');

		}//switch

		

		jQuery.showMenu();
	}); // ready function and statement
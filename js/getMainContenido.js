jQuery(document).ready(
	function(){

		var acto = jQuery.urlParametro('acto');
		switch(acto){
			case 'logout':
				//jQuery.logout();
			break;
			case 'deleteNepe':
				var nepeId = jQuery.urlParametro('nepeId');
				
				jQuery.getJSON('escritos/deleteNepe.php', {nepeId:nepeId})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
					if(datos.wasDeleted)  {  }
					else             {   }
				});				
			break;
			case null:
			default :
			break;
		}

		var look = jQuery.urlParametro('look');
		switch(look) {
			case 'busca':
				/*
				jQuery('#navBusca').addClass("activo");
				
				var key = 'dueno_id';
				jQuery.getJSON('escritos/isSessionSet.php', {key:key})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
					if(datos.isSet)  { jQuery('#navLogin').hide();   jQuery('#navSignup').hide(); }
					else             { jQuery('#navLogout').hide();  jQuery('#navHome').hide();   }
					
				});

				jQuery.dameLook('looks/busca.html');
		
				jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
					//alert('settingsObjeto.url ' + settingsObjeto.url + '\nxhrObjeto status ' + xhrObjeto.status + '\nxhrObjeto statustext ' + xhrObjeto.statusText);
					if(settingsObjeto.url === 'looks/busca.html'){ // === means true without type coersion - the type and value most both be equal
						jQuery.handleBuscaSubmit();	//when ajax complete ; handle form submit and go to opciones
					}//if
				}); //ajax complete
				*/
			break;
			case 'opciones':
				var key = 'dueno_id';
				jQuery.getJSON('escritos/isSessionSet.php', {key:key})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
					if(datos.isSet)  { jQuery('#navLogin').hide();   jQuery('#navSignup').hide(); }
					else             { jQuery('#navLogout').hide();  jQuery('#navHome').hide();   }
					
				});
			//This look completely depends on the amount of options to be presented.  It doesn't make
			//much sense to do a GET request for html, like other looks.  It is better to build mainDeOpciones
			//concatenating strings inside an each loop, with the requested JSON datos.
				var que = decodeURIComponent( jQuery.urlParametro('que') );      
				var donde = decodeURIComponent( jQuery.urlParametro('donde') );  
				jQuery.getJSON('escritos/getOpciones.php', {que:que, donde:donde} )
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){
					if(datos.cuantasOpciones > 0){
						//alert('datos: automatically parsed to object object por getJSON = ' + datos + '\nxhrObjetoForDONE.status = ' + xhrObjetoForDONE.status + '\nxhrObjetoForDONE.statustext = ' + xhrObjetoForDONE.statusText + '\nestatusForDONE = ' + estatusForDONE );
						var mainDeOpciones = '<div id="main" class="marxxxgen ver-borde">';
						jQuery.each(datos.opciones, function(buscaMode, trios){

								mainDeOpciones += '<div id="opcionesdiv" class="opcionesfotos ancho-sensi-ipad-2de3 ver-borde ">';
								if(buscaMode.indexOf("buscaBoth") > -1){
									mainDeOpciones += '<h3>'  + que + ' + ' + donde + '</h3>';
								}else if (buscaMode.indexOf("buscaQue") > -1){
									mainDeOpciones += '<h3>'  + que + '</h3>';
								}else if (buscaMode.indexOf("buscaDonde") > -1){
									mainDeOpciones += '<h3>'  + donde + '</h3>';
								}
								jQuery.each(trios, function(index, pares){
									jQuery.each(pares, function(nepeId, fotoSrc){
										mainDeOpciones += '<a href="portada.html?look=profile&nepeId=' + nepeId + '">' +
										'<img class="ancho-sensi-cell-1de2 ancho-sensi-ipad-1de3 ancho-sensi-desk-1de4 alto-sensi-cell-1de2 alto-sensi-ipad-1de3 alto-sensi-desk-1de4 ver-borde" ';
										mainDeOpciones += ' src="imagenes/profile/subidas/' + fotoSrc + '">'  + 
										'</a>';
									});
								}); // each in trios
								mainDeOpciones += '</div>'; // <div class="ver-borde opcionesfotos">

						}); // each in datos
						mainDeOpciones += '</div>'; //  <div id="main" class="contenido margen">
						jQuery('#containerForMain').html(mainDeOpciones);
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
				jQuery.getJSON('escritos/isSessionSet.php', {key:key})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
					if(datos.isSet)  { jQuery('#navLogin').hide();   jQuery('#navSignup').hide(); }
					else             { jQuery('#navLogout').hide();  jQuery('#navHome').hide();   }
					
				});

				//get nepeId then
				var nepeId = jQuery.urlParametro('nepeId');
				//request get JSON data for that meId
				jQuery.getJSON('escritos/getNepe.php', {nepeId:nepeId} )
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){
					//alert('datos: automatically parsed to object object by getJSON : ' + datos + '\nxhrObjetoForDONE status ' + xhrObjetoForDONE.status + '\nxhrObjetoForDONE statustext ' + xhrObjetoForDONE.statusText + '\nestatusForDONE ' + estatusForDONE );
					//Once the data is in, get profile look
					jQuery.dameLook('looks/profile.html');

					//Once the look is in (ajaxComplete), then insert json data into profile look
					jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
						if(settingsObjeto.url === 'looks/profile.html'){
							jQuery.populateProfile(datos);
						}//if
					});//ajax complete
				})//done
				.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
					var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
					var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
					jQuery(window.location).attr('href', path); 
				});
			break;						
			case 'login':
				/*
				//remove navegation before requesting new html.  Less likely user will notice it going away.
				var key = 'dueno_id';
				jQuery.getJSON('escritos/isSessionSet.php', {key:key})
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

						//var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
						//jQuery(window.location).attr('href', path);	
						
					}else{ 
						jQuery('#navLogout').hide(); jQuery('#navHome').hide();
						jQuery('#navLogin').addClass("activo");
						
						
						//get login look
						jQuery.dameLook('looks/login.html');

						//once look is in, use jQuery on loaded elements to get values
						jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
							//This code runs when get isCompleted and IF the get was requesting login.html
							if(settingsObjeto.url === 'looks/login.html'){
								//when ajax complete ; handle form submit and make post
								jQuery.handleLoginSubmit();
							}//if
						});//ajax complete
					}
				});		
				*/		
			break;
			case 'home':
				/*
				var key = 'dueno_id';
				jQuery.getJSON('escritos/isSessionSet.php', {key:key})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
					if(datos.isSet){ 
						jQuery('#navLogin').hide();  jQuery('#navSignup').hide();
						jQuery('#navHome').addClass("activo");
						
						
						//get duenoId
						//var duenoId = jQuery.urlParametro('duenoId');

						jQuery.dameLook('looks/home.html');

						//once look is in, use jQuery to update look with profile values
						jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
							if(settingsObjeto.url === 'looks/home.html'){
								//jQuery.home(duenoId);
								jQuery.home();
							}//if
						});//ajaxComplete
					}else{
						jQuery('#navLogout').hide();
						
						
						var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
						var textoEstatus = 'Error, usuario solicito home look, sin estar logueado.';
						var elError = 'Error humano.';

						var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
						jQuery(window.location).attr('href', path);	
					}
				});
				*/
			break;			
			case 'creaNepe':
				var key = 'dueno_id';
				jQuery.getJSON('escritos/isSessionSet.php', {key:key})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
					if(datos.isSet){
						jQuery('#navLogin').hide();  jQuery('#navSignup').hide();
						jQuery('#navHome').addClass("activo");
						
						
						jQuery.dameLook('looks/creaNepe.html');

						jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
							if(settingsObjeto.url === 'looks/creaNepe.html'){
								//get duenoId
								//var duenoId = jQuery.urlParametro('duenoId');
								
								//task 1 when ajax complete ; handle form submit and make post
							//jQuery.handleCreaNepeSubmit(duenoId);
								jQuery.handleCreaNepeSubmit();
								//submit event listener and handler
							}//if
						});//ajaxComplete
					}else{ 
						jQuery('#navLogout').hide(); jQuery('#navHome').hide();
						
						
						var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
						var textoEstatus = 'Error, usuario solicito creaNepe look, sin estar logueado.';
						var elError = 'Error humano.';

						var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
						jQuery(window.location).attr('href', path);							   
					}
				});				
			break;
			case 'updateNepe':
				var key = 'dueno_id';
				jQuery.getJSON('escritos/isSessionSet.php', {key:key})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
					if(datos.isSet){
						jQuery('#navLogin').hide();  jQuery('#navSignup').hide();
						jQuery('#navHome').addClass("activo");
						
						
						key = 'own_nepes';
						jQuery.getJSON('escritos/isSessionSet.php', {key:key})
						.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
							//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
							if(datos.isSet){  

								key = 'own_nepes';
								jQuery.getJSON('escritos/getSessionValue.php', {key:key})
								.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
									//alert('key: ' + key + '\ndatos: ' + datos);
									var nepeId = jQuery.urlParametro('nepeId');
											if( jQuery.isNepeIdOnOwnNepesSession(datos, nepeId) ){
				
												jQuery.dameLook('looks/updateNepe.html');
				
												jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
													if(settingsObjeto.url === 'looks/updateNepe.html'){
														//get nepeId
														//var nepeId = jQuery.urlParametro('nepeId');  
														
														//get duenoId
														//var duenoId = jQuery.urlParametro('duenoId');
								
														//task 1 when ajax complete get that data
														//alert('nepeId : ' + nepeId);
														jQuery.getJSON('escritos/getNepe.php', {nepeId:nepeId} )
														.done(function(datos, estatusForDONE, xhrObjetoForDONE){
															jQuery.populateUpdateNepeForm(datos);
														})
														.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
															var xhrObjetoForFAILTexto = xhrObjetoForFAIL.responseText;
															var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILTexto, textoEstatus, elError);
															jQuery(window.location).attr('href', path); 
														});
																					
														//task 2 when ajax complete ; handle form submit and make post
														//jQuery.handleUpdateNepeSubmit(duenoId, nepeId);
														jQuery.handleUpdateNepeSubmit(nepeId);
														//submit event listener and handler
													}//if
												});//ajaxComplete
											}else{
												var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
												var textoEstatus = 'Error, usuario solicito editar nepe q no es de el.';
												var elError = 'Error humano.';
												
												var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
												jQuery(window.location).attr('href', path);								
											}
								});
							}else{  
								var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
								var textoEstatus = 'Error, usuario esta logueado pero sin own_nepes seteado. (for whatever reason)';
								var elError = 'Error humano.';
								
								var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
								jQuery(window.location).attr('href', path);	
							}
						});
					}else{  
						jQuery('#navLogout').hide(); jQuery('#navHome').hide();
						
						
						var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
						var textoEstatus = 'Error, usuario solicito updateNepe look, sin estar logueado.';
						var elError = 'Error humano.';

						var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
						jQuery(window.location).attr('href', path);	
					}
				});
			break;			
			case 'creaDueno':
				/*
				var key = 'dueno_id';
				jQuery.getJSON('escritos/isSessionSet.php', {key:key})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
					if(datos.isSet){
						//1) redirect to home, when already logged
						jQuery(window.location).attr('href', window.location.pathname + '?look=home');
						//2) redirect to error look, when logged 
						
						//jQuery('#navLogin').hide();
						
						
						//var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
						//var textoEstatus = 'Error, usuario solicito creaDueno look, estando logueado.';
						//var elError = 'Error humano.';

						//var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
						//jQuery(window.location).attr('href', path);	
						
					}else{ 
						jQuery('#navLogout').hide(); jQuery('#navHome').hide();
						jQuery('#navSignup').addClass("activo");
						
						
						//get creaDueno look
						jQuery.dameLook('looks/creaDueno.html');

						//once look is in, use jQuery on loaded elements to get values
						jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
							//This code runs when get isCompleted and IF the get was requesting creaDueno.html
							if(settingsObjeto.url === 'looks/creaDueno.html'){
								//when ajax complete ; handle form submit and make post
								jQuery.handleCreaDuenoSubmit();
							}//if
						});//ajax complete
					}
				});
				*/
			break;	
			case 'recentNepes':
				var key = 'dueno_id';
				jQuery.getJSON('escritos/isSessionSet.php', {key:key})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
					if(datos.isSet)  { jQuery('#navLogin').hide();   jQuery('#navSignup').hide(); }
					else             { jQuery('#navLogout').hide();  jQuery('#navHome').hide();   }
					
				});

				jQuery.dameLook('looks/recentNepes.html');
		
				jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
					//alert('settingsObjeto.url ' + settingsObjeto.url + '\nxhrObjeto status ' + xhrObjeto.status + '\nxhrObjeto statustext ' + xhrObjeto.statusText);
					if(settingsObjeto.url === 'looks/recentNepes.html'){ // === means true without type coersion - the type and value most both be equal
						jQuery.getRecentNepes();	
					}//if
				}); //ajax complete
			break;			
			case 'adminDuenoNepes':
				var key = 'dueno_id';
				jQuery.getJSON('escritos/isSessionSet.php', {key:key})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
					if(datos.isSet){ 
						jQuery('#navLogin').hide();  jQuery('#navSignup').hide();
						jQuery('#navHome').addClass("activo");
						
						
						//get duenoId
						//var duenoId = jQuery.urlParametro('duenoId');

						jQuery.dameLook('looks/adminDuenoNepes.html');

						//once look is in, use jQuery to update look with profile values
						jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
							if(settingsObjeto.url === 'looks/adminDuenoNepes.html'){
								//jQuery.adminDuenoNepes(duenoId);
								jQuery.adminDuenoNepes();
							}//if
						});//ajaxComplete
					}else{
						jQuery('#navLogout').hide();
						
						
						var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
						var textoEstatus = 'Error, usuario solicito admin (adminDuenoNepes) look, sin estar logueado.';
						var elError = 'Error humano.';

						var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
						jQuery(window.location).attr('href', path);	
					}
				});
			break;		
			case 'faq':
				/*
				jQuery('#navFaq').addClass("activo");
				var key = 'dueno_id';
				jQuery.getJSON('escritos/isSessionSet.php', {key:key})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
					if(datos.isSet)  { jQuery('#navLogin').hide();   jQuery('#navSignup').hide(); }
					else             { jQuery('#navLogout').hide();  jQuery('#navHome').hide();   }
					
				});

				jQuery.dameLook('looks/faq.html');
				jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
					//alert('settingsObjeto.url ' + settingsObjeto.url + '\nxhrObjeto status ' + xhrObjeto.status + '\nxhrObjeto statustext ' + xhrObjeto.statusText);
					//This code runs when get isCompleted and IF the get was requesting faq.html
					if(settingsObjeto.url === 'looks/faq.html'){ // === means true without type coersion - the type and value most both be equal
						jQuery.toggleOnClick();
						jQuery.hideThem();
					}
				});
				*/
			break;
			case 'nada':
				var key = 'dueno_id';
				jQuery.getJSON('escritos/isSessionSet.php', {key:key})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
					if(datos.isSet)  { jQuery('#navLogin').hide();   jQuery('#navSignup').hide(); }
					else             { jQuery('#navLogout').hide();  jQuery('#navHome').hide();   }
					
				});

				jQuery.dameLook('looks/nada.html');
			break;				
			case 'error':
				var key = 'dueno_id';
				jQuery.getJSON('escritos/isSessionSet.php', {key:key})
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
					//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
					if(datos.isSet)  { jQuery('#navLogin').hide();   jQuery('#navSignup').hide(); }
					else             { jQuery('#navLogout').hide();  jQuery('#navHome').hide();   }
					
				});
				
				jQuery.dameLook('looks/error.html');

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
						}//if
					}); //ajax complete
				}
			break;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			//you can redirect null and default cases, either into busca case,  into error case or into their own looks 
			case null:
			// (1) redirecting to portada removing extra parameters after .html 
				/*
				var pathname = window.location.pathname; // Returns path only- http://localhost/WebDevelopmentStuff/mio/portada.html - saca parametros viejos
				var url      = window.location.href;     // Returns full URL - http://localhost/WebDevelopmentStuff/mio/portada.html - deja parametros viejos
				var origin   = window.location.origin;   // Returns base URL - localhost/
				*/
					
				var indexOfDotHtml = window.location.href.indexOf(".html");
				var largo = window.location.href.length;
				//alert('pathname: ' + window.location.pathname + '\nhref: ' + window.location.href + '\nindex: ' + indexOfDotHtml + '\nlargo: ' + largo);
				if(indexOfDotHtml + 'html'.length + 1 == largo){ // if true, href does ends with .html, there is nothing else
					//no hay nada en url, despues de portada.html
				}else{//hay extra parameters pero ninguno es look=, 
					jQuery(window.location).attr('href', window.location.pathname);
				}	
				
			// (2) null look				
				//if( jQuery.isSessionSet('dueno_id') )  {jQuery('#navLogin').hide();  jQuery('#navSignup').hide();}
				//else                                  {jQuery('#navLogout').hide(); jQuery('#navHome').hide();}
				//jQuery.dameLook('looks/notused/lookIsNull.html');
			//
				/*
			// (3) redirect to error
			var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
			var textoEstatus = 'Error, usuario quito look del address bar.';
			var elError = 'Error humano.';
		
			var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
			jQuery(window.location).attr('href', path);	
			//// (3) to error 
				*/
			break;
			default :
			// (1) redirecting to portada removing extra parameters after .html
				/*
				var pathname = window.location.pathname; // Returns path only- http://localhost/WebDevelopmentStuff/mio/portada.html - saca parametros viejos
				var url      = window.location.href;     // Returns full URL - http://localhost/WebDevelopmentStuff/mio/portada.html - deja parametros viejos
				var origin   = window.location.origin;   // Returns base URL - localhost/
				*/

				jQuery(window.location).attr('href', window.location.pathname);
				
			// (2) default look
				//if( jQuery.isSessionSet('dueno_id') )  {jQuery('#navLogin').hide();  jQuery('#navSignup').hide();}
				//else                                  {jQuery('#navLogout').hide(); jQuery('#navHome').hide();}
				//jQuery.dameLook('looks/notused/default.html');
			//
				/*
			// (3) redirect to error
			var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
			var textoEstatus = 'Error, usuario puso un look=algo,  pero algo no esta en el switch.';
			var elError = 'Error humano.';
			
			var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
			jQuery(window.location).attr('href', path);	
			// (3) to error
				*/
			break;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		}//switch
		

		
		jQuery(document).on('click', '.look-faq', function(eventox){
								eventox.preventDefault();
								jQuery('a[id^=nav]').removeClass("activo");  jQuery('#navFaq').addClass("activo");
								var key = 'dueno_id';
								jQuery.getJSON('escritos/isSessionSet.php', {key:key})
								.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
									//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
									if(datos.isSet)  { jQuery('#navLogin').hide();   jQuery('#navSignup').hide();   jQuery('#navLogout').show();  jQuery('#navHome').show();}
									else             { jQuery('#navLogout').hide();  jQuery('#navHome').hide();     jQuery('#navLogin').show();   jQuery('#navSignup').show();}
									
								});
								
								jQuery.dameLook('looks/faq.html');
								jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
									//alert('settingsObjeto.url ' + settingsObjeto.url + '\nxhrObjeto status ' + xhrObjeto.status + '\nxhrObjeto statustext ' + xhrObjeto.statusText);
									//This code runs when get isCompleted and IF the get was requesting faq.html
									if(settingsObjeto.url === 'looks/faq.html'){ // === means true without type coersion - the type and value most both be equal
										jQuery.hideThem();
									}
								});
		});
		
		
		
		jQuery(document).on('click', '.look-busca',  function(evento){
								evento.preventDefault();
								jQuery('a[id^=nav]').removeClass("activo");  jQuery('#navBusca').addClass("activo");
										
								var key = 'dueno_id';
								jQuery.getJSON('escritos/isSessionSet.php', {key:key})
								.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
									//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
									if(datos.isSet)  { jQuery('#navLogin').hide();   jQuery('#navSignup').hide();   jQuery('#navLogout').show();  jQuery('#navHome').show();}
									else             { jQuery('#navLogout').hide();  jQuery('#navHome').hide();     jQuery('#navLogin').show();   jQuery('#navSignup').show();}
									
								});
								
								jQuery.dameLook('looks/busca.html');
								jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
									//alert('settingsObjeto.url ' + settingsObjeto.url + '\nxhrObjeto status ' + xhrObjeto.status + '\nxhrObjeto statustext ' + xhrObjeto.statusText);
									if(settingsObjeto.url === 'looks/busca.html'){ // === means true without type coersion - the type and value most both be equal
										jQuery.handleBuscaSubmit();	//whe	n ajax complete ; handle form submit and go to opciones
									}//if
								}); //ajax complete
		});


		
		jQuery(document).on('click', '.look-creaDueno', function(evento){
								evento.preventDefault();
								var key = 'dueno_id';
								jQuery.getJSON('escritos/isSessionSet.php', {key:key})
								.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
									//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
									if(datos.isSet){
										//1) redirect to home, when already logged
									//jQuery('.look-home').click();
										//2) redirect to error look, when logged 
										
										//jQuery('#navLogin').hide();
										
										
										//var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
										//var textoEstatus = 'Error, usuario solicito creaDueno look, estando logueado.';
										//var elError = 'Error humano.';

										//var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
										//jQuery(window.location).attr('href', path);	
										
									}else{ 
										jQuery('#navLogout').hide(); jQuery('#navHome').hide();  jQuery('#navLogin').show();   jQuery('#navSignup').show();
										jQuery('a[id^=nav]').removeClass("activo");  jQuery('#navSignup').addClass("activo");
										
										
										//get creaDueno look
										jQuery.dameLook('looks/creaDueno.html');

										//once look is in, use jQuery on loaded elements to get values
										jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
											//This code runs when get isCompleted and IF the get was requesting creaDueno.html
											if(settingsObjeto.url === 'looks/creaDueno.html'){
												//when ajax complete ; handle form submit and make post
												jQuery.handleCreaDuenoSubmit();
											}//if
										});//ajax complete
									}
								});
		});



		jQuery(document).on('click', '.look-login', function(evento){
								evento.preventDefault();
								var key = 'dueno_id';
								jQuery.getJSON('escritos/isSessionSet.php', {key:key})
								.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
									//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
								
									if(datos.isSet){  
										//1) redirect to home, when already logged
									//jQuery('.look-home').click();
										//2) redirect to error, when already logged
										
										//jQuery('#navSignup').hide();
										
										
										//var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
										//var textoEstatus = 'Error, usuario solicito login look, estando logueado.';
										//var elError = 'Error humano.';

										//var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
										//jQuery(window.location).attr('href', path);	
										
									}else{
										jQuery('#navLogout').hide(); jQuery('#navHome').hide();  jQuery('#navLogin').show();   jQuery('#navSignup').show();
										jQuery('a[id^=nav]').removeClass("activo");  jQuery('#navLogin').addClass("activo");
										
										//get login look
										jQuery.dameLook('looks/login.html');
									}
								});
		});



		jQuery(document).on('click', '.look-acto-logout', function(evento){
			evento.preventDefault();
			jQuery.logout();
            jQuery('.look-faq').click();
		});



		jQuery(document).on('click', '.look-home', function(evento){
			evento.preventDefault();
			var key = 'dueno_id';
			jQuery.getJSON('escritos/isSessionSet.php', {key:key})
			.done(function(datos, estatusForDONE, xhrObjetoForDONE){  
				//alert('key: ' + key + '\ndatos.isSet: ' + datos.isSet);
				if(datos.isSet){ 
					jQuery('#navLogin').hide();  jQuery('#navSignup').hide();   jQuery('#navLogout').show();  jQuery('#navHome').show();
					jQuery('a[id^=nav]').removeClass("activo");  jQuery('#navHome').addClass("activo");
					
					jQuery.dameLook('looks/home.html');
				}else{
					jQuery('#navLogout').hide(); jQuery('#navHome').hide();
					
					
					var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
					var textoEstatus = 'Error, usuario solicito home look, sin estar logueado.';
					var elError = 'Error humano.';

					var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
					jQuery(window.location).attr('href', path);	
				}
			});
		});



}); // ready function and statement
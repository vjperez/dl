jQuery(document).ready(
	function(){

		var acto = jQuery.urlParametro('acto');
		switch(acto){
			case 'logout':
				document.cookie = "dueno_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
				document.cookie = "own_nepes=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
			break;
		}

		var look = jQuery.urlParametro('look');
		switch(look) {
			case 'busca':
				jQuery('#navBusca').hide();
				if( jQuery.isSetCookie('dueno_id') )  {jQuery('#navLogin').hide();  jQuery('#navSignup').hide();}
				else                                  {jQuery('#navLogout').hide(); jQuery('#navHome').hide();}

				jQuery.dameLook('looks/busca.html');
		
				jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
					//alert('settingsObjeto.url ' + settingsObjeto.url + '\nxhrObjeto status ' + xhrObjeto.status + '\nxhrObjeto statustext ' + xhrObjeto.statusText);
					//This code runs when get isCompleted and IF the get was requesting busca.html
					if(settingsObjeto.url === 'looks/busca.html'){ // === means true without type coersion - the type and value most both be equal
						//when ajax complete ; handle form submit and go to opciones
						jQuery.handleBuscaSubmit();
					}//if
				}); //ajax complete
			break;
			case 'opciones':
				if( jQuery.isSetCookie('dueno_id') )  {jQuery('#navLogin').hide();  jQuery('#navSignup').hide();}
				else                                  {jQuery('#navLogout').hide(); jQuery('#navHome').hide();}
			
			//This look completely depends on the amount of options to be presented.  It doesn't make
			//much sense to do a GET request for html, like other looks.  It is better to build mainDeOpciones
			//concatenating strings inside an each loop, with the requested JSON datos.
				var que = jQuery.urlParametro('que');      
				var donde = jQuery.urlParametro('donde');  
				jQuery.getJSON('escritos/getOpciones.php', {que:que, donde:donde} )
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){
					if(datos.cuantasOpciones > 0){
						//alert('datos: automatically parsed to object object por getJSON = ' + datos + '\nxhrObjetoForDONE.status = ' + xhrObjetoForDONE.status + '\nxhrObjetoForDONE.statustext = ' + xhrObjetoForDONE.statusText + '\nestatusForDONE = ' + estatusForDONE );
						var mainDeOpciones = '<div id="main" class="contenido margen">';
						jQuery.each(datos.opciones, function(buscaMode, trios){

								mainDeOpciones += '<div class="ver-borde opcionesfotos">';
								if(buscaMode.indexOf("buscaBoth") > -1){
									mainDeOpciones += '<h3>'  + que.replace(/:/g, ' ') + ' + ' + donde.replace(/:/g, ' ') + '</h3>';
								}else if (buscaMode.indexOf("buscaQue") > -1){
									mainDeOpciones += '<h3>'  + que.replace(/:/g, ' ') + '</h3>';
								}else if (buscaMode.indexOf("buscaDonde") > -1){
									mainDeOpciones += '<h3>'  + donde.replace(/:/g, ' ') + '</h3>';
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
				if( jQuery.isSetCookie('dueno_id') )  {jQuery('#navLogin').hide();  jQuery('#navSignup').hide();}
				else                                  {jQuery('#navLogout').hide(); jQuery('#navHome').hide();}

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
				jQuery('#navLogin').hide();
				//remove navegation before requesting new html.  Less likely user will notice it going away.
				if( jQuery.isSetCookie('dueno_id') )  {
					jQuery('#navSignup').hide();
					
						var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
						var textoEstatus = 'Error, usuario solicito login look, estando logueado.';
						var elError = 'Error humano.';

						var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
						jQuery(window.location).attr('href', path);						
				}else{
					jQuery('#navLogout').hide(); jQuery('#navHome').hide();

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
			break;
			case 'editDuenoShowNepes':
				jQuery('#navHome').hide();
				//remove navegation before requesting new html.  Less likely user will notice it going away.
				if( jQuery.isSetCookie('dueno_id') )  {
					jQuery('#navLogin').hide();  jQuery('#navSignup').hide();
				
					//get duenoId
					//var duenoId = jQuery.urlParametro('duenoId');

					jQuery.dameLook('looks/editDuenoShowNepes.html');

					//once look is in, use jQuery to update look with profile values
					jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
						if(settingsObjeto.url === 'looks/editDuenoShowNepes.html'){
							//jQuery.editDuenoShowNepes(duenoId);
							jQuery.editDuenoShowNepes();
						}//if
					});//ajaxComplete
				}else{
					jQuery('#navLogout').hide();
					
					var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
					var textoEstatus = 'Error, usuario solicito home (editDuenoShowNepes) look, sin estar logueado.';
					var elError = 'Error humano.';

					var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
					jQuery(window.location).attr('href', path);						
				}
			break;			
			case 'creaNepe':
				//remove navegation before requesting new html.  Less likely user will notice it going away.
				if( jQuery.isSetCookie('dueno_id') )  {
					jQuery('#navLogin').hide();  jQuery('#navSignup').hide();

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
			break;
			case 'updateNepe':
				//remove navegation before requesting new html.  Less likely user will notice it going away.
				if( jQuery.isSetCookie('dueno_id') )  {
					jQuery('#navLogin').hide();  jQuery('#navSignup').hide();

					var nepeId = jQuery.urlParametro('nepeId');
					if( jQuery.isNepeIdOnOwnNepesCookie(nepeId) ){
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
				}else{
					jQuery('#navLogout').hide(); jQuery('#navHome').hide();
					
					var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
					var textoEstatus = 'Error, usuario solicito updateNepe look, sin estar logueado.';
					var elError = 'Error humano.';

					var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
					jQuery(window.location).attr('href', path);						
				}
			break;			
			case 'creaDueno':
				jQuery('#navSignup').hide();
				if( jQuery.isSetCookie('dueno_id') )  {
					jQuery('#navLogin').hide();
					
					var datosJSONStrAsXHRTexto = 'Esto no es una respuesta del servidor.';
					var textoEstatus = 'Error, usuario solicito creaDueno look, estando logueado.';
					var elError = 'Error humano.';

					var path = jQuery.encodeAndGetErrorPath(datosJSONStrAsXHRTexto, textoEstatus, elError); // 
					jQuery(window.location).attr('href', path);						
				}else{
					jQuery('#navLogout').hide(); jQuery('#navHome').hide();
					
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
			break;				
			case 'faq':
				if( jQuery.isSetCookie('dueno_id') )  {jQuery('#navLogin').hide();  jQuery('#navSignup').hide();}
				else                                  {jQuery('#navLogout').hide(); jQuery('#navHome').hide();}

				jQuery.dameLook('looks/faq.html');

				jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
					//alert('settingsObjeto.url ' + settingsObjeto.url + '\nxhrObjeto status ' + xhrObjeto.status + '\nxhrObjeto statustext ' + xhrObjeto.statusText);
					//This code runs when get isCompleted and IF the get was requesting faq.html
					if(settingsObjeto.url === 'looks/faq.html'){ // === means true without type coersion - the type and value most both be equal
						jQuery.toggleOnClick();
					}
				});
			break;
			case 'nada':
				if( jQuery.isSetCookie('dueno_id') )  {jQuery('#navLogin').hide();  jQuery('#navSignup').hide();}
				else                                  {jQuery('#navLogout').hide(); jQuery('#navHome').hide();}
				jQuery.dameLook('looks/nada.html');
			break;				
			case 'error':
				if( jQuery.isSetCookie('dueno_id') )  {jQuery('#navLogin').hide();  jQuery('#navSignup').hide();}
				else                                  {jQuery('#navLogout').hide(); jQuery('#navHome').hide();}
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
			// (1) redirecting to busca
				jQuery(window.location).attr('href', window.location.pathname + '?look=busca');
			// (2) null look				
				//if( jQuery.isSetCookie('dueno_id') )  {jQuery('#navLogin').hide();  jQuery('#navSignup').hide();}
				//else                                  {jQuery('#navLogout').hide(); jQuery('#navHome').hide();}
				//jQuery.dameLook('looks/lookIsNull.html');
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
			// (1) redirecting to busca
				jQuery(window.location).attr('href', window.location.pathname + '?look=busca');
			// (2) default look
				//if( jQuery.isSetCookie('dueno_id') )  {jQuery('#navLogin').hide();  jQuery('#navSignup').hide();}
				//else                                  {jQuery('#navLogout').hide(); jQuery('#navHome').hide();}
				//jQuery.dameLook('looks/default.html');
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
	
	}); // ready function and statement


/*
var pathname = window.location.pathname; // Returns path only- http://localhost/WebDevelopmentStuff/mio/portada.html - saca parametros viejos
var url      = window.location.href;     // Returns full URL - http://localhost/WebDevelopmentStuff/mio/portada.html - deja parametros viejos
var origin   = window.location.origin;   // Returns base URL - localhost/
*/

jQuery(document).ready(
	function(){
		var look = jQuery.urlParam('look');
		switch(look) {
			case 'busca':
				jQuery('#navBusca').hide();
				jQuery.get('looks/busca.html', function(datosDeRespuesta, estatus, xhrObjeto){
					//console.log(datosDeRespuesta);
					var mainDeBusca = jQuery(datosDeRespuesta).filter('#main');
					//console.log(mainDeBusca);
					jQuery('#containerForMain').html(mainDeBusca);
				});
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
			//This look completely depends on the amount of options to be presented.  It doesn't make
			//much sense to do a GET request for html, like other looks.  It is better to build mainDeOpciones
			//concatenating strings inside an each loop, with the requested JSON datos.
				var que = jQuery.urlParam('que');      //a string with : as delimiter between  words
				var donde = jQuery.urlParam('donde');  //a string with : as delimiter between  words
				jQuery.getJSON('escritos/getOpciones.php', {que:que, donde:donde} )
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){
					//alert('datos: automatically parsed to object object por getJSON = ' + datos + '\nxhrObjetoForDONE.status = ' + xhrObjetoForDONE.status + '\nxhrObjetoForDONE.statustext = ' + xhrObjetoForDONE.statusText + '\nestatusForDONE = ' + estatusForDONE );
					var mainDeOpciones = '<div id="main" class="contenido margen">';
					jQuery.each(datos, function(buscaMode, trios){

						
							mainDeOpciones += '<div class="ver-borde opcionesfotos">';
							if(buscaMode.indexOf("buscaBoth") > -1){
								mainDeOpciones += '<h3>'  + que.replace(/:/g, ' ') + ' + ' + donde.replace(/:/g, ' ') + '</h3>';
							}else if (buscaMode.indexOf("buscaQue") > -1){
								mainDeOpciones += '<h3>'  + que.replace(/:/g, ' ') + '</h3>';
							}else if (buscaMode.indexOf("buscaDonde") > -1){
								mainDeOpciones += '<h3>'  + donde.replace(/:/g, ' ') + '</h3>';
							}
							jQuery.each(trios, function(index, pares){
								jQuery.each(pares, function(meId, fotoSrc){
									mainDeOpciones += '<a href="portada.html?look=profile&meId=' + meId + '"><img class="ancho-sensi-cell-1de2 ancho-sensi-ipad-1de3 ancho-sensi-desk-1de4 alto-sensi-cell-1de2 alto-sensi-ipad-1de3 alto-sensi-desk-1de4 ver-borde" ';
									mainDeOpciones += ' src="imagenes/profile/subidas/' + fotoSrc + '"></a>';
								});
							}); // each in trios
							mainDeOpciones += '</div>'; // <div class="ver-borde opcionesfotos">
						

					}); // each in datos
					mainDeOpciones += '</div>'; //  <div id="main" class="contenido margen">
					jQuery('#containerForMain').html(mainDeOpciones);
				})
				.fail(	jQuery.fallas  );
			break;
			case 'profile':
				//get meId then
				var meId = jQuery.urlParam('meId');
				//request get JSON data for that meId
				jQuery.getJSON('escritos/getMicroEmpre.php', {meId:meId} )
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){
					//alert('datos: automatically parsed to object object by getJSON : ' + datos + '\nxhrObjetoForDONE status ' + xhrObjetoForDONE.status + '\nxhrObjetoForDONE statustext ' + xhrObjetoForDONE.statusText + '\nestatusForDONE ' + estatusForDONE );
					//Once the data is in, get profile look
					jQuery.get('looks/profile.html', function(datosDeRespuesta, estatus, xhrObjeto){
						var mainDeProfile = jQuery(datosDeRespuesta).filter('#main');
						jQuery('#containerForMain').html(mainDeProfile);
					});
					//Once the look is in (ajaxComplete), then insert json data into profile look
					jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
						if(settingsObjeto.url === 'looks/profile.html'){
							jQuery.populateProfile(datos);
						}//if
					});//ajax complete
				})//done
				.fail(  jQuery.fallas  );//fail
			break;
			case 'login':
				//remove navegation before requesting new html.  Less likely user will notice it going away.
				jQuery('#navBusca').hide(); jQuery('#navLogin').hide(); jQuery('#navSignUp').hide();
				//get login look
				jQuery.get('looks/login.html', function(datosDeRespuesta, estatus, xhrObjeto){
					var mainDeLogin = jQuery(datosDeRespuesta).filter('#main');
					jQuery('#containerForMain').html(mainDeLogin);
				});
				//once look is in, use jQuery on loaded elements to get values
				jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
					//This code runs when get isCompleted and IF the get was requesting login.html
					if(settingsObjeto.url === 'looks/login.html'){
						//when ajax complete ; handle form submit and make post
						jQuery.handleSubmit();
					}//if
				});//ajax complete
			break;
			case 'creaDueno':
				//remove navegation before requesting new html.  Less likely user will notice it going away.
				jQuery('#navBusca').hide(); jQuery('#navLogin').hide(); jQuery('#navSignUp').hide();
				//get creaDueno look
				jQuery.get('looks/creaDueno.html', function(datosDeRespuesta, estatus, xhrObjeto){
					var mainDeRegistro = jQuery(datosDeRespuesta).filter('#main');
					jQuery('#containerForMain').html(mainDeRegistro);
				});
				//once look is in, use jQuery on loaded elements to get values
				jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
					//This code runs when get isCompleted and IF the get was requesting creaDueno.html
					if(settingsObjeto.url === 'looks/creaDueno.html'){
						//when ajax complete ; handle form submit and make post
						jQuery.handleSubmit();
					}//if
				});//ajax complete
			break;
			case 'editDuenoShowEmpresas':
				//remove navegation before requesting new html.  Less likely user will notice it going away.
				jQuery('#navBusca').hide(); jQuery('#navLogin').hide(); jQuery('#navSignUp').hide();
				//get duenoId
				var duenoId = jQuery.urlParam('duenoId');

				jQuery.get('looks/editDuenoShowEmpresas.html', function(datosDeRespuesta, estatus, xhrObjeto){
					var mainDeDuenoData = jQuery(datosDeRespuesta).filter('#main');
					jQuery('#containerForMain').html(mainDeDuenoData);
				});
				//once look is in, use jQuery to update look with profile values
				jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
					if(settingsObjeto.url === 'looks/editDuenoShowEmpresas.html'){
						jQuery.editDuenoShowEmpresas(duenoId);
					}//if
				});//ajaxComplete


			break;
			case 'createMicroEmpre':
				//remove navegation before requesting new html.  Less likely user will notice it going away.
				jQuery('#navBusca').hide(); jQuery('#navLogin').hide(); jQuery('#navSignUp').hide();

				jQuery.get('looks/createMicroEmpre.html', function(datosDeRespuesta, estatus, xhrObjeto){
					var mainDeMicroEmpreData = jQuery(datosDeRespuesta).filter('#main');
					jQuery('#containerForMain').html(mainDeMicroEmpreData);
				});

				jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
					if(settingsObjeto.url === 'looks/createMicroEmpre.html'){
						//get duenoId
						var duenoId = jQuery.urlParam('duenoId');
						//task 1 when ajax complete ; handle form submit and make post
						jQuery.handleSubmit(duenoId);
						//submit event listener and handler
					}//if
				});//ajaxComplete
			break;
			case 'updateMicroEmpre':
				//remove navegation before requesting new html.  Less likely user will notice it going away.
				jQuery('#navBusca').hide(); jQuery('#navLogin').hide(); jQuery('#navSignUp').hide();

				jQuery.get('looks/updateMicroEmpre.html', function(datosDeRespuesta, estatus, xhrObjeto){
					var mainDeMicroEmpreData = jQuery(datosDeRespuesta).filter('#main');
					jQuery('#containerForMain').html(mainDeMicroEmpreData);
				});

				jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
					if(settingsObjeto.url === 'looks/updateMicroEmpre.html'){
						//get meId
						var meId = jQuery.urlParam('meId');  
						//get duenoId
						var duenoId = jQuery.urlParam('duenoId');

						//task 1 when ajax complete get that data
						//alert('meId : ' + meId);
						jQuery.getJSON('escritos/getMicroEmpreData.php', {meId:meId} )
						.done(function(datos, estatusForDONE, xhrObjetoForDONE){
							jQuery.populateForm(datos);
						})
						.fail(  jQuery.fallas  );
													
						//task 2 when ajax complete ; handle form submit and make post
						jQuery.handleSubmit(duenoId, meId);
						//submit event listener and handler
					}//if
				});//ajaxComplete
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
						jQuery.toggleOnClick();
					}
				});
			break;
			//you can join the null case and busca case together, should avoid requesting portada.html
			//twice when there is NO look parameter (null)
			case null:
				//when in running mode
				//jQuery(window.location).attr('href', window.location.pathname + '?look=busca');
				jQuery.get('looks/lookIsNull.html', function(datosDeRespuesta, estatus, xhrObjeto){
					var mainDeNull = jQuery(datosDeRespuesta).filter('#main');
					jQuery('#containerForMain').html(mainDeNull);
				});	
			break;
			default :
				//when in running mode
				//jQuery(window.location).attr('href', window.location.pathname + '?look=busca');
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

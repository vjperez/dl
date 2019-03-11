jQuery(document).ready(
	function(){
		var look = jQuery.urlParam('look');
		switch(look) {
			//you can join the null case and busca case together, should avoid requesting portada.html
			//twice when there is NO look parameter (null)
			case null:
				//jQuery(window.location).attr('href', window.location.pathname + '?look=busca');
			break;
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
						jQuery('form').submit(function(evento){
							evento.preventDefault(); //not making a submit (GET request) here. Lets do it at look=opciones
							var que = jQuery('#queId').val();
							que = jQuery.cleanStr(que); // clean function returns cleaned str
							var donde = jQuery('#dondeId').val();
							donde = jQuery.cleanStr(donde); // clean function returns cleaned str
							alert('que=(' + que  + ')\ndonde=(' +  donde + ')');
							if(que.length > 0 || donde.length > 0){//i'm looking for a non empty cleaned str
								jQuery(window.location).attr('href', window.location.pathname + '?look=opciones&que=' + que.replace(/ /g, ':') + '&donde=' + donde.replace(/ /g, ':'));
							}else{
								jQuery.feedback('form#queDondeForm h3', 'Buscas algo?');
							}
						});
					}
				});
			break;
			case 'opciones':
			//This look completely depends on the amount of options to be presented.  It doesn't make
			//much sense to do a GET request for html, like other looks.  It is better to build mainDeOpciones
			//concatenating strings inside an each loop, with the requested JSON datos.
				var que = jQuery.urlParam('que');
				var donde = jQuery.urlParam('donde');
				que = que.replace(/:/g, ' ');// here each string with ':' as delimiter is converted into a string with ' ' as delimiter. The server receives 'limpia carro' not 'limpia:carro'
				donde = donde.replace(/:/g, ' ');// here each string with ':' as delimiter is converted into a string with ' ' as delimiter
				jQuery.getJSON('escritos/opciones.php', {que:que, donde:donde} )
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){
					//alert('datos: automatically parsed to object object by getJSON ' + datos + '\nxhrObjetoForDONE status ' + xhrObjetoForDONE.status + '\nxhrObjetoForDONE statustext ' + xhrObjetoForDONE.statusText + '\nestatusForDONE ' + estatusForDONE );
					var mainDeOpciones = '<div id="main" class="contenido margen">';
					jQuery.each(datos, function(buscaMode, cuaTuples){

						jQuery.each(cuaTuples, function(queryIndex, trios){
							mainDeOpciones += '<div class="ver-borde opcionesfotos">';
							if(buscaMode.indexOf("buscaBoth") > -1){
								mainDeOpciones += '<h3>' + queryIndex + ': ' + que + ' + ' + donde + '</h3>';
							}else if (buscaMode.indexOf("buscaQue") > -1){
								mainDeOpciones += '<h3>' + queryIndex + ': ' + que + '</h3>';
							}else if (buscaMode.indexOf("buscaDonde") > -1){
								mainDeOpciones += '<h3>' + queryIndex + ': ' + donde + '</h3>';
							}
							jQuery.each(trios, function(index, pares){
								jQuery.each(pares, function(meId, fotoSrc){
									mainDeOpciones += '<a href="portada.html?look=profile&meId=' + meId + '"><img class="ancho-sensi-cell-1de2 ancho-sensi-ipad-1de3 ancho-sensi-desk-1de4 alto-sensi-cell-1de2 alto-sensi-ipad-1de3 alto-sensi-desk-1de4 ver-borde" ';
									mainDeOpciones += ' src="imagenes/profile/' + fotoSrc + '"></a>';
								});
							}); // each in trios
							mainDeOpciones += '</div>'; // <div class="ver-borde opcionesfotos">
						}); // each in cuaTuples

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
				jQuery.getJSON('escritos/getMicroEmpreData.php', {meId:meId} )
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
						jQuery('form#loginForm').submit(function(evento){
							evento.preventDefault(); //not making a submit (POST request) from html action.
							var user = jQuery('#usernameId').val();
							var pass = jQuery('#passwordId').val();
							if( jQuery.areValidUserYPass(user, pass, pass, "generalFeedback", 'form#loginForm h3') ){
								//Valid values son los q cumplen estas 3 cosas.
								//Estas cosas se pueden chequear antes del post y evito post sin sentido
								// 1)lenght >= 4; 2)only numbers or letters; 3)both pass are equal;
								//Si tengo valores q fueron registrables entonces, Making a submit (POST request) here. Not in look=editDuenoShowEmpresas
								jQuery.post('escritos/login.php', {user:user, pass:pass} )
								.done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){
									//el getJSON no entra al .done y cae en .fail si detecta errores de parseo.
									//Con el post tengo yo que usar un try block para detectar errores de parseo y mandarlo a jQuery fallas
									try{
										//alert('datosJSONStr: ' + datosJSONStr);
										datosJSObj = JSON.parse(datosJSONStr);
										//alert('datosJSObj.loguea: ' + datosJSObj.loguea);
									}catch(errorParseo){
										jQuery.fallas(new Object(), 'Error parsing la siguiente respuesta del server en escritos/login.php<br>' + errorParseo.name + ' : ' + errorParseo.message, datosJSONStr);
									}
									if(datosJSObj.loguea){
										jQuery(window.location).attr('href', window.location.pathname + '?look=editDuenoShowEmpresas&duenoId=' + datosJSObj.duenoId);
									}else{
										//alert('datosJSObj.loguea: ' + datosJSObj.loguea);
										jQuery.feedback('form#loginForm h3', 'Trata otra vez.');
									}
								})
								.fail(  jQuery.fallas  );//fail
							}
						});
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
						jQuery('form#creaDuenoForm').submit(function(evento){
							evento.preventDefault(); //not making a submit (POST request) from html action
							var usertb = jQuery('#usernameId').val();
							var pass01 = jQuery('#passwordId').val();
							var pass02 = jQuery('#passwordConfirmId').val();
							if( jQuery.areValidUserYPass(usertb, pass01, pass02, 'fullFeedback', 'form#creaDuenoForm h3') ){
								//Valid values son los q cumplen estas 3 cosas.
								//Estas cosas se pueden chequear antes del post y evito post sin sentido
								// 1)lenght >= 4; 2)only numbers or letters; 3)both pass are equal;
								//Si tengo valores q fueron registrables entonces, Making a submit (POST request) here. Not in look=editDuenoShowEmpresas
								jQuery.post('escritos/creaDueno.php', {usertb:usertb, pass01:pass01} )//check here that password are equal
								.done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){
									//el getJSON no entra al .done y cae en .fail si detecta errores de parseo.
									//Con el post tengo yo que usar un try block para detectar errores de parseo y mandarlo a jQuery fallas
									try{
										//alert('datosJSONStr: ' + datosJSONStr);
										datosJSObj = JSON.parse(datosJSONStr);
										//alert('datosJSObj.registrado: ' + datosJSObj.registrado + '\ndatosJSObj.feedback: ' + datosJSObj.feedback + '\ndatosJSObj.duenoId: ' + datosJSObj.duenoId);
									}catch(errorParseo){
										jQuery.fallas(new Object(), 'Error parsing la siguiente respuesta del server en escritos/creaDueno.php<br>' + errorParseo.name + ' : ' + errorParseo.message, datosJSONStr);
									}
									if(datosJSObj.registrado){
										jQuery(window.location).attr('href', window.location.pathname + '?look=editDuenoShowEmpresas&duenoId=' + datosJSObj.duenoId);
									}else{ // usuario es repetido en el database, por eso se chequea despues del post
										jQuery.feedback('form#creaDuenoForm h3', datosJSObj.feedback);
									}
								})
								.fail(  jQuery.fallas  );  //failing post
							}
						});
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

						//do this when form submitted ; editDuenoShowEmpresas task 1
						jQuery('form#editDuenoDataForm').submit(function(evento){
							evento.preventDefault(); //not making a submit (POST request) from html action.
							var user = 'valorDummy';
							var pass01 = jQuery('#passwordId').val();
							var pass02 = jQuery('#passwordConfirmId').val();
							if( jQuery.areValidUserYPass(user, pass01, pass02, 'fullFeedback', 'form#editDuenoDataForm h3') ){
								//Valid values son los q cumplen estas 3 cosas.
								//Estas cosas se pueden chequear antes del post y evito post sin sentido
								// 1)lenght >= 4; 2)only numbers or letters; 3)both pass are equal;
								//Si tengo valores q fueron registrables entonces, Making a submit (POST request) here. Not in look=editDuenoShowEmpresas
								jQuery.post('escritos/editDuenoContrasena.php', {duenoId:duenoId, pass01:pass01} )
								.done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){
									//el getJSON no entra al .done y cae en .fail si detecta errores de parseo.
									//Con el post tengo yo que usar un try block para detectar errores de parseo y mandarlo a jQuery fallas
									try{
										//alert('datosJSONStr: ' + datosJSONStr);
										datosJSObj = JSON.parse(datosJSONStr);
										//alert('datosJSObj.loguea: ' + datosJSObj.loguea);
									}catch(errorParseo){
										jQuery.fallas(new Object(), 'Error parsing la siguiente respuesta del server en escritos/editDuenoContrasena.php<br>' + errorParseo.name + ' : ' + errorParseo.message, datosJSONStr);
									}
									if(datosJSObj.cambiado){
										jQuery.feedback('form#editDuenoDataForm h3', 'Tu contrasena fue cambiada.');
									}else{
										jQuery.feedback('form#editDuenoDataForm h3', 'Trata otra vez. No cambiamos NADA !');
									}
								})
								.fail(  jQuery.fallas  );//fail
							}
						});

						//show empresas ; editDuenoShowEmpresas task 2
						jQuery.getJSON('escritos/showEmpresasGetIds.php', {duenoId:duenoId} )
						.done(function(datos, estatusForDONE, xhrObjetoForDONE){
							var labelAndTable = '<label class="notHidable">Micro Empresas:</label>';
							labelAndTable   +=  '<table class="hidaxxxble">';
								jQuery.each(datos, function(index, meId, nombre){
									labelAndTable += '<tr><td><a class="link" href="portada.html?look=createMicroEmpre&meId=' + datos[index].meId + '&duenoId=' + duenoId + '">' + datos[index].nombre + '</a></td></tr>';
								});
							labelAndTable += '</table>';
							jQuery('#labelAndTableContainer').html(labelAndTable);
						})
						.fail(  jQuery.fallas  );//fail
						
						
						//hide, show on click ; editDuenoShowEmpresas task 3
						jQuery.toggleOnClick();

					}//if
				});//ajaxComplete


			break;
			case 'createMicroEmpre':
				//this code is very similar to profile case code - should make functions to simplify

				//remove navegation before requesting new html.  Less likely user will notice it going away.
				jQuery('#navBusca').hide(); jQuery('#navLogin').hide(); jQuery('#navSignUp').hide();

				jQuery.get('looks/createMicroEmpre.html', function(datosDeRespuesta, estatus, xhrObjeto){
					var mainDeMicroEmpreData = jQuery(datosDeRespuesta).filter('#main');
					jQuery('#containerForMain').html(mainDeMicroEmpreData);
				});

				jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
					if(settingsObjeto.url === 'looks/createMicroEmpre.html'){
						//get meId
						var meId = jQuery.urlParam('meId');
						//get duenoId
						var duenoId = jQuery.urlParam('duenoId');

						//task 1 when ajax complete ; if already existing micro empre then get that data
						if(meId > 0){ //in the db showEmpresasGetIds, zero is used for crear empresa
							//get profile data
							jQuery.getJSON('escritos/getMicroEmpreData.php', {meId:meId} )
							.done(function(datos, estatusForDONE, xhrObjetoForDONE){
								jQuery.populateForm(datos);
							})
							.fail(  jQuery.fallas  );
						}

						//task 2 when ajax complete ; handle form submit and make post
						jQuery.handleSubmit(duenoId, meId);
						//submit event listener and handler
								
						//task 3 when ajax complete; hide, show on click ;
						//jQuery.toggleOnClick();						

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

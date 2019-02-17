jQuery(document).ready(
	function(){
		//extracs parameters from the url
		jQuery.urlParam = function(name){
			var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
			if(results == null) return null;
			else return results[1];
			//return results[1] || 0;
		}
		jQuery.cleanBuscaStr = function(str){
			/*
			newStr01 = str.replace(/[^a-zA-Z 0-9]+/g, '');
			newStr02 = str.replace(/[^a-z0-9]/gi, ' ');
			newStrArray01 = newStr01.split(' ');
			newStrArray02 = newStr02.split(' ');

			arrayParts01 = '';
			arrayParts02 = '';
			for(var i=0; i < newStrArray01.length; i++){
				arrayParts01 += '(' + newStrArray01[i] + ')';
			}
			for(var i=0; i < newStrArray02.length; i++){
				arrayParts02 += '(' + newStrArray02[i] + ')';
			}
			alert('[' + str + '] -> [' + newStr01 + '] -> [' + arrayParts01 + '] :: [' + newStr02 + '] -> [' + arrayParts02 + ']');
			return newStr02;
			//On result array only copy from  newStrArray[], when it is NOT ''
			//when  newStrArray[i] is '',  it is shown in arrayParts as ()
			//it means split found delimiters back to back and there is nothing between them.
			*/
			str = str.replace(/[^a-z0-9]/gi, '*'); // same as replace(/[^a-zA-Z0-9]/g, '*'); JavaScript is a case-sensitive language
			strArray = str.split('*');
			result = new Array();
			for(var i=0; i < strArray.length; i++){
				if (strArray[i] != '') result.push(strArray[i]);
			}
			//alert(result);
			return result; // this is an array
		}
		jQuery.fallas = function(xhrObjetoForFAIL, estatusForFAIL, errorMessageSentByServer){
		//Called at getJSON .fail and jQuery post when parsing errors (caused by PHP Exceptions), and
		//other errors are found.
		//jQuery getJSON will throw an error and run the .fail code whenever it cannot
		//parse a response from server, (that includes PHP Exceptions which are not valid JSON!).  So the
		//text from PHP Exceptions will endup here.
		//jQuery post will NOT run .fail code when JSON parsing errors are found. So in order
		//to redirect here PHP Exceptions from the login section,
		//i have to explicitly try the JSON parse in a try-catch block, and when a parsing error
		//is catched, call this function.
			jQuery.get('looks/error.html', function(datosDeRespuesta, estatus, xhrObjeto){
				var mainDeError = jQuery(datosDeRespuesta).filter('#main');
				jQuery('#containerForMain').html(mainDeError);
			});
			jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
				if(settingsObjeto.url === 'looks/error.html'){
					losLis = '<br><hr>';
					losLis += '<li>' + xhrObjetoForFAIL.responseText + '</li>';
					losLis += '<li>' + estatusForFAIL + '</li>';
					losLis += '<li>' + errorMessageSentByServer + '</li>';
					losLis += '<br><hr>';
					jQuery('#containerForErrors').append(losLis);
				}
			});
		}
		jQuery.feedback = function(elementoDonde, mensaje){
			jQuery(elementoDonde).text(mensaje).slideDown(500).delay(1000).slideUp(2000);
		}

		jQuery.areValidUserYPass = function(usertb, pass01, pass02, feedbackType, whatElement){
			//Esta funcion la usan login y registra
			//para detectar valores invalidos q se pueden chequear con JavaScript, y evitar post innecesarios.
			//Chequear Usuario repetido requiere hacer el post, pq requiere info de database.
			// 1)lenght >= 4; 2)only numbers or letters; 3)both pass are equal; se puede chequear antes del post
			usertbCheck = usertb.replace(/[^a-z0-9]/gi, '');  //same as replace(/[^a-zA-Z0-9]/g, ''); JavaScript is a case-sensitive language
			pass01Check = pass01.replace(/[^a-z0-9]/gi, '');
			pass02Check = pass02.replace(/[^a-z0-9]/gi, '');
			if(usertb.length < 4 || pass01.length < 4 || pass02.length < 4){
				if(feedbackType.indexOf('fullFeedback') !== -1){
					jQuery.feedback(whatElement, "Usuario o contrase\u00f1a es muy corto.");
				}else if(feedbackType.indexOf('generalFeedback') !== -1){
					jQuery.feedback(whatElement, 'Trata otra vez.');
				}
				return false;
			}else if(usertbCheck.length < usertb.length  ||  pass01Check.length < pass01.length ||  pass02Check.length < pass02.length){
				if(feedbackType.indexOf('fullFeedback') !== -1){
					jQuery.feedback(whatElement, 'Usa solo letras y/o numeros.');
				}else if(feedbackType.indexOf('generalFeedback') !== -1){
					jQuery.feedback(whatElement, 'Trata otra vez.');
				}
				return false;
			}else if(pass01 !== pass02){  //same type, same value, no type conversion, case sensitive
				if(feedbackType.indexOf('fullFeedback') !== -1){
					jQuery.feedback(whatElement, 'Las contrase\u00f1as son diferentes.');
				}else if(feedbackType.indexOf('generalFeedback') !== -1){
					jQuery.feedback(whatElement, 'Trata otra vez.');
				}
				return false;
			}else{
				return true;
			}
		}


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
							que = jQuery.cleanBuscaStr(que); // clean function returns an array with 'words' to be searched
							var donde = jQuery('#dondeId').val();
							donde = jQuery.cleanBuscaStr(donde); // clean function returns an array with 'words' to be searched
							//alert(que + ' ' + que.length + '\n' + donde + ' ' + donde.length);
							if(que.length > 0 || donde.length > 0){//'que' y 'donde' are arrays of words, so on each, i'm looking for at least 1 word
								jQuery(window.location).attr('href', window.location.pathname + '?look=opciones&que=' + que + '&donde=' + donde);
								//here each array of words is converted into a string with ',' as delimiter; that's what
								//you see on address bar
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
				que = que.replace(/,/g, ' ');// here each string with ',' as delimiter is converted into a string with ' ' as delimiter. The server receives 'limpia carro' not 'limpia,carro'
				donde = donde.replace(/,/g, ' ');// here each string with ',' as delimiter is converted into a string with ' ' as delimiter
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
						//insert json data into profile look
						var date = new Date(datos.revisado).toString();
						jQuery('#video h5').text('Revisado: ' + date.substring(0, -1+date.indexOf('00:00:00')));
						jQuery('#video h1').text(datos.nombre);
						//alert('url: ' + datos.videoUrl + '\nEmpre id: ' + datos.microEmpreId + ' de tipo: ' + typeof datos.microEmpreId);
						jQuery('#video iframe').attr('src', datos.videoUrl);
						//alert(datos.quienSocialHandle);
						if(datos.quienSocialHandle.tt != '')   jQuery('#quien h3.tt').text(datos.quienSocialHandle.tt);
						if(datos.quienSocialHandle.fbk != '')  jQuery('#quien h3.fbk').text(datos.quienSocialHandle.fbk);
						if(datos.quienSocialHandle.igrm != '') jQuery('#quien h3.igrm').text(datos.quienSocialHandle.igrm);
						if(datos.quienSocialHandle.phn != '')  jQuery('#quien h3.phn').text(datos.quienSocialHandle.phn);
						//following code works when there are 5 or less images coming from getJSON.
						//the html is prepared for a max of 5 images, this code removes excess html when less than 5 images come
						//alert(datos.quienFotoSrc);
						jQuery('#quien #profilefotos img').each(function(index){
							if(index < datos.quienFotoSrc.length) { jQuery(this).attr('src', 'imagenes/profile/' + datos.quienFotoSrc[index]); }
							else { jQuery(this).remove(); }
						});
						//alert(datos.cuando);
						jQuery('#cuando td.lun').text(datos.cuando.lun);
						jQuery('#cuando td.mar').text(datos.cuando.mar);
						jQuery('#cuando td.mier').text(datos.cuando.mier);
						jQuery('#cuando td.jue').text(datos.cuando.jue);
						jQuery('#cuando td.vier').text(datos.cuando.vier);
						jQuery('#cuando td.sab').text(datos.cuando.sab);
						jQuery('#cuando td.dom').text(datos.cuando.dom);
						//following code works when there are 10 or less 'que' coming from getJSON.
						//the html is prepared for a max of 10 'que', this code removes excess html when less than 10 'que' come
						//alert(datos.que);
						jQuery('#que li a').each(function(index){
							if(index < datos.que.length) {
								jQuery(this).text(datos.que[index]);
								jQuery(this).attr('href', window.location.pathname + '?look=opciones&que=' + datos.que[index].replace(/ /g, ',') + '&donde=');
							} else { jQuery(this).remove(); }
						});
						//following code works when there are 5 or less 'donde' coming from getJSON.
						//the html is prepared for a max of 5 'donde', this code removes excess html when less than 5 'donde' come
						//alert(datos.donde);
						jQuery('#donde li a').each(function(index){
							if(index < datos.donde.length) {
								jQuery(this).text(datos.donde[index]);
								jQuery(this).attr('href', window.location.pathname + '?look=opciones&que=' + '&donde=' + datos.donde[index].replace(/ /g, ','));
							}else { jQuery(this).remove(); }
						});
						//alert('a tu casa: ' + datos.atucasa + '\ntipo: ' + typeof datos.atucasa);
						var clase = 'no'; if(datos.atucasa) clase = 'si';
						jQuery('#donde h3 span').attr('class', clase);
						jQuery('#donde h3').append(clase);

						//hide, show on click
						var $todosLosNotHidable = jQuery('.notHidable');
						var $todosLosHidable = jQuery('.hidable');
						$todosLosHidable.hide();
						$todosLosNotHidable.on('click', function(evento){
							var $toToggle = jQuery(evento.currentTarget).siblings('.hidable');
							$toToggle.toggle();
						});
						//show only 1 social handle with class current
						var $icon = jQuery('div#quien ul li').click(function(evento){
							evento.preventDefault();
							jQuery('div#quien ul li img').removeClass('current');
							var $imgToFocus = jQuery(evento.currentTarget).find('img');
							var $socialClass = $imgToFocus.attr('class'); // grab the name this class, used to select h3 with same class
							$imgToFocus.addClass('current');

							jQuery('div#quien h3').removeClass('current');
							jQuery('div#quien h3.' + $socialClass).addClass('current');
						});
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
										jQuery.fallas(new Object(), 'Error parsing la siguiente respuesta del server en escritos/login.php', datosJSONStr);
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
										jQuery.fallas(new Object(), 'Error parsing la siguiente respuesta del server en escritos/creaUsuario.php', datosJSONStr);
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
										jQuery.fallas(new Object(), 'Error parsing la siguiente respuesta del server en escritos/login.php', datosJSONStr);
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

						//hide, show on click ; editDuenoShowEmpresas task 2
						var $todosLosNotHidable = jQuery('.notHidable');
						var $todosLosHidable = jQuery('.hidable');
						$todosLosHidable.hide();
						$todosLosNotHidable.on('click', function(evento){
							var $toToggle = jQuery(evento.currentTarget).siblings('.hidable');
							$toToggle.toggle();
						});

						//show empresas ; editDuenoShowEmpresas task 3
						jQuery.getJSON('escritos/showEmpresasGetIds.php', {duenoId:duenoId} )
						.done(function(datos, estatusForDONE, xhrObjetoForDONE){
							var labelAndTable = '<label class="notHidable">Micro Empresas:</label>';
							labelAndTable   +=  '<table class="hidaxxxble">';
								jQuery.each(datos, function(index, meId, nombre){
									labelAndTable += '<tr><td><a class="link" href="portada.html?look=editMicroEmpre&meId=' + datos[index].meId + '&duenoId=' + duenoId + '">' + datos[index].nombre + '</a></td></tr>';
								});
							labelAndTable += '</table>';
							jQuery('#labelAndTableContainer').html(labelAndTable);
						})
						.fail(  jQuery.fallas  );//fail

					}//if
				});//ajaxComplete


			break;
			case 'editMicroEmpre':
				//this code is very similar to profile case code - should make functions to simplify

				//remove navegation before requesting new html.  Less likely user will notice it going away.
				jQuery('#navBusca').hide(); jQuery('#navLogin').hide(); jQuery('#navSignUp').hide();

				jQuery.get('looks/editMicroEmpre.html', function(datosDeRespuesta, estatus, xhrObjeto){
					var mainDeMicroEmpreData = jQuery(datosDeRespuesta).filter('#main');
					jQuery('#containerForMain').html(mainDeMicroEmpreData);
				});


				jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
					if(settingsObjeto.url === 'looks/editMicroEmpre.html'){
						//get meId
						var meId = jQuery.urlParam('meId');
						//get duenoId
						var duenoId = jQuery.urlParam('duenoId');

						//task 1 when ajax complete; hide, show on click ;
						var $todosLosNotHidable = jQuery('.notHidable');
						var $todosLosHidable = jQuery('.hidable');
						$todosLosHidable.hide();
						$todosLosNotHidable.on('click', function(evento){
							var $toToggle = jQuery(evento.currentTarget).siblings('.hidable');
							$toToggle.toggle();
						});
						//task 2 when ajax complete ; if already existing micro empre then get that data
						if(meId > 0){ //in the db showEmpresasGetIds, zero is used for crear empresa
							//get profile data
							jQuery.getJSON('escritos/getMicroEmpreData.php', {meId:meId} )
							.done(function(datos, estatusForDONE, xhrObjetoForDONE){
										//nombre y video
										jQuery('form#editMicroEmpreForm input[name=nombre]').val(datos.nombre);
										jQuery('form#editMicroEmpreForm textarea[name=videoUrl]').val(datos.videoUrl);
										//quien
										jQuery('form#editMicroEmpreForm input[name=red1]').val(datos.quienSocialHandle.fbk);
										jQuery('form#editMicroEmpreForm input[name=red2]').val(datos.quienSocialHandle.tt);
										jQuery('form#editMicroEmpreForm input[name=red3]').val(datos.quienSocialHandle.igrm);
										jQuery('form#editMicroEmpreForm input[name=red4]').val(datos.quienSocialHandle.phn);

										//falta each para array de fotos

										//cuando
										jQuery('form#editMicroEmpreForm input[name=dia1]').val(datos.cuando.lun);
										jQuery('form#editMicroEmpreForm input[name=dia2]').val(datos.cuando.mar);
										jQuery('form#editMicroEmpreForm input[name=dia3]').val(datos.cuando.mier);
										jQuery('form#editMicroEmpreForm input[name=dia4]').val(datos.cuando.jue);
										jQuery('form#editMicroEmpreForm input[name=dia5]').val(datos.cuando.vier);
										jQuery('form#editMicroEmpreForm input[name=dia6]').val(datos.cuando.sab);
										jQuery('form#editMicroEmpreForm input[name=dia7]').val(datos.cuando.dom);

										//following code works when there are 10 or less 'que' coming from getJSON.
										//the html is prepared for a max of 10 'que'
										jQuery('form#editMicroEmpreForm input[name^=que]').each(function(index){
											if(index < datos.que.length) { jQuery(this).val(datos.que[index]); }
											else {  } //ya estan vacios en html por default
										});

										//following code works when there are 5 or less 'donde' coming from getJSON.
										//the html is prepared for a max of 5 'donde'
										jQuery('form#editMicroEmpreForm input[name^=donde]').each(function(index){
											if(index < datos.donde.length) { jQuery(this).val(datos.donde[index]); }
											else {  } //ya estan vacios en html por default
										});

										jQuery('form#editMicroEmpreForm input[value=si]').prop('checked', datos.atucasa);
										jQuery('form#editMicroEmpreForm input[value=no]').prop('checked', !datos.atucasa);

							})
							.fail(  jQuery.fallas  );
						}

						//task 3 when ajax complete ; handle form submit
						jQuery('form#editMicroEmpreForm').submit(function(evento){
							evento.preventDefault(); //not making a submit (POST request) from html action
							var formData = new FormData(this);
/*
							var nombre = jQuery('#nombreId').val();
							var videoUrl = jQuery('#videoUrlId').val();
							//var foto1 = jQuery('form#editMicroEmpreForm input[name=foto1]')[0].files[0];
							var fbk  = jQuery('#red1Id').val();
							var tt   = jQuery('#red2Id').val();
							var igrm = jQuery('#red3Id').val();
							var phn  = jQuery('#red4Id').val();
							var lun  = jQuery('#dia1Id').val();
							var mar  = jQuery('#dia2Id').val();
							var mier = jQuery('#dia3Id').val();
							var jue  = jQuery('#dia4Id').val();
							var vier = jQuery('#dia5Id').val();
							var sab  = jQuery('#dia6Id').val();
							var dom  = jQuery('#dia7Id').val();
*/
							var que = new Array();
							jQuery('form#editMicroEmpreForm input[name^=que]').each(function(index){
								if(jQuery(this).val()) { que[index] = jQuery(this).val(); } else {  }
							});
							formData.append('que', que);
							var donde = new Array();
							jQuery('form#editMicroEmpreForm input[name^=donde]').each(function(index){
								if(jQuery(this).val()) { donde[index] = jQuery(this).val(); } else {  }
							});
							formData.append('donde', donde);
/*
							var atucasa = jQuery('form#editMicroEmpreForm input[value=si]').prop('checked');
							//if( jQuery. froma es valida (usertb, pass01, pass02, 'fullFeedback', 'form#creaDuenoForm h3') ){


								jQuery.post('escritos/editMicroEmpreData.php', {nombre:nombre, videoUrl:videoUrl, fbk:fbk, tt:tt, igrm:igrm, phn:phn,
																				lun:lun, mar:mar, mier:mier, jue:jue, vier:vier, sab:sab, dom:dom,
																				que:que, donde:donde, atucasa:atucasa, duenoId:duenoId, meId:meId})
*/
								formData.append('duenoId', duenoId);
								formData.append('meId', meId);
								jQuery.ajax({method:"POST", url:"escritos/editMicroEmpreData.php", data:formData, processData:false, contentType:false, cache:false})
								.done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){
									//el getJSON no entra al .done y cae en .fail si detecta errores de parseo.
									//Con el post tengo yo que usar un try block para detectar errores de parseo y mandarlo a jQuery fallas
									try{
										//alert('datosJSONStr: ' + datosJSONStr);
										datosJSObj = JSON.parse(datosJSONStr);
										//alert('datosJSObj.registrado: ' + datosJSObj.registrado + '\ndatosJSObj.feedback: ' + datosJSObj.feedback + '\ndatosJSObj.duenoId: ' + datosJSObj.duenoId);
									}catch(errorParseo){
										jQuery.fallas(new Object(), 'Error parsing la siguiente respuesta del server desde escritos/editMicroEmpreData.php', datosJSONStr);
									}
									if(datosJSObj.actualizado){
										jQuery(window.location).attr('href', window.location.pathname + '?look=profile&meId=' + datosJSObj.meId);
									}else{
										//jQuery.feedback('form#editMicroEmpreForm h3', datosJSObj.feedback);
									}
								})
								.fail(  jQuery.fallas  );  //failing post
							//}
						});

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
						var $todosLosNotHidable = jQuery('.notHidable');
						var $todosLosHidable = jQuery('.hidable');
						$todosLosHidable.hide();
						$todosLosNotHidable.click(function(evento){
							var $toToggle = jQuery(evento.currentTarget).siblings('.hidable');
							$toToggle.toggle();
						});
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

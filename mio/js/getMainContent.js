jQuery(document).ready(
	function(){
		//extracs parameters from the url
		jQuery.urlParam = function(name){
			var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
			if(results == null) return null;
			else return results[1];
			//return results[1] || 0;
		}
		jQuery.cleanStr = function(str){
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
			str = str.replace(/[^a-z0-9]/gi, ' ');
			strArray = str.split(' ');
			result = new Array();
			for(var i=0; i < strArray.length; i++){
				if (strArray[i] != '') result.push(strArray[i]);
			}		
			alert(result);
			return result;
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
							var que = jQuery('#queId').val(); que = jQuery.cleanStr(que);
							var donde = jQuery('#dondeId').val(); donde = jQuery.cleanStr(donde); 
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
			case 'opciones': 
			//This look completely depends on the amount of options to be presented.  It doesn't make
			//much sense to do a GET request for html, like other looks.  It is better to build mainDeOpciones
			//concatenating strings inside an each loop, with the requested JSON datos.
				var que = jQuery.urlParam('que');
				var donde = jQuery.urlParam('donde');
				jQuery.getJSON('uiTests/show15RandomOptionsTest.php', {que:que, donde:donde} )
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){
					alert('datos: automatically parsed to object object by getJSON ' + datos + '\nxhrObjetoForDONE status ' + xhrObjetoForDONE.status + '\nxhrObjetoForDONE statustext ' + xhrObjetoForDONE.statusText + '\nestatusForDONE ' + estatusForDONE );
					var mainDeOpciones = '<div id="main" class="contenido margen"><div id="opcionesfotos" class="ver-borde">';
					jQuery.each(datos, function(fotoSrc, id){
						mainDeOpciones += '<a href="portada.html?look=profile&id=' + id + '"><img class="ancho-sensi-cell-1de2 ancho-sensi-ipad-1de4 ver-borde" src="';
						mainDeOpciones += fotoSrc + '"></a>';
					});
					mainDeOpciones += '</div></div>';
					jQuery('#containerForMain').html(mainDeOpciones);
				})
				.fail(function(xhrObjetoForFAIL, estatusForFAIL, errorMessageSentByServer){ //learn about error handling; 2 possible type of errors here
					jQuery.get('looks/error.html', function(datosDeRespuesta, estatus, xhrObjeto){
						var mainDeError = jQuery(datosDeRespuesta).filter('#main');
						jQuery('#containerForMain').html(mainDeError);
					});					
				});		
			break;
			case 'profile':	
				//get id then
				var id = jQuery.urlParam('id');
				//request get JSON data for that id
				jQuery.getJSON('uiTests/showProfileTest.php', {id:id} )
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){
					//Once the data is in, get profile look	
					jQuery.get('looks/profile.html', function(datosDeRespuesta, estatus, xhrObjeto){
						var mainDeProfile = jQuery(datosDeRespuesta).filter('#main');
						jQuery('#containerForMain').html(mainDeProfile);
					});				
					//Once the look is in (ajaxComplete), then insert json data into profile look
					jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
					if(settingsObjeto.url === 'looks/profile.html'){								
						//insert json data into profile look
						var str = new Date(datos.revisado).toString();
						jQuery('#video h5').text('Revisado: ' + str.substring(0, -1+str.indexOf('00:00:00')));
						jQuery('#video h1').text(datos.nombrecomun);
						jQuery('#video iframe').attr('src', datos.videoUrl);
						if(datos.quien.socialHandle.tt != '')   jQuery('#quien h3.tt').text(datos.quien.socialHandle.tt);
						if(datos.quien.socialHandle.fbk != '')  jQuery('#quien h3.fbk').text(datos.quien.socialHandle.fbk);
						if(datos.quien.socialHandle.igrm != '') jQuery('#quien h3.igrm').text(datos.quien.socialHandle.igrm);
						if(datos.quien.socialHandle.phn != '')  jQuery('#quien h3.phn').text(datos.quien.socialHandle.phn);
						//following code works when there are 5 or less images coming from getJSON.
						//the html is prepared for a max of 5 images, this code removes excess html when less than 5 images come
						jQuery('#quien #profilefotos img').each(function(index){
							if(index < datos.quien.fotoSrc.length) { jQuery(this).attr('src', datos.quien.fotoSrc[index]); }
							else { jQuery(this).remove(); }
						});
						jQuery('#cuando td.lun').text(datos.cuando.lun);
						jQuery('#cuando td.mar').text(datos.cuando.mar);
						jQuery('#cuando td.mier').text(datos.cuando.mier);
						jQuery('#cuando td.jue').text(datos.cuando.jue);
						jQuery('#cuando td.vier').text(datos.cuando.vier);
						jQuery('#cuando td.sab').text(datos.cuando.sab);
						jQuery('#cuando td.dom').text(datos.cuando.dom);
						//following code works when there are 10 or less 'que' coming from getJSON.
						//the html is prepared for a max of 10 'que', this code removes excess html when less than 10 'que' come
						jQuery('#que li a').each(function(index){
							if(index < datos.que.length) { jQuery(this).text(datos.que[index]); }
							else { jQuery(this).remove(); }				
						});		
						//following code works when there are 5 or less 'donde' coming from getJSON.
						//the html is prepared for a max of 5 'donde', this code removes excess html when less than 5 'donde' come							
						jQuery('#donde li a').each(function(index){
							if(index < datos.donde.length) { jQuery(this).text(datos.donde[index]); }
							else { jQuery(this).remove(); }								
						});	
						var clase = 'no'; if(datos.atucasa) clase = 'si'; 
						jQuery('#donde h3 span').attr('class', clase);
						
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
				.fail(function(xhrObjetoForFAIL, estatusForFAIL, errorMessageSentByServer){ //learn about error handling; 2 possible type of errors here
					jQuery.get('looks/error.html', function(datosDeRespuesta, estatus, xhrObjeto){
						var mainDeError = jQuery(datosDeRespuesta).filter('#main');
						jQuery('#containerForMain').html(mainDeError);
					});					
				});//fail							
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
						jQuery('form').submit(function(evento){
							evento.preventDefault(); //not making a submit (POST request) from html action. 
							var user = jQuery('#usernameId').val();
							var pass = jQuery('#passwordId').val(); 
							//Making a submit (POST request) here. Not in look=micuenta
							jQuery.post('uiTests/loginExito.php', {user:user, pass:pass} )
							.done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){  alert(datosJSONStr);
								datosJSObj = JSON.parse(datosJSONStr);  alert(datosJSObj);
								if(datosJSObj.log){
									jQuery(window.location).attr('href', window.location.pathname + '?look=micuenta&id=' + datosJSObj.id);
								}else{
									jQuery(window.location).attr('href', window.location.pathname + '?look=login');
								}
							})
							.fail(function(xhrObjetoForFAIL, estatusForFAIL, errorMessageSentByServer){ //learn about error handling; 2 possible type of errors here
								jQuery.get('looks/error.html', function(datosDeRespuesta, estatus, xhrObjeto){
									var mainDeError = jQuery(datosDeRespuesta).filter('#main');
									jQuery('#containerForMain').html(mainDeError);
								});					
							});
						});
					}//if						
				});//ajax complete				
			break;	
			case 'registro':
				//remove navegation before requesting new html.  Less likely user will notice it going away.
				jQuery('#navBusca').hide(); jQuery('#navLogin').hide(); jQuery('#navSignUp').hide();
				//get registro look
				jQuery.get('looks/registro.html', function(datosDeRespuesta, estatus, xhrObjeto){
					var mainDeRegistro = jQuery(datosDeRespuesta).filter('#main');
					jQuery('#containerForMain').html(mainDeRegistro);
				});
				//once look is in, use jQuery on loaded elements to get values
				jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
					//This code runs when get isCompleted and IF the get was requesting registro.html
					if(settingsObjeto.url === 'looks/registro.html'){
						jQuery('form').submit(function(evento){
							evento.preventDefault(); //not making a submit (POST request) from html action
							var usertb = jQuery('#usernameId').val();
							var pass01 = jQuery('#passwordId').val(); 
							var pass02 = jQuery('#passwordConfirmId').val();
							//Making a submit (POST request) here. Not in look=micuenta
							jQuery.post('uiTests/registroExito.php', {usertb:usertb, pass01:pass01, pass02:pass02} )
							.done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){  alert(datosJSONStr);
								datosJSObj = JSON.parse(datosJSONStr);  alert(datosJSObj);
								if(datosJSObj.registra){
									jQuery(window.location).attr('href', window.location.pathname + '?look=micuenta&id=' + datosJSObj.id);
								}else{
									jQuery(window.location).attr('href', window.location.pathname + '?look=registro');
								}
							})
							.fail(function(xhrObjetoForFAIL, estatusForFAIL, errorMessageSentByServer){ //learn about error handling; 2 possible type of errors here
								jQuery.get('looks/error.html', function(datosDeRespuesta, estatus, xhrObjeto){
									var mainDeError = jQuery(datosDeRespuesta).filter('#main');
									jQuery('#containerForMain').html(mainDeError);
								});					
							});							
						});
					}//if						
				});//ajax complete	
			break;			
			case 'micuenta': 
				//this code is very similar to profile case code - should make functions to simplify
				
				//remove navegation before requesting new html.  Less likely user will notice it going away.
				jQuery('#navBusca').hide(); jQuery('#navLogin').hide(); jQuery('#navSignUp').hide();
				
				//get id
				var id = jQuery.urlParam('id');
				//get profile data
				jQuery.getJSON('uiTests/showProfileTest.php', {id:id} )
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){				
					//Once the data is in, get mi cuenta look
					jQuery.get('looks/micuenta.html', function(datosDeRespuesta, estatus, xhrObjeto){
						var mainDeMiCuenta = jQuery(datosDeRespuesta).filter('#main');
						jQuery('#containerForMain').html(mainDeMiCuenta);
					});										
					//once look is in, use jQuery to update look with profile values
					jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
						if(settingsObjeto.url === 'looks/micuenta.html'){
							//nombre y video
							jQuery('form#editDatoForm input[name=nombre]').val(datos.nombrecomun);
							jQuery('form#editDatoForm input[name=videoUrl]').val(datos.videoUrl);
							//quien
							jQuery('form#editDatoForm input[name=red1]').val(datos.quien.socialHandle.fbk);
							jQuery('form#editDatoForm input[name=red2]').val(datos.quien.socialHandle.tt);
							jQuery('form#editDatoForm input[name=red3]').val(datos.quien.socialHandle.igrm);
							jQuery('form#editDatoForm input[name=red4]').val(datos.quien.socialHandle.phn)							
							//falta each para array de fotos
							
							//cuando
							jQuery('form#editDatoForm input[name=dia1]').val(datos.cuando.lun);
							jQuery('form#editDatoForm input[name=dia2]').val(datos.cuando.mar);
							jQuery('form#editDatoForm input[name=dia3]').val(datos.cuando.mier);
							jQuery('form#editDatoForm input[name=dia4]').val(datos.cuando.jue);
							jQuery('form#editDatoForm input[name=dia5]').val(datos.cuando.vier);
							jQuery('form#editDatoForm input[name=dia6]').val(datos.cuando.sab);
							jQuery('form#editDatoForm input[name=dia7]').val(datos.cuando.dom);							
							//following code works when there are 10 or less 'que' coming from getJSON.
							//the html is prepared for a max of 10 'que'
							jQuery('form#editDatoForm input[name^=que]').each(function(index){
								if(index < datos.que.length) { jQuery(this).val(datos.que[index]); }
								else {  } //ya estan vacios en html por default				
							});							
							//following code works when there are 5 or less 'donde' coming from getJSON.
							//the html is prepared for a max of 5 'donde'
							jQuery('form#editDatoForm input[name^=donde]').each(function(index){
								if(index < datos.donde.length) { jQuery(this).val(datos.donde[index]); }
								else {  } //ya estan vacios en html por default				
							});
							if(datos.atucasa != null){ //comes with null(falsy) for an empty profile
								jQuery('form#editDatoForm input[value=si]').prop('checked', datos.atucasa);
								jQuery('form#editDatoForm input[value=no]').prop('checked', !datos.atucasa);
							}
;							
							
							
							//hide, show on click
							var $todosLosNotHidable = jQuery('.notHidable');
							var $todosLosHidable = jQuery('.hidable');
							$todosLosHidable.hide();
							$todosLosNotHidable.on('click', function(evento){
								var $toToggle = jQuery(evento.currentTarget).siblings('.hidable');
								$toToggle.toggle();
							});
						}//if
					});//ajaxComplete
				})
				.fail(function(xhrObjetoForFAIL, estatusForFAIL, errorMessageSentByServer){ //learn about error handling; 2 possible type of errors here
					jQuery.get('looks/error.html', function(datosDeRespuesta, estatus, xhrObjeto){
						var mainDeError = jQuery(datosDeRespuesta).filter('#main');
						jQuery('#containerForMain').html(mainDeError);
					});					
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

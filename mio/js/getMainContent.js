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
				var id = jQuery.urlParam('id');
				jQuery.getJSON('uiTests/showProfileTest.php', {id:id} )
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){
					jQuery.get('looks/profile.html', function(datosDeRespuesta, estatus, xhrObjeto){
						var mainDeProfile = jQuery(datosDeRespuesta).filter('#main');
						jQuery('#containerForMain').html(mainDeProfile);
					});	
					jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
						if(settingsObjeto.url === 'looks/profile.html'){
							//load real profile data
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
								var $toToggle = jQuery(evento.currentTarget).children('.hidable');
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
					});					
				})
				.fail(function(xhrObjetoForFAIL, estatusForFAIL, errorMessageSentByServer){ //learn about error handling; 2 possible type of errors here
					jQuery.get('looks/error.html', function(datosDeRespuesta, estatus, xhrObjeto){
						var mainDeError = jQuery(datosDeRespuesta).filter('#main');
						jQuery('#containerForMain').html(mainDeError);
					});					
				});		
			break;			
			case 'login':
				jQuery.get('looks/login.html', function(datosDeRespuesta, estatus, xhrObjeto){
					var mainDeLogin = jQuery(datosDeRespuesta).filter('#main');
					jQuery('#containerForMain').html(mainDeLogin);
				});
				jQuery('#navBusca').hide(); jQuery('#navLogin').hide(); jQuery('#navSignUp').hide();
				jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
					//This code runs when get isCompleted and IF the get was requesting login.html
					if(settingsObjeto.url === 'looks/login.html'){ // === means true without type coersion - the type and value most both be equal
						jQuery('form').submit(function(evento){
							evento.preventDefault(); //not making a submit (POST request) here. Let do it at look=micuenta
							var user = jQuery('#usernameId').val();
							var pass = jQuery('#passwordId').val(); 
							jQuery(window.location).attr('href', window.location.pathname + '?look=micuenta&user=' + user + '&pass=' + pass);
						});
					}						
				});	
			break;	
			case 'micuenta': 
				var user = jQuery.urlParam('user');
				var pass = jQuery.urlParam('pass');
				jQuery.post('uiTests/showCuentaToUser.php', {user:user, pass:pass}, "json" )
				.done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){
					alert(datosJSONStr);
					datosJSObj = JSON.parse(datosJSONStr);  
					alert('datos json parsed as a js obj ' + datosJSObj + '\ndatos.id ' + datosJSObj.id+ '\nxhrObjetoForDONE status ' + xhrObjetoForDONE.status + '\nxhrObjetoForDONE statustext ' + xhrObjetoForDONE.statusText + '\nestatusForDONE ' + estatusForDONE );
				    if(datosJSObj.id == -1){ //datos recieves id=-1 when user cannot be logged.
						jQuery(window.location).attr('href', window.location.pathname + '?look=login');
				    }else{ // Otherwise user is logged - datos has all the user data to show in micuenta
					    jQuery.get('looks/micuenta.html', function(datosDeRespuesta, estatus, xhrObjeto){
						    var mainDeMiCuenta = jQuery(datosDeRespuesta).filter('#main');
						    jQuery('#containerForMain').html(mainDeMiCuenta);
					    });						
				    }
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
							var $toToggle = jQuery(evento.currentTarget).children('.hidable');
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

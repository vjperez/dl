jQuery(document).ready(
	function(){
		var look = jQuery.urlParametro('look');
		switch(look) {
			case 'busca':
				jQuery('#navBusca').hide();

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
			//This look completely depends on the amount of options to be presented.  It doesn't make
			//much sense to do a GET request for html, like other looks.  It is better to build mainDeOpciones
			//concatenating strings inside an each loop, with the requested JSON datos.
				var que = jQuery.urlParametro('que');      //funcion transforma que into a string with : as delimiter between  words
				var donde = jQuery.urlParametro('donde');  //funcion transforma que into a string with : as delimiter between  words
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
								jQuery.each(pares, function(nepeId, fotoSrc){
									mainDeOpciones += '<a href="portada.html?look=profile&meId=' + nepeId + '">' +
									'<img class="ancho-sensi-cell-1de2 ancho-sensi-ipad-1de3 ancho-sensi-desk-1de4 alto-sensi-cell-1de2 alto-sensi-ipad-1de3 alto-sensi-desk-1de4 ver-borde" ';
									mainDeOpciones += ' src="imagenes/profile/subidas/' + fotoSrc + '">'  + 
									'</a>';
								});
							}); // each in trios
							mainDeOpciones += '</div>'; // <div class="ver-borde opcionesfotos">
						

					}); // each in datos
					mainDeOpciones += '</div>'; //  <div id="main" class="contenido margen">
					jQuery('#containerForMain').html(mainDeOpciones);
				})
				.fail(	jQuery.fallas  );
			break;
			case 'login':
				//remove navegation before requesting new html.  Less likely user will notice it going away.
				jQuery('#navBusca').hide(); jQuery('#navLogin').hide(); jQuery('#navSignUp').hide();
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
			break;
			case 'editDuenoShowNepes':
				//remove navegation before requesting new html.  Less likely user will notice it going away.
				jQuery('#navBusca').hide(); jQuery('#navLogin').hide(); jQuery('#navSignUp').hide();
				//get duenoId
				var duenoId = jQuery.urlParametro('duenoId');

				jQuery.dameLook('looks/editDuenoShowNepes.html');

				//once look is in, use jQuery to update look with profile values
				jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
					if(settingsObjeto.url === 'looks/editDuenoShowNepes.html'){
						jQuery.editDuenoShowNepes(duenoId);
					}//if
				});//ajaxComplete


			break;			
			case 'profile':
				//get meId then
				var meId = jQuery.urlParametro('meId');
				//request get JSON data for that meId
				jQuery.getJSON('escritos/getMicroEmpre.php', {meId:meId} )
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
				.fail(  jQuery.fallas  );//fail
			break;
			case 'creaDueno':
				//remove navegation before requesting new html.  Less likely user will notice it going away.
				jQuery('#navBusca').hide(); jQuery('#navLogin').hide(); jQuery('#navSignUp').hide();
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
			break;
			case 'creaNepe':
				//remove navegation before requesting new html.  Less likely user will notice it going away.
				jQuery('#navBusca').hide(); jQuery('#navLogin').hide(); jQuery('#navSignUp').hide();

				jQuery.dameLook('looks/creaNepe.html');

				jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
					if(settingsObjeto.url === 'looks/creaNepe.html'){
						//get duenoId
						var duenoId = jQuery.urlParametro('duenoId');
						//task 1 when ajax complete ; handle form submit and make post
						jQuery.handleCreaNepeSubmit(duenoId);
						//submit event listener and handler
					}//if
				});//ajaxComplete
			break;
			case 'updateNepe':
				//remove navegation before requesting new html.  Less likely user will notice it going away.
				jQuery('#navBusca').hide(); jQuery('#navLogin').hide(); jQuery('#navSignUp').hide();

				jQuery.dameLook('looks/updateNepe.html');

				jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
					if(settingsObjeto.url === 'looks/updateNepe.html'){
						//get nepeId
						var nepeId = jQuery.urlParametro('nepeId');  
						//get duenoId
						var duenoId = jQuery.urlParametro('duenoId');

						//task 1 when ajax complete get that data
						//alert('nepeId : ' + nepeId);
						jQuery.getJSON('escritos/getMicroEmpreData.php', {meId:meId} )
						.done(function(datos, estatusForDONE, xhrObjetoForDONE){
							jQuery.populateForm(datos);
						})
						.fail(  jQuery.fallas  );
													
						//task 2 when ajax complete ; handle form submit and make post
						jQuery.handleUpdateNepeSubmit(duenoId, meId);
						//submit event listener and handler
					}//if
				});//ajaxComplete
			break;			
			case 'faq':
				jQuery.dameLook('looks/faq.html');

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
				//jQuery(window.location).attr('href', window.location.pathname + '?look=busca');
				jQuery.dameLook('looks/lookIsNull.html');

			break;
			default :
				//jQuery(window.location).attr('href', window.location.pathname + '?look=busca');
				jQuery.dameLook('looks/default.html');
			break;
		}//switch

	}); // ready function and statement


/*
var pathname = window.location.pathname; // Returns path only- http://localhost/WebDevelopmentStuff/mio/portada.html - saca parametros viejos
var url      = window.location.href;     // Returns full URL - http://localhost/WebDevelopmentStuff/mio/portada.html - deja parametros viejos
var origin   = window.location.origin;   // Returns base URL - localhost/
*/

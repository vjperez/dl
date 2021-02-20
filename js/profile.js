jQuery.populateProfile = function(datos){
	//insert json data into profile look
	
	//var date = new Date(datos.revisado).toString();
	//alert('datos revisado: ' + datos.revisado + ' date: ' + date);
	//jQuery('#video h5').text('Revisado: ' + date.substring(0, -1+date.indexOf('00:00:00')));
	
	var date = new Date(datos.revisado);
	//alert(date);
	var opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	jQuery('#video h5').text('' + date.toLocaleDateString('es-ES', opciones)); 
	
	jQuery('#video h1').text(datos.nombre);
	
	//alert('url: ' + datos.videoUrl + '\nis Valid Video Url: ' + datos.isValidVideoUrl);
	if(datos.videoCode == 0){
	    jQuery('#video iframe').hide();
	}else if(datos.videoCode == 1){
		var str = datos.videoUrl;
		//alert( 'https://www.youtube.com/embed/' + str.substring(str.length - 11, str.length) );
		jQuery('#video iframe').attr('src', 'https://www.youtube.com/embed/' + str.substring(str.length - 11, str.length)); 		
	}else {		//  if(datos.videoCode == 2)
		//jQuery('#video iframe').attr('src', 'https://www.youtube.com/embed/' + '123456789');
		jQuery('#video iframe').attr('src', 'https://www.youtube.com/embed/' + '6qpudAhYhpc');  // hacker movie
	}
	
	
	//alert(datos.quienSocialHandle);
	if(datos.quienSocialHandle.tt != '')   jQuery('#quien h3.tt').text(datos.quienSocialHandle.tt);    // si no cambias valores, se quedan los de looks/profile.html
	if(datos.quienSocialHandle.fbk != '')  jQuery('#quien h3.fbk').text(datos.quienSocialHandle.fbk);
	if(datos.quienSocialHandle.igrm != '') jQuery('#quien h3.igrm').text(datos.quienSocialHandle.igrm);
	if(datos.quienSocialHandle.phn != '')  jQuery('#quien h3.phn').text(datos.quienSocialHandle.phn);
	//following code works when there are 5 or less images coming from getJSON.
	//the html is prepared for a max of 5 images, this code removes excess html when less than 5 images come
	//alert(datos.quienFotoSrc);
	jQuery('#quien #profilefotos img').each(function(index){
		if(index < datos.quienFotoSrc.length) { jQuery(this).attr('src', 'imagenes/profile/subidas/' + datos.quienFotoSrc[index] + '?v=' + Math.random() ); }
		else { jQuery(this).remove(); }
	});
	//alert(datos.cuando);
	if(datos.cuando.lun  != '') jQuery('#cuando td.lun').text(datos.cuando.lun);			// si no cambias valores, se quedan los de looks/profile.html
	if(datos.cuando.mar  != '') jQuery('#cuando td.mar').text(datos.cuando.mar);
	if(datos.cuando.mier != '') jQuery('#cuando td.mier').text(datos.cuando.mier);
	if(datos.cuando.jue  != '') jQuery('#cuando td.jue').text(datos.cuando.jue);
	if(datos.cuando.vier != '') jQuery('#cuando td.vier').text(datos.cuando.vier);
	if(datos.cuando.sab  != '') jQuery('#cuando td.sab').text(datos.cuando.sab);
	if(datos.cuando.dom  != '') jQuery('#cuando td.dom').text(datos.cuando.dom);
	//following code works when there are 10 or less 'que' coming from getJSON.
	//the html is prepared for a max of 10 'que', this code removes excess html when less than 10 'que' come
	//alert(datos.que);
	jQuery('#que li a').each(function(index){
		if(index < datos.que.length) {
			jQuery(this).text(datos.que[index]);
			jQuery(this).attr('href', window.location.pathname + '?look=opciones&que=' + encodeURIComponent(datos.que[index].replace(/ /g, '%')) + '&donde=');
		} else { jQuery(this).remove(); }
	});
	//following code works when there are 5 or less 'donde' coming from getJSON.
	//the html is prepared for a max of 5 'donde', this code removes excess html when less than 5 'donde' come
	//alert(datos.donde);
	jQuery('#donde li a').each(function(index){
		if(index < datos.donde.length) {
			jQuery(this).text(datos.donde[index]);
			jQuery(this).attr('href', window.location.pathname + '?look=opciones&que=' + '&donde=' + encodeURIComponent(datos.donde[index].replace(/ /g, '%')));
		}else { jQuery(this).remove(); }
	});
	//alert('a tu casa: ' + datos.atucasa + '\ntipo: ' + typeof datos.atucasa);
	var clase = 'no'; if(datos.atucasa) clase = 'si';
	jQuery('#donde h3 span').attr('class', clase);
	jQuery('#donde h3').append(clase);

	
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
				
	//hide, show on click
	jQuery.toggleOnClick();	
}
jQuery(document).ready(function(){

	//alert('logueado en navega js: ' + logueado);
	if(logueado){ 
		jQuery('#navLogout').css('visibility','visible').show();
		jQuery('#navHome').css('visibility','visible').show()  ;
		alert('navega js:\nshowing logout and home nav buttons for: \nlogueado=' + logueado);
	}else{
		jQuery('#navLogin').css('visibility','visible').show();     
		jQuery('#navSignup').css('visibility','visible').show();
		alert('navega js:\nshowing login and sign up nav buttons for:: \nlogueado=' + logueado);
	}
	
	let look = jQuery.urlParametro('look');
	switch(look){
		case 'busca':
			jQuery('#navBusca').addClass("seleccionado");
		break;
		case 'login':
			jQuery('#navLogin').addClass("seleccionado");
		break;
		case 'home':
		case 'administrar':
		case 'creaNepe':
		case 'updateNepe':
			jQuery('#navHome').addClass("seleccionado");
		break;
		case 'registro':
			jQuery('#navSignup').addClass("seleccionado");
		break;
		case 'faq':
			jQuery('#navFaq').addClass("seleccionado");
		break;

		case '':
			//alert('look vacio nav');
		break;
		case null:
			//alert('look null nav');
		case 'opciones':
		case 'viewNepe':
		default:
		break;
	}//switch

});//ready function and statement


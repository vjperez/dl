console.log('navButtons.js   [loading...]');

jQuery(document).ready(function(){

  console.log('logueado en navButtons.js: ' + logueado);

	//alert('logueado en navega js: ' + logueado);
	if(logueado){ 
		jQuery('#navLogout').show();
		jQuery('#navHome').show()  ;
		//alert('nav buttons js:\nshowing logout and home nav buttons for: \nlogueado=' + logueado);
	}else{
		jQuery('#navLogin').show();     
		//jQuery('#navSignup').show();   //showing only 1 of these at a time

		//alert('nav buttons js:\nshowing login and sign up nav buttons for:: \nlogueado=' + logueado);
	}
	
	let look = urlParametro('look');
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
			jQuery('#navLogin').hide();     
			jQuery('#navSignup').show();
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


console.log('navButtons.js   [loading...]');

function navButtonsWhenReady(){
  console.log('logueado en navButtons.js: ' + logueado);

	//alert('logueado en navega js: ' + logueado);
	if(logueado){ 
		document.querySelector('#navLogout').style.display = '';
		document.querySelector('#navHome').style.display = '';
		//alert('nav buttons js:\nshowing logout and home nav buttons for: \nlogueado=' + logueado);
	}else{
		document.querySelector('#navLogin').style.display = '';     
		//document.querySelector('#navSignup').style.display = '';   //showing only 1 of these at a time

		//alert('nav buttons js:\nshowing login and sign up nav buttons for:: \nlogueado=' + logueado);
	}
	
	let look = urlParametro('look');
	switch(look){
		case 'busca':
			document.querySelector('#navBusca').classList.add("seleccionado");
		break;
		case 'login':
			document.querySelector('#navLogin').classList.add("seleccionado");
		break;
		case 'home':
		case 'administrar':
		case 'creaNepe':
		case 'updateNepe':
			document.querySelector('#navHome').classList.add("seleccionado");
		break;
		case 'registro':
			document.querySelector('#navLogin').style.display = 'none';     
			document.querySelector('#navSignup').style.display = '';
			document.querySelector('#navSignup').classList.add("seleccionado");
		break;
		case 'faq':
			document.querySelector('#navFaq').classList.add("seleccionado");
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

}



isReady( navButtonsWhenReady );

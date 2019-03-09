jQuery.haveAtLeast1Handle = function(){
	if(jQuery.isVacioStr(jQuery('form#createMicroEmpreForm input[name=red1]').val()) &&  jQuery.isVacioStr(jQuery('form#createMicroEmpreForm input[name=red2]').val()) &&
	   jQuery.isVacioStr(jQuery('form#createMicroEmpreForm input[name=red3]').val()) &&  jQuery.isVacioStr(jQuery('form#createMicroEmpreForm input[name=red4]').val()) ) {
		jQuery.feedback('fieldset#socialHandleFieldset h3', 'Minimo 1 contacto');
		jQuery('fieldset#socialHandleFieldset').addClass('warn');
		return false;
	}else{
		jQuery.feedback('fieldset#socialHandleFieldset h3', '');
		jQuery('fieldset#socialHandleFieldset').removeClass('warn');
		return true;
	}
}



jQuery.have5OrLessFotos = function(){
	if(jQuery('form#createMicroEmpreForm input#fotosId')[0].files.length > 5 ){
		jQuery.feedback('fieldset#fotoSrcFieldset h3', 'Maximo 5 fotos');
		jQuery('fieldset#fotoSrcFieldset').addClass('warn');
		return false;
	}else{
		jQuery.feedback('fieldset#fotoSrcFieldset h3', '');
		jQuery('fieldset#fotoSrcFieldset').removeClass('warn');
		return true;
	}
}




var $redInputs = jQuery('form#createMicroEmpreForm input[name^=red]');
$redInputs.on('change', function(evento){
	jQuery.haveAtLeast1Handle();
});
	
	
	

var $fotoInput = jQuery('form#createMicroEmpreForm input#fotosId');
$fotoInput.on('change', function(evento){
	jQuery.have5OrLessFotos();
});
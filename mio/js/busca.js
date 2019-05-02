jQuery.handleQueDondeSubmit = function(){
	jQuery('form').submit(function(evento){
		evento.preventDefault(); //not making a submit (GET request) here. Lets do it at look=opciones
		var que = jQuery('#queId').val();
		que = jQuery.cleanStr(que); // clean function returns cleaned str
		var donde = jQuery('#dondeId').val();
		donde = jQuery.cleanStr(donde); // clean function returns cleaned str
		//alert('que=(' + que  + ')\ndonde=(' +  donde + ')');
		if(que.length > 0 || donde.length > 0){//i'm looking for a non empty cleaned str
			jQuery(window.location).attr('href', window.location.pathname + '?look=opciones&que=' + que + '&donde=' + donde);
		}else{
			jQuery.feedback('form#queDondeForm h3', 'Buscas algo?', 'downdelayup');
		}
	});
}

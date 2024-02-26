//menu behavior
jQuery(document).on('click', '.menuHidableDriver', function(evento){
	if (jQuery('.menuHidableTarget').is(':visible')) {
		jQuery.hideMenu();
	}else{
		jQuery.showMenu();
	}
});

jQuery.hideMenu = function(){
	jQuery('.menuHidableTarget').hide();
	jQuery('.menuHidableDriver').find('.fa-window-close').hide();
	jQuery('.menuHidableDriver').find('.fa-bars').css('visibility','visible').show();
}

jQuery.showMenu = function(){
	jQuery('.menuHidableTarget').show()
	jQuery('.menuHidableDriver').find('.fa-bars').hide();
	jQuery('.menuHidableDriver').find('.fa-window-close').show();
}

jQuery.hideThemSections = function(){
	jQuery('.notHidable').next('.hidable').hide();
	jQuery('.notHidable').find('.fa-chevron-circle-up').hide();
	jQuery('.notHidable').find('.fa-chevron-circle-down').show();
}

jQuery.showThemSections = function(){
	jQuery('.notHidable').next('.hidable').show();
	jQuery('.notHidable').find('.fa-chevron-circle-down').hide();
	jQuery('.notHidable').find('.fa-chevron-circle-up').show();
}

jQuery(document).on('click', '.notHidable', function(evento){
	if (jQuery(evento.currentTarget).next('.hidable').is(':visible')) {

		jQuery(evento.currentTarget).next('.hidable').hide(); 
		//jQuery(evento.currentTarget).css({border:'none', borderBottomWidth:'1pt', borderBottomStyle:'solid', borderBottomColor:'#dadada'});
		jQuery(evento.currentTarget).find('.fa-chevron-circle-up').hide();
		jQuery(evento.currentTarget).find('.fa-chevron-circle-down').show();
	}else{

		jQuery(evento.currentTarget).next('.hidable').show(); 
		//jQuery(evento.currentTarget).css({border:'none'});
		jQuery(evento.currentTarget).find('.fa-chevron-circle-down').hide();
		jQuery(evento.currentTarget).find('.fa-chevron-circle-up').show();
	}
});

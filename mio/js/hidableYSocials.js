//this code now runs after an ajaxComplete in the faq section of getMainContent.js
jQuery(document).ready(function(){
		var $todosLosNotHidable = jQuery('.notHidable');
		var $todosLosHidable = jQuery('.hidable');
		
		$todosLosHidable.hide();

		$todosLosNotHidable.on('click', function(evento){
			var $toToggle = jQuery(evento.currentTarget).children('.hidable');
			$toToggle.toggle();
		});


		//socials
		var $icon = jQuery('div#quien ul li').click(function(evento){
			evento.preventDefault();
			jQuery('div#quien ul li img').removeClass('current');
			var $imgToFocus = jQuery(evento.currentTarget).find('img');
			var $socialClass = $imgToFocus.attr('class'); // grab the name this class, used to select h3 with same class
			$imgToFocus.addClass('current');
			
			jQuery('div#quien h3').removeClass('current');
			jQuery('div#quien h3.' + $socialClass).addClass('current');
		});
	});
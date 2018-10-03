jQuery(document).ready(
	function(){
		var $todosLosNotHidable = jQuery('.notHidable');
		var $todosLosHidable = jQuery('.hidable');
		
		$todosLosHidable.hide();

		$todosLosNotHidable.on('click', function(evento){
			var $toToggle = jQuery(evento.currentTarget).children('.hidable');
			$toToggle.toggle()
		});			
		
	}
);
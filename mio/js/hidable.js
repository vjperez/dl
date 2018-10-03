jQuery(document).ready(
	function(){
		var $todosLosPrimario = jQuery('.primario');
		var $todosLosHidable = jQuery('.hidable');
		
		$todosLosHidable.hide();

		$todosLosPrimario.on('click', function(evento){
			var $toToggle = jQuery(evento.currentTarget).children('.hidable');
			$toToggle.toggle()
		});			
		
	}
);
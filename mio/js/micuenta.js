jQuery(document).ready(
	function(){
		var $todosFieldsetPrimario = jQuery('fieldset.primario');
		var $todosFieldsetSecundario = jQuery('fieldset.secundario');
		
		$todosFieldsetSecundario.hide();
		/*
		jQuery('div#cuando').on('click', function(){
			$tableCuandoHidable.toggle();
			/x* same code
			if($tableCuandoHidable.is(":visible")){
				$tableCuandoHidable.hide();
			}else{
				$tableCuandoHidable.show();
			}
			*x/
		});
		
		
		jQuery('div#que').on('click', function(){
			$ulQueHidable.toggle();
		});	
		*/
		
		$todosFieldsetPrimario.on('click', function(evento){
			var $fieldsetToToggle = jQuery(evento.currentTarget).children('fieldset.hidable');
			//if($fieldsetToToggle){$fieldsetToToggle.toggle()}
			$fieldsetToToggle.toggle()
		});			
		
	}
);
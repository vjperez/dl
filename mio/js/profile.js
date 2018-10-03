jQuery('document').ready(
	function(){
		var $cuandoHidable = jQuery('table#cuandoHidable');
		var $queHidable = jQuery('ul#queHidable');
		var $dondeHidable = jQuery('div#dondeHidable');
		
		$cuandoHidable.hide();
		$queHidable.hide();
		$dondeHidable.hide();
		
		jQuery('div#cuando').on('click', function(){
			$cuandoHidable.toggle();
			/* same code
			if($tableCuandoHidable.is(":visible")){
				$tableCuandoHidable.hide();
			}else{
				$tableCuandoHidable.show();
			}
			*/
		});
		
		
		jQuery('div#que').on('click', function(){
			$queHidable.toggle();
		});	

		
		jQuery('div#donde').on('click', function(){
			$dondeHidable.toggle();
		});			
		
	}
);
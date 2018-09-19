jQuery(
	function(){
		var $tableCuandoHidable = jQuery('table#cuandoHidable');
		var $ulQueHidable = jQuery('ul#queHidable');
		var $divDondeHidable = jQuery('div#dondeHidable');
		
		$tableCuandoHidable.hide();
		$ulQueHidable.hide();
		$divDondeHidable.hide();
		
		jQuery('div#cuando').on('click', function(){
			$tableCuandoHidable.toggle();
			/* same code
			if($tableCuandoHidable.is(":visible")){
				$tableCuandoHidable.hide();
			}else{
				$tableCuandoHidable.show();
			}
			*/
		});
		
		
		jQuery('div#que').on('click', function(){
			$ulQueHidable.toggle();
		});	

		
		jQuery('div#donde').on('click', function(){
			$divDondeHidable.toggle();
		});			
		
	}
);
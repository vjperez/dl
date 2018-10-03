jQuery('document').ready(
	function(){
		var $cuandoHidable = jQuery('table#cuandoHidable');
		var $queHidable = jQuery('ul#queHidable');
		var $dondeHidable = jQuery('div#dondeHidable');
		var $videoHidable = jQuery('div#videoHidable');
		var $quienHidable = jQuery('div#quienHidable');
		
		$cuandoHidable.hide();
		$queHidable.hide();
		$dondeHidable.hide();
		$videoHidable.hide();
		$quienHidable.hide();		
		
		
		jQuery('div#cuando').on('click tap', function(){
			$cuandoHidable.toggle();
			/* same code as toggle
			if($tableCuandoHidable.is(":visible")){
				$tableCuandoHidable.hide();
			}else{
				$tableCuandoHidable.show();
			}
			*/
		});
		
		
		jQuery('div#que').on('click tap', function(){
			$queHidable.toggle();
		});	

		
		jQuery('div#donde').on('click tap', function(){
			$dondeHidable.toggle();
		});			


		jQuery('div#video').on('click tap', function(){
			$videoHidable.toggle();
		});	

		
		jQuery('div#quien').on('click tap', function(){
			$quienHidable.toggle();
		});		
		
		
	}
);
<?php  
	$fotosDefault = array('negrodot.png', 'reddot.png', 'greendot.png', 'bluedot.png');
	$fotos = array();
	$recurso_fotos = pg_execute($cnx, "preparadoQueryGetFotos", array($nepe_id));
	if($recurso_fotos){
		$fila = pg_fetch_row($recurso_fotos);
		if( is_null($fila[0]) ){ // when the query agg no fotos, postgre sends null
			$fotos = $fotosDefault;
		}else{
			$fotos = json_decode( $fila[0] );// if the query responded with a non null json_agg, then decode them into an array 
		}
	}else{
		pg_close($cnx); 
		throw new Exception('Mal query.  Sin RECURSO para preparadoQueryGetFotos en: ' . __FILE__  );	
	}
?>
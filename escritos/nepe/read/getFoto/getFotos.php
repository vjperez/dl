<?php  
function getFotos($cnx, $nepe_id){
	$fotos = array();
	$recurso_fotos = pg_execute($cnx, "preparadoQueryGetFotos", array($nepe_id));
	if($recurso_fotos){
		if( $fila = pg_fetch_row($recurso_fotos) ){ 
			$fotos = json_decode( $fila[0] );
		}else{ 
			$fotos = array('negrodot.png', 'reddot.png', 'greendot.png', 'bluedot.png');
		}
/*
		$fila = pg_fetch_row($recurso_fotos);
		if( is_null($fila[0]) ){ // when the query agg no fotos, postgre sends 1 null row
			$fotos = $fotosDefault;
		}else{
			$fotos = json_decode( $fila[0] );// if the query responded with a non null json_agg, then decode them into an array 
		}
*/		
	}else{
		pg_close($cnx); 
		throw new Exception('Mal query.  Sin RECURSO para preparadoQueryGetFotos en: ' . __FILE__  );	
	}
	return $fotos;
}
?>
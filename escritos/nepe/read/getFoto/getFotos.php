<?php  
function getFotos($cnx, $nepe_id){
	$fotos = array(); // want to return array with foto name
	$recurso_fotos = pg_execute($cnx, "preparadoQueryGetFotos", array($nepe_id));
	if($recurso_fotos){
		if( $fila = pg_fetch_row($recurso_fotos) ){ 
			$fotos = json_decode( $fila[0] );

			//concatenating nepe_id to each foto name in the array (except first)
			//for an array with no fotos, i dont want only the nepe_id in the array
			//so concatenate nepe_id to first foto name, only if, there is at least 1 foto 
			//get back the array to return it, using explode
			$fotosStr = implode(','.$nepe_id, $fotos);
			if( count($fotos ) > 0) $fotosStr = $nepe_id . $fotosStr;
			$fotos = explode(',',$fotosStr);
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
	return $fotos;// array
}
?>
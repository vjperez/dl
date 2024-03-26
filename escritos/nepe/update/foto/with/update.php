<?php
require_once 'updateFotoQueries.php';
$fotos = array();
$recurso_fotos = pg_execute($cnx, "preparadoQueryGetFotos", array($nepe_id));
if($recurso_fotos){
	$fila = pg_fetch_row($recurso_fotos);
	if( is_null($fila[0]) ){ // when the query agg no fotos, postgre sends null
		
	}else{
		$fotos = json_decode( $fila[0] );// if the query responded with a non null json_agg, then decode them into an array 
	}
}else{
	pg_close($cnx); 
	throw new Exception('Mal query.  Sin RECURSO para preparadoQueryGetFotos en: ' . __FILE__  );	
}



if($recurso){
	$respuesta = json_decode('{"actualizado":true, "feedback":"Nepe actualizado, incluyendo fotos.", "nepeId":' . $nepe_id . '}');
	pg_close($cnx);
	echo json_encode ($respuesta);
}else{
	pg_close($cnx);
	throw new Exception('Mal query.  Sin RECURSO, para preparedQueryUpdateNepe en: ' . __FILE__);
}
?>





$recurso = pg_execute($cnx, "preparedQueryUpdateNepe", array($nepe_id
));
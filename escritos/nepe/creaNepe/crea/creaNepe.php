<?php
require_once 'creaNepeQuery.php'; // defines recurso
if($recurso){
	$recurso = pg_query($cnx, $querySelectNepeIdCurrval);
	$fila = pg_fetch_row($recurso);
	$nepe_id = $fila[0];
	require_once 'bregandoQuery.php';  // redefines recurso
	if($recurso){
		// crea nepe va bien hasta ahora pero con MediaFotoUrl vacio
		
		// still need to update MediaFotoUrl so dont build respuesta, close connection nor echo it here
		// $respuesta will be built in updateMediaFotoUrl.php
		
		/*
		$respuesta = json_decode('{"nepeYBregandoCreado":true, "feedback":"Nepe y bregando, rows creadas.", "nepeId":' . $nepe_id . '}');
		pg_close($cnx); //maybe not needed but doesn't hurt
		echo json_encode ($respuesta); 
		*/
	}else{
		pg_close($cnx); //maybe not needed but doesn't hurt
		throw new Exception('Mal query.  Sin RECURSO, para queryInsertBregando en: '  . __FILE__ );
	}
}else{
	pg_close($cnx); //maybe not needed but doesn't hurt
	throw new Exception('Mal query.  Sin RECURSO, para queryCreaNepe en: ' . __FILE__ );
}
?>

<?php
require_once 'creaNepeQuery.php';
$recurso = pg_query($cnx, $queryCreaNepeReturningId);
if($recurso){
	$fila = pg_fetch_row($recurso);
	$nepe_id = $fila[0];
	require_once 'bregandoQuery.php';
	$recurso = pg_query($cnx, $queryInsertBregando);
	if($recurso){
		$respuesta = json_decode('{"creado":true, "feedback":"Nepe y bregando table, actualizada.", "nepeId":' . $nepe_id . '}');
		pg_close($cnx); //maybe not needed but doesn't hurt
		echo json_encode ($respuesta);
	}else{
		pg_close($cnx); //maybe not needed but doesn't hurt
		throw new Exception('Mal query.  Sin RECURSO, para queryInsertBregando en: '  . __FILE__ );
	}
}else{
	pg_close($cnx); //maybe not needed but doesn't hurt
	throw new Exception('Mal query.  Sin RECURSO, para queryCreaNepeReturningId en: ' . __FILE__ );
}
?>

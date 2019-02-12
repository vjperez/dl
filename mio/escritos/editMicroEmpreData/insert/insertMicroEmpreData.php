<?php
require_once 'insertMicroEmpreDataQuery.php';
$recurso = pg_query($cnx, $queryInsertMicroEmpreReturningId);
if($recurso){
	$fila = pg_fetch_row($recurso);
	$micro_empre_id = $fila[0];
	$recurso = pg_query($cnx, $queryInsertBregando);
	if($recurso){
		$respuesta = json_decode('{"actualizado":true, "feedback":"Microempresa  y bregando table, actualizada.", "meId":' . $micro_empre_id . '}');
		pg_close($cnx); //maybe not needed but doesn't hurt
		echo json_encode ($respuesta);
	}else{
		pg_close($cnx); //maybe not needed but doesn't hurt
		throw new Exception('Mal query.  Sin RECURSO, para queryInsertBregando Query');
	}
}else{
	pg_close($cnx); //maybe not needed but doesn't hurt
	throw new Exception('Mal query.  Sin RECURSO, para queryInsertMicroEmpreReturningId Query');
}
?>

<?php
require_once 'insertNepeQuery.php'; 

$recurso = pg_execute($cnx, "preparadoQueryInsertNepe", array($nombre, $cuando,  $su_casa, $desde_casa));

if($recurso){
	$recurso = pg_query($cnx, $querySelectNepeInsertedId); // redefines recurso
	$fila = pg_fetch_row($recurso);
	$nepe_inserted_id = $fila[0];
	require_once 'duenoNepeQuery.php'; 
	$recurso = pg_execute($cnx, "preparadoQueryInsertDuenoNepe", array($dueno_id, $nepe_inserted_id));
	if($recurso){
		$respuesta = json_decode('{"nepeMainCreado":true}');
		pg_close($cnx);
		echo json_encode ($respuesta);
	}else{
		pg_close($cnx);
		throw new Exception('Mal query.  Sin RECURSO, para preparadoQueryInsertDuenoNepe en: '  . __FILE__ );
	}
}else{
	pg_close($cnx);
	throw new Exception('Mal query.  Sin RECURSO, para preparadoQueryInsertNepe en: ' . __FILE__ );
}
?>

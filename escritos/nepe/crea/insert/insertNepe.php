<?php
session_start();
if( isset($_SESSION['dueno_id']) && isset($_SESSION['own_nepes_with_ids']) ){
	$to_be_inserted_nepe_index = sizeof( $_SESSION['own_nepes_with_ids'] );
	require_once 'insertNepeQuery.php'; 
	$recurso = pg_execute($cnx, "preparadoQueryInsertNepe", array($nombre, $cuando,  $su_casa, $desde_casa));
	if($recurso){
		$recurso = pg_query($cnx, $querySelectNepeInsertedId); // redefines recurso
		$fila = pg_fetch_row($recurso);
		$inserted_nepe_id = $fila[0];
		$dueno_id = $_SESSION['dueno_id'];
		require_once 'duenoNepeQuery.php'; 
		$recurso = pg_execute($cnx, "preparadoQueryInsertDuenoNepe", array($dueno_id, $inserted_nepe_id));
		if($recurso){
			$respuesta = json_decode('{"nepeMainCreado":true, "index":' + $to_be_inserted_nepe_index + '}');
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
}else{
	throw new Exception('Session dueno_id o own_nepes_with_ids, no seteada en: ' . __FILE__  );
}
?>

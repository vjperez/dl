<?php
session_start();
if(isset($_SESSION['dueno_id'])){
	if(isset( $_REQUEST['userNumber'] )){
		$dueno_to_query = $_REQUEST['userNumber'];  // cuando el admin necesita el nombre de otro userNumber
	}else{
		$dueno_to_query = $_SESSION['dueno_id'];  // cuando se usa nombre desde home, ahi, no se postea un userNumber
	}

	require_once '../conecta/conecta.php';
	
	require_once 'read/nombreQuery.php';
	$recurso = pg_execute($cnx, "preparadoQueryNombre", array($dueno_to_query));
	if($recurso){
		$fila = pg_fetch_row($recurso);
		$elUsername = $fila[0];
		
		pg_close($cnx);
		echo json_encode($elUsername);
	}else{
		pg_close($cnx);
		throw new Exception('Mal query.  Sin RECURSO para preparadoQueryNombre en: ' . __FILE__  );
	}
}else{
	throw new Exception('Session no seteada en: ' . __FILE__  );
}
?>

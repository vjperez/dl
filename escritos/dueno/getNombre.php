<?php
session_start();
if(isset($_SESSION['dueno_id'])){
	if(isset( $_REQUEST['userNumber'] )){
		$dueno_to_query = $_REQUEST['userNumber'];
	}else{
		$dueno_to_query = $_SESSION['dueno_id'];
	}

	require_once 'escritos/conecta/conecta.php';
	
	require_once 'escritos/read/nombreQuery.php';
	$recurso = pg_execute($cnx, "preparadoQueryNombre", array($dueno_to_query));
	if($recurso){
		$fila = pg_fetch_row($recurso);
		$elUsername = $fila[0];
		
		pg_close($cnx);
		echo json_encode($elUsername);
	}else{
		pg_close($cnx); //maybe not needed but doesn't hurt
		throw new Exception('Mal query.  Sin RECURSO para preparadoQueryNombre en: ' . __FILE__  );
	}
}else{
	throw new Exception('Session no seteada en: ' . __FILE__  );
}
?>

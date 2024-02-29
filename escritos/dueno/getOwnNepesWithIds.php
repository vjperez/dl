<?php
session_start();
if(isset($_SESSION['dueno_id'])){
	if(isset( $_REQUEST['userNumber'] )){
		$dueno_to_query = $_REQUEST['userNumber']; 
	}else{
		$dueno_to_query = $_SESSION['dueno_id'];
	}

	//conecta al db
	require_once '../conecta/conecta.php';
	//i am sure i have a connection, because an exception was NOT thrown at conecta

	require_once 'read/ownNepesWithIdsQuery.php';
	$recurso = pg_execute($cnx, "preparadoQueryNepesWithIds", array($dueno_to_query));
	if($recurso){
	    $own_nepes_with_ids = array();
		$index = 0;
		while($nepe = pg_fetch_row($recurso) ){
			$own_nepes_with_ids[$index]['nepeId'] = json_decode($nepe[0]);	// nepe[0] is a nepe id
			$own_nepes_with_ids[$index]['nepeNombre'] = $nepe[1];			// nepe[1] is a nepe nombre
			$index++;
		}
		pg_close($cnx);
		echo json_encode($own_nepes_with_ids);
		//Store own nepes on session in json format
		$_SESSION['own_nepes_with_ids'] = $own_nepes_with_ids; 
	}else{
		pg_close($cnx);
		throw new Exception('Mal query.  Sin RECURSO para preparadoQueryNepesWithIds en: ' . __FILE__  );
	}
}else{
	throw new Exception('Session no seteada en: ' . __FILE__  );
}
?>

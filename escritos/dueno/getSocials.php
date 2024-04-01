<?php
//gets all social for a given dueno_id
session_start();
if(isset($_SESSION['dueno_id'])){
	$dueno = $_SESSION['dueno_id'];
	
	require_once '../conecta/conecta.php';
	
	require_once 'read/socialsQuery.php';
	$recurso = pg_execute($cnx, "preparadoQuerySocials", array($dueno));
	if($recurso){
		$social_array = array();
		if($socialFila = pg_fetch_row($recurso)){
			$social_array = json_decode( $socialFila[0] );	
		}
		pg_close($cnx);
		echo json_encode($social_array);
	}else{
		pg_close($cnx);
		throw new Exception('Mal query.  Sin RECURSO para preparadoQuerySocials en: ' . __FILE__  );
	}
}else{
	throw new Exception('Session no seteada en: ' . __FILE__  );
}
?>

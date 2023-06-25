<?php
session_start();
if(isset($_SESSION['dueno_id'])){
	if(isset( $_REQUEST['userNumber'] )){
		$dueno_to_query = $_REQUEST['userNumber']; 
	}else{
		$dueno_to_query = $_SESSION['dueno_id'];
	}


	//conecta al db
	require_once 'conecta/conecta.php';
	//i am sure i have a connection, because an exception was NOT thrown at conecta

	require_once 'read/nepesWithIdsQuery.php';
	$ownNepes = array();	// to store this user's nepe ids
	$nepe =  array();
	$nepes = array();
	$recurso = pg_execute($cnx, "preparadoQueryNepesWithIds", array($dueno_to_query));
	if($recurso){
		$index = 0;
		while($nepe = pg_fetch_row($recurso) ){
			$ownNepes[$index] = $nepe[0];
			$nepes[$index]['nepeId'] = json_decode($nepe[0]);
			$nepes[$index]['nepeNombre'] = $nepe[1];
			$index++;
		}
		pg_close($cnx);
		echo json_encode($nepes);
		//Store own nepes on session in json format
		$_SESSION['own_nepes'] = json_encode($ownNepes); 
	}else{
		pg_close($cnx); //maybe not needed but doesn't hurt
		throw new Exception('Mal query.  Sin RECURSO para preparadoQueryNepesWithIds en: ' . __FILE__  );
	}
}else{
	throw new Exception('Session no seteada en: ' . __FILE__  );
}
?>

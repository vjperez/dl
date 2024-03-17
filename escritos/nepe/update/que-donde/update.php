<?php
//session_start();
if( isset($_SESSION['dueno_id']) && isset($_SESSION['own_nepes_with_ids']) ){
	$own_nepes_with_ids = $_SESSION['own_nepes_with_ids'];
	$nepe_id = $own_nepes_with_ids[$index]['nepeId'];
	
	
	require_once 'updateQueries.php';
	$toBeIdsArr = getOrCreateToBeIds('que', $queToBeFrasesArr, $cnx);
	$areIdsArr  = getCurrentIds('que',   $nepe_id, $cnx);
	makeAndRemoveLinks('que',   $nepe_id, $cnx);
	
	$toBeIdsArr = getOrCreateToBeIds('donde', $dondeToBeFrasesArr, $cnx);
	$areIdsArr  = getCurrentIds('donde',   $nepe_id, $cnx);
	makeAndRemoveLinks('donde',   $nepe_id, $cnx);
	
	$respuesta = json_decode('{"nepeQue-DondeUpdated":true}');
	pg_close($cnx);
	echo json_encode ($respuesta);
}else{
	throw new Exception('Session dueno_id o own_nepes_with_ids, no seteada en: ' . __FILE__  );
}
?>

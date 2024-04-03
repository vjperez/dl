<?php
//session_start();
if( isset($_SESSION['dueno_id']) && isset($_SESSION['own_nepes_with_ids']) ){
	$own_nepes_with_ids = $_SESSION['own_nepes_with_ids'];
	$nepe_id = $own_nepes_with_ids[$index]['nepeId'];
	
	
	require_once 'update/que-donde/updateQueries.php';
	prepareToBeIdsQueries('Que', $cnx);
	$toBeIdsArr = getOrCreateToBeIds('Que', $queToBeFrasesArr, $cnx);
	prepareCurrentIdsQueries('Que', $cnx);
	$areIdsArr  = getCurrentIds('Que',   $nepe_id, $cnx);
	prepareMakeRemoveQueries('Que', $cnx);
	makeAndRemoveLinks('Que', $nepe_id, $areIdsArr, $toBeIdsArr, $cnx);
	
	prepareToBeIdsQueries('Donde', $cnx);
	$toBeIdsArr = getOrCreateToBeIds('Donde', $dondeToBeFrasesArr, $cnx);
	prepareCurrentIdsQueries('Donde', $cnx);
	$areIdsArr  = getCurrentIds('Donde',   $nepe_id, $cnx);
	prepareMakeRemoveQueries('Donde', $cnx);
	makeAndRemoveLinks('Donde', $nepe_id, $areIdsArr, $toBeIdsArr, $cnx);
	
	
	$respuesta->queDondeUpdated = true;
	//$respuesta = json_decode('{"nepeQue-DondeUpdated":true}');
	//pg_close($cnx);
	//echo json_encode ($respuesta);
}else{
	throw new Exception('Session dueno_id o own_nepes_with_ids, no seteada en: ' . __FILE__  );
}
?>

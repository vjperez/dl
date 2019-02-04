<?php
//saca los valores de GET
$duenoId = $_GET['duenoId'];
//conecta al db
require_once 'conecta/conecta.php';
//i am sure i have a connection, because an exception was NOT thrown at conecta

require_once 'getMicroEmpreIdsForDueno/getMicroEmpreIdsForDuenoQuery.php';
$result = array();
$recurso = pg_query($cnx, $query);
if($recurso){




	$result = pg_fetch_row($recurso);
	$profile['microEmpreId'] = json_decode($result[0]);
	$profile['nombre'] = $result[1];
	$profile['revisado'] = $result[2];
	$profile['videoUrl'] = $result[3];
	$profile['quienSocialHandle'] = json_decode($result[4]);
	$profile['quienFotoSrc'] = json_decode($result[5]);
	$profile['cuando'] = json_decode($result[6]);
	$profile['que'] = json_decode($result[7]);
	$profile['donde'] = json_decode($result[8]);
	$profile['atucasa'] = json_decode($result[9]);
//Send data from server in json format
	echo json_encode($profile);
}else{
	throw new Exception('Mal query.  Sin RECURSO.');
	//echo "<li>Error, pg_query, no produjo un recurso para result... en getMicroEmpreData</li>";
}
pg_close($cnx); //maybe not needed but doesn't hurt

?>

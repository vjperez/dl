<?php
require_once 'updateMicroEmpreDataQuery.php';
$recurso = pg_query($cnx, $query);
if($recurso){
	$respuesta = json_decode('{"actualizado":true, "feedback":"Microempresa actualizada.", "meId":' . $micro_empre_id . '}');
	pg_close($cnx); //maybe not needed but doesn't hurt
	echo json_encode ($respuesta);
}else{
	pg_close($cnx); //maybe not needed but doesn't hurt
	throw new Exception('Mal query.  Sin RECURSO, para query updateMicroEmpreDataQuery');
}
?>

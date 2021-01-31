<?php
require_once 'updateNepeQuery.php';
if($recurso){
	$respuesta = json_decode('{"actualizado":true, "feedback":"Nepe actualizado, incluyendo fotos.", "nepeId":' . $nepe_id . '}');
	pg_close($cnx); //maybe not needed but doesn't hurt
	echo json_encode ($respuesta);
}else{
	pg_close($cnx); //maybe not needed but doesn't hurt
	//echo $query;
	throw new Exception('Mal query.  Sin RECURSO, para query updateNepeQuery en: ' . __FILE__);
}
?>

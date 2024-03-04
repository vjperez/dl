<?php
require_once 'updateNepeQuery.php';
if($recurso){
	$respuesta = json_decode('{"actualizado":true, "feedback":"Nepe actualizado, incluyendo fotos.", "nepeId":' . $nepe_id . '}');
	pg_close($cnx);
	echo json_encode ($respuesta);
}else{
	pg_close($cnx);
	throw new Exception('Mal query.  Sin RECURSO, para preparedQueryUpdateNepe en: ' . __FILE__);
}
?>

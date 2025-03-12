<?php
require_once 'updateMediaFotoUrlQuery.php';
$recurso = pg_execute($cnx, "preparedQueryUpdateFotoUrl", array($mediaFotoUrlPosgreArray, $nepe_id));
if($recurso){
	$respuesta   = json_decode('{"nepeYBregandoCreado":true,  "mediaFotoUrlActualizado":true,  "feedback":"Nepe y bregando, rows creadas. MediaFotoUrl actualizado.", "nepeId":' . $nepe_id . '}');
	pg_close($cnx);
	echo json_encode ($respuesta);
}else{
	pg_close($cnx);
	//echo $query;
	throw new Exception('Mal query.  Sin RECURSO, para updateMediaFotoUrlQuery  en : '  .  __FILE__);
}
?>

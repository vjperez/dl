<?php
require_once 'updateMediaFotoUrlQuery.php';
$recurso = pg_query($cnx, $query);
if($recurso){
	//$respuesta is coming as array from creaNepe so no need to decode it.
	//$respuesta = json_decode('{"actualizado":true, "feedback":"Media Foto Url actualizado.", "nepeId":' . $nepe_id . '}');
	
	$respuesta   = json_decode('{"nepeYBregandoCreado":true,  "mediaFotoUrlActualizado":true,  "feedback":"Nepe y bregando, rows creadas. MediaFotoUrl actualizado.", "nepeId":' . $nepe_id . '}');
	pg_close($cnx); //maybe not needed but doesn't hurt
	echo json_encode ($respuesta);
}else{
	pg_close($cnx); //maybe not needed but doesn't hurt
	//echo $query;
	throw new Exception('Mal query.  Sin RECURSO, para query '  .  $query  .  ' en : '  .  __FILE__);
}
?>

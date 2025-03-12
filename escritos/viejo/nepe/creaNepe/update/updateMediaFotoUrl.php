<?php
require_once 'updateMediaFotoUrlQuery.php';
if($recurso){
	//$respuesta which was not built on creaNepe.php
	
	$respuesta   = json_decode('{"nepeYBregandoCreado":true,  "mediaFotoUrlActualizado":true,  "feedback":"Nepe y bregando, rows creadas. MediaFotoUrl actualizado.", "nepeId":' . $nepe_id . '}');
	pg_close($cnx); //maybe not needed but doesn't hurt
	echo json_encode ($respuesta);
}else{
	pg_close($cnx); //maybe not needed but doesn't hurt
	//echo $query;
	throw new Exception('Mal query.  Sin RECURSO, para updateMediaFotoUrlQuery  en : '  .  __FILE__);
}
?>

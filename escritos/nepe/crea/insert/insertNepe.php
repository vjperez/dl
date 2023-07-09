<?php
require_once 'insertNepeQuery.php'; 

$recurso = pg_execute($cnx, "preparadoQueryInsertNepe", 
							array($nombre, $videoUrl, $quien_social_handle, $mediaFotoUrlPosgreArray, 
							$cuando, $quePosgreArray, $dondePosgreArray, $a_tu_casa,
							$nombre . ' ' . $quePosgreArray,
							$dondePosgreArray
							)
					  );

if($recurso){
	$recurso = pg_query($cnx, $querySelectNepeIdCurrval); // redefines recurso
	$fila = pg_fetch_row($recurso);
	$nepe_id = $fila[0];
	require_once 'bregandoQuery.php'; 
	$recurso = pg_execute($cnx, "preparadoQueryInsertBregando", array($dueno_id, $nepe_id));
	if($recurso){
		// insert nepe va bien hasta ahora pero con MediaFotoUrl vacio
		// still need to update MediaFotoUrl so dont build respuesta, close connection nor echo it here
		// $respuesta will be built in updateMediaFotoUrl.php
	}else{
		pg_close($cnx);
		throw new Exception('Mal query.  Sin RECURSO, para preparadoQueryInsertBregando en: '  . __FILE__ );
	}
}else{
	pg_close($cnx);
	throw new Exception('Mal query.  Sin RECURSO, para preparadoQueryInsertNepe en: ' . __FILE__ );
}
?>

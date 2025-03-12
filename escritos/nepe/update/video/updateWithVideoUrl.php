<?php
//session_start();
if( isset($_SESSION['dueno_id']) && isset($_SESSION['own_nepes_with_ids']) ){ 
	$own_nepes_with_ids = $_SESSION['own_nepes_with_ids'];
	$nepe_id = $own_nepes_with_ids[$index]['nepeId'];

	require_once 'update/core/updateQuery.php';
	$recurso = pg_execute($cnx, "preparadoQueryUpdateNepe", array($nepe_id, $nombre, $cuando, $su_casa, $desde_casa));
	if($recurso){
		$respuesta->nepeCoreUpdated = true;
    


		require_once 'update/video/videoQueries.php';
		$recurso = pg_execute($cnx, "preparadoQueryNepeHasVideo", array($nepe_id));
		if($recurso){
			////////////////////////////////////////////////////////////////////////////////////////////////////////////
			if( pg_fetch_row($recurso) ){//updated nepe and update video url
				$recurso = pg_execute($cnx, "preparadoQueryUpdateVideoUrl", array($videoUrl, $nepe_id));
				if($recurso){
					$respuesta->videoUpdated = true;
					//$respuesta = json_decode('{"videoUpdated":true}');
					//pg_close($cnx);
					//echo json_encode ($respuesta);
				}else{
					pg_close($cnx);
					throw new Exception('Mal query.  Sin RECURSO, para preparadoQueryUpdateVideoUrl en: '  . __FILE__ );
				}				
			}else{						//updated nepe and insert video url
				$recurso = pg_execute($cnx, "preparadoQueryInsertVideoUrl", array($videoUrl, $nepe_id));
				if($recurso){
					$respuesta->videoInserted = true;
					//$respuesta = json_decode('{"videoInserted":true}');
					//pg_close($cnx);
					//echo json_encode ($respuesta);
				}else{
					pg_close($cnx);
					throw new Exception('Mal query.  Sin RECURSO, para preparadoQueryInsertVideoUrl en: '  . __FILE__ );
				}
			}
			////////////////////////////////////////////////////////////////////////////////////////////////////////////
		}else{
			pg_close($cnx);
			throw new Exception('Mal query.  Sin RECURSO, para preparadoQueryNepeHasVideo en: ' . __FILE__ );	
		}



	}else{
		pg_close($cnx);
		throw new Exception('Mal query.  Sin RECURSO, para preparadoQueryUpdateNepe en: ' . __FILE__ );
	}

}else{
	pg_close($cnx);
	throw new Exception('Session dueno_id o own_nepes_with_ids, no seteada en: ' . __FILE__  );
}
?>

<?php
require_once '../configConstants/constants.php';
function queryGetOrInsertFotoUrls($cnx, $nepe_id){
	$result;
	$recurso = pg_execute($cnx, "preparadoQueryGetFotoUrls", array($nepe_id));
	if($recurso){
		$fila = pg_fetch_row($recurso);
		if($fila){
			$urls        = json_decode( $fila[0] );
			$prox_indice = json_decode( $fila[1] );
			$result = array('urls' => $urls, 'prox_indice' => $prox_indice);
		}else{
			$urls = array();		$urlsStr = implode(',', array());
			$prox_indice = 0; // default on database when inserting, 0 is sent both on result and insert query
			$result = array('urls' => $urls, 'prox_indice' => $prox_indice);
			$recurso = pg_execute($cnx, "preparadoQueryInsertFotoUrls", array($nepe_id, $urlsStr));
			if($recurso){
				;
			}else{
				pg_close($cnx); 
				throw new Exception('Mal query.  Sin RECURSO para preparadoQueryInsertFotoUrls en: ' . __FILE__  );				
			}
		}
	}else{
		pg_close($cnx); 
		throw new Exception('Mal query.  Sin RECURSO para preparadoQueryGetFotoUrls en: ' . __FILE__  );	
	}
	return $result;
}


function queryUpdateUrlsAndProxIndice($cnx, $nepe_id, $urlsStr, $prox_indice_db){
	$recurso = pg_execute($cnx, "preparadoQueryUpdateFoto", array( $nepe_id, $urlsStr, $prox_indice_db ));
	if($recurso){
		$respuesta = json_decode('{"actualizado":true, "feedback":"Nepe actualizado, incluyendo fotos.", "nepeId":' . $nepe_id . '}');
		//pg_close($cnx);
		echo json_encode ($respuesta);
	}else{
		pg_close($cnx); 
		throw new Exception('Mal query.  Sin RECURSO para preparadoQueryUpdateFoto en: ' . __FILE__  );	
	}
}


function backPossibleExistingImage($filename, $fotos_subidas_dir){
	$fotoTargetPath = $fotos_subidas_dir . $filename;
	//$target = glob( $fotoTargetPath );
	if(file_exists ($fotoTargetPath)) move_uploaded_file($fotoTargetPath, $fotoTargetPath . '-BK' );
}


function erasePossibleBackedImage($filename, $fotos_subidas_dir){
	$fotoTargetPath = $fotos_subidas_dir . $filename . '-BK';
	//$target = glob( $fotoTargetPath );
	if(file_exists ($fotoTargetPath))  unlink($fotoTargetPath);	
}


function moveImage($indice, $filesArray, $filename, $fotos_subidas_dir){
	$fotoFullPath = $fotos_subidas_dir . $filename;  // filesystem path
	if( ! move_uploaded_file($filesArray['tmp_name'][$indice], $fotoFullPath )){ // si el file no se pudo mover
		throw new Exception('Error moviendo foto. Foto: ' . $indice . '.  No se pudo mover la imagen!, tmp_name es: ' . $filesArray['tmp_name'][$indice] . ' hacia ' . $fotoFullPath . ' En ' . __FILE__ );
	}	
}
?>
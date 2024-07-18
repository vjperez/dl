<?php

session_start();
if(isset($_SESSION['dueno_id'])){
		$nepe_to_delete = $_REQUEST['nepeId']; 

		//conecta al db
		require_once '../conecta/conecta.php';
		//i am sure i have a connection, because an exception was NOT thrown at conecta

		require_once 'deleteNepe/deleteNepeQuery.php';
		if($recurso){		 
			if(pg_affected_rows($recurso) == 1){
				
				// delete foto files now that nepe on db was deleted
				require_once '../configConstants/constants.php';
				$fotoTarget = $fotos_subidas_dir . $nepe_to_delete . '[abcde].';
				foreach(glob($fotoTarget . '*') as $fotoToErase){
					if(file_exists ($fotoToErase)) unlink($fotoToErase);
				}

				$respuesta = json_decode('{"nepeBorrado":true}'); 
				pg_close($cnx);
				echo json_encode($respuesta);
			}elseif(pg_affected_rows($recurso) == 0){
				$respuesta = json_decode('{"nepeBorrado":false}');
				pg_close($cnx);
				echo json_encode($respuesta);
			}		
		}else{
			pg_close($cnx); //maybe not needed but doesn't hurt	
			throw new Exception('Mal query. Sin RECURSO, para deleteNepeQuery en: '  . __FILE__ );
		}
}else{
		throw new Exception('Session no seteada en: ' . __FILE__  );
}
?>

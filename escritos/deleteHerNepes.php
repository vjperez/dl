<?php
session_start();
if(isset($_SESSION['dueno_id'])){
		$user_to_leave_without_nepes = $_REQUEST['userId'];

		//conecta al db
		require_once 'conecta/conecta.php';
		//i am sure i have a connection, because an exception was NOT thrown at conecta

		require_once 'deleteHerNepes/getHerNepeIdsQuery.php';
		if($recurso){
            $cuantos = 0;
			while($nepe_to_delete = pg_fetch_row($recurso)[0] ){ 
                $deleteNepeQuery = "DELETE 
                FROM nepe
                WHERE id = '$nepe_to_delete'";
                pg_query($cnx, $deleteNepeQuery);
                $cuantos++;

				// delete foto files now that nepe on db was deleted
				require_once 'configConstants/constants.php';
				$fotoTarget = $fotos_subidas_dir . $nepe_to_delete . '[abcde].';
				foreach(glob($fotoTarget . '*') as $fotoToErase){
					if(file_exists ($fotoToErase)) unlink($fotoToErase);
				}
				//
			}
            $respuesta = json_decode('{"nepesBorrados":' . $cuantos . '}');
			pg_close($cnx);
			echo json_encode($respuesta); 
		}else{
			pg_close($cnx); //maybe not needed but doesn't hurt
			throw new Exception('Mal query.  Sin RECURSO para getHerNepeIdsQuery en: ' . __FILE__  );
		}
}else{
	throw new Exception('Session no seteada en: ' . __FILE__  );
}
?>

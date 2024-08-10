<?php
session_start();
if(isset($_SESSION['dueno_id'])){
	$user_to_leave_without_nepes = $_REQUEST['userId'];

	//conecta al db
	require_once '../conecta/conecta.php';
	//i am sure i have a connection, because an exception was NOT thrown at conecta

	require_once 'deleteHerNepes/getHerNepeIdsQuery.php';
  $recurso_ghn = pg_query($cnx, $getHerNepeIdsQuery);
	if($recurso_ghn){
    require_once 'update/que-donde/updateQueries.php';

		$cuantos = 0;
		while( $fila = pg_fetch_row($recurso_ghn) ){  
      $nepe_to_delete = $fila[0];

      //////////////////// deleting que and donde ////////////////
      $toBeIdsArr = array();// empty for both que and donde

      prepareCurrentIdsQueries('Que', $cnx);
      $areIdsArr  = getCurrentIds('Que',   $nepe_to_delete, $cnx);
      prepareMakeRemoveQueries('Que', $cnx);
      makeAndRemoveLinks('Que', $nepe_to_delete, $areIdsArr, $toBeIdsArr, $cnx);
      

      prepareCurrentIdsQueries('Donde', $cnx);
      $areIdsArr  = getCurrentIds('Donde',   $nepe_to_delete, $cnx);
      prepareMakeRemoveQueries('Donde', $cnx);
      makeAndRemoveLinks('Donde', $nepe_to_delete, $areIdsArr, $toBeIdsArr, $cnx);
      //////////////////// deleting que and donde ////////////////

      require_once 'deleteNepe/deleteNepeQuery.php';
      $recurso_dn = pg_query($cnx, $deleteNepeQuery);
      if($recurso_dn){		 
        if(pg_affected_rows($recurso_dn) == 1){
          $cuantos++;
          // delete foto files now that nepe on db was deleted
          require_once '../configConstants/constants.php';
          $fotoTarget = $fotos_subidas_dir . $nepe_to_delete . '[abcde].';
          foreach(glob($fotoTarget . '*') as $fotoToErase){
            if(file_exists ($fotoToErase)) unlink($fotoToErase);
          }
        }		
      }else{
        pg_close($cnx); //maybe not needed but doesn't hurt	
        throw new Exception('Mal query. Sin RECURSO, para deleteNepeQuery en: '  . __FILE__ );
      }
			
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

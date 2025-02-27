<?php
session_start();
if(isset($_SESSION['dueno_id'])){
	$user_to_leave_without_nepes = $_REQUEST['userId'];

	//conecta al db
	require_once '../conecta/conecta.php';
	//i am sure i have a connection, because an exception was NOT thrown at conecta

	require_once 'deleteHerNepes/getHerNepeIdsQuery.php';
  $recurso_ghn = pg_execute($cnx, "preparadoQueryGetHerNepeIds", array($user_to_leave_without_nepes));
	if($recurso_ghn){
    require_once 'update/que-donde/updateQueries.php';
    prepareCurrentIdsQueries('Que', $cnx);
    prepareMakeRemoveQueries('Que', $cnx);
    prepareCurrentIdsQueries('Donde', $cnx);
    prepareMakeRemoveQueries('Donde', $cnx);

    require_once 'deleteNepe/deleteNepeQuery.php';

		$cuantos = 0;
		while( $fila = pg_fetch_row($recurso_ghn) ){  
      $nepe_to_delete = $fila[0];

      //////////////////// deleting que and donde ////////////////
      $toBeIdsArr = array();// empty for both que and donde

      $areIdsArr  = getCurrentIds('Que',   $nepe_to_delete, $cnx);
      makeAndRemoveLinks('Que', $nepe_to_delete, $areIdsArr, $toBeIdsArr, $cnx);
      
      $areIdsArr  = getCurrentIds('Donde',   $nepe_to_delete, $cnx);
      makeAndRemoveLinks('Donde', $nepe_to_delete, $areIdsArr, $toBeIdsArr, $cnx);
      //////////////////// deleting que and donde ////////////////

      $recurso_dn = pg_execute($cnx, "preparadoQueryDeleteNepe", array($nepe_to_delete));
      if($recurso_dn){		 
        if(pg_affected_rows($recurso_dn) == 1){
          $cuantos++;
              /*
                // delete foto files is done by "preparadoQueryDeleteNepe", when nepe is deleted
                require_once '../configConstants/constants.php';
                $fotoTarget = $fotos_subidas_dir . $nepe_to_delete . '[abcde].';
                foreach(glob($fotoTarget . '*') as $fotoToErase){
                  if(file_exists ($fotoToErase)) unlink($fotoToErase);
                }
              */
        }		
      }else{
        pg_close($cnx); //maybe not needed but doesn't hurt	
        throw new Exception('Mal query. Sin RECURSO, para preparadoQueryDeleteNepe en: '  . __FILE__ );
      }
			
		}
		$respuesta = json_decode('{"nepesBorrados":' . $cuantos . '}');
		pg_close($cnx);
		echo json_encode($respuesta); 
	}else{
		pg_close($cnx); //maybe not needed but doesn't hurt
		throw new Exception('Mal query.  Sin RECURSO para preparadoQueryGetHerNepeIds en: ' . __FILE__  );
	}
}else{
	throw new Exception('Session no seteada en: ' . __FILE__  );
}
?>

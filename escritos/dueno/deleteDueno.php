<?php

session_start();
if(isset($_SESSION['dueno_id'])){
	$user_to_delete = $_REQUEST['userNo']; 

	//conecta al db
	require_once '../conecta/conecta.php';
	//i am sure i have a connection, because an exception was NOT thrown at conecta


	require_once 'delete/deleteDuenoQuery.php';
	$recurso = pg_execute($cnx, "preparadoQueryDeleteDueno", array($user_to_delete));
		if($recurso){		 
			if(pg_affected_rows($recurso) == 1){
				$respuesta = json_decode('{"userBorrado":true}'); 
				pg_close($cnx);
				echo json_encode($respuesta);
			}elseif(pg_affected_rows($recurso) == 0){
				$respuesta = json_decode('{"userBorrado":false}');
				pg_close($cnx);
				echo json_encode($respuesta);
			}		
		}else{
			pg_close($cnx); //maybe not needed but doesn't hurt	
			throw new Exception('Mal query. Sin RECURSO, para preparadoQueryDeleteDueno en: '  . __FILE__ );
		}
}else{
	throw new Exception('Session no seteada en: ' . __FILE__  );
}
?>

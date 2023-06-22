<?php

session_start();
if(isset($_SESSION['dueno_id'])){
	if(isset( $_POST['userNumber'] )){
		$dueno_to_edit = $_POST['userNumber'];  // cuando el admin edita el password de otro userNumber
	}else{
		$dueno_to_edit = $_SESSION['dueno_id']; // cuando se edita desde home, ahi, no se postea un userNumber
	}
	$pass01 = $_POST['pass01'];
	$hashed_pass01 = password_hash($pass01 , PASSWORD_DEFAULT);

	//conecta al db
	require_once 'escritos/conecta/conecta.php';
	//i am sure i have a connection, because an exception was NOT thrown at conecta
	
	require_once 'escritos/dueno/update/claveQuery.php';
	$recurso = pg_execute($cnx, "preparadoQueryClave", array($hashed_pass01, $dueno_to_edit));
	if($recurso){		 
		if(pg_affected_rows($recurso) == 1){
			$respuesta = json_decode('{"editado":true}');
			pg_close($cnx);
			echo json_encode($respuesta);
		}elseif(pg_affected_rows($recurso) == 0){
			$respuesta = json_decode('{"editado":false}');
			pg_close($cnx);
			echo json_encode($respuesta);
		}		
	}else{
		pg_close($cnx);
		throw new Exception('Mal query.  Sin RECURSO, para preparadoQueryClave en: '  . __FILE__ );
	}
}else{
	throw new Exception('Session dueno_id, no seteada en: ' . __FILE__  );
}
?>

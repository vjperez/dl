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
	require_once '../conecta/conecta.php';
	//i am sure i have a connection, because an exception was NOT thrown at conecta
	
	require_once 'update/claveQuery.php';
	$recurso = pg_execute($cnx, "preparadoQueryClave", array($hashed_pass01, $dueno_to_edit));
	if($recurso){
		//consider not allowing admin to change other user's clave. The following if else-if structure would be unnecessary. Just use activo flag
		//when user editing own clave, affected rows MUST always == 1
		//when admin editing other user's clave, affected rows will be zero for a user that do not exist
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

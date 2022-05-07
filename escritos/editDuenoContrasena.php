<?php
//saca los valores de POST
//$dueno_id = $_POST['duenoId'];

session_start();
if(isset($_SESSION['dueno_id'])){
	if(isset( $_POST['userNumber'] )){
		$dueno_to_edit = $_POST['userNumber'];
	}else{
		$dueno_to_edit = $_SESSION['dueno_id'];
	}
	$pass01 = $_POST['pass01'];
	$hashed_pass01 = password_hash($pass01 , PASSWORD_DEFAULT);

	//conecta al db
	require_once 'conecta/conecta.php';
	//i am sure i have a connection, because an exception was NOT thrown at conecta
	require_once 'dueno/editDuenoContrasenaQuery.php';

	$recurso = pg_execute($cnx, "preparadoQueryEditDuenoPassword", array($hashed_pass01, $dueno_to_edit));
	if($recurso){		 
		if(pg_affected_rows($recurso) == 1){
			$respuesta = json_decode('{"cambiado":true}');
			pg_close($cnx);
			echo json_encode($respuesta);
		}elseif(pg_affected_rows($recurso) == 0){
			$respuesta = json_decode('{"cambiado":false}');
			pg_close($cnx);
			echo json_encode($respuesta);
		}		
	}else{
		pg_close($cnx);
		throw new Exception('Mal query.  Sin RECURSO, para preparadoQueryEditDuenoPassword en: '  . __FILE__ );
	}
}else{
	throw new Exception('Session dueno_id, no seteada en: ' . __FILE__  );
}
?>

<?php
//saca los valores de POST
$usertb = $_POST['usertb'];
$pass01 = $_POST['pass01'];
$hashed_pass01 = password_hash($pass01 , PASSWORD_ARGON2I);

//conecta al db
require_once 'conecta/conecta.php';
//i am sure i have a connection, because an exception was NOT thrown at conecta

require_once 'creaDueno/creaDuenoQueries.php';
$recurso = pg_execute($cnx, "preparadoQueryCheckUserName", array($usertb));
if($recurso){
	$isNewName;
	if($fila = pg_fetch_row($recurso)){
		$isNewName = false;
	}else{
		$isNewName = true;
	}
	if($isNewName){
		$recurso = pg_execute($cnx, "preparadoQueryRegisterUser", array($usertb, $hashed_pass01));
		if($recurso){
			$recurso = pg_query($cnx, "SELECT currval('dueno_id_seq')");
			$filaConId = pg_fetch_row ($recurso);
			$dueno_id = $filaConId[0];
			$respuesta = json_decode('{"registrado":true, "feedback":"Ya estas registrado.  Directo a mi cuenta, no uso esto."}');
			pg_close($cnx);
			echo json_encode ($respuesta);
			session_start();	$_SESSION['dueno_id'] = $dueno_id; 
		}else{
			pg_close($cnx);
			throw new Exception('Mal query. Sin RECURSO, para queryRegisterUser. (username es nuevo, pero hubo error en: )' . __FILE__ );
		}
	}else{
		$respuesta = json_decode('{"registrado":false, "feedback":"Username no disponible."}');
		pg_close($cnx);
		echo json_encode ($respuesta);
	}
}else{
	pg_close($cnx);		//maybe not needed but doesn't hurt
	throw new Exception('Mal query.  Sin RECURSO, para queryCheckUserName.  (Ni se chequio el username.) en: ' . __FILE__ );
}

?>

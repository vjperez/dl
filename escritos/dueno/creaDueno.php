<?php
//saca los valores de POST
$usertb = $_POST['usertb'];
$pass01 = $_POST['pass01'];
$hashed_pass01 = password_hash($pass01 , PASSWORD_DEFAULT);

//conecta al db
require_once '../conecta/conecta.php';
//i am sure i have a connection, because an exception was NOT thrown at conecta

require_once 'read/idQuery.php';
$recurso = pg_execute($cnx, "preparadoQueryGetIdFromNombre", array($usertb));
if($recurso){
	//if i can fetch a db row with a user id ... i know the usertb is NOT a new username
	//if there is no row, pg fetch row returns FALSE  ...  which means the username is new
	$isNewUsername;
	if( pg_fetch_row($recurso) ){
		$isNewUsername = false; // usertb is NOT a new username
	}else{
		$isNewUsername = true; // usertb is a new username
	}
	///////////////////////////////////////////////////////
	if($isNewUsername){
		require_once 'crea/insertQuery.php';
		$recurso = pg_execute($cnx, "preparadoQueryInsert", array($usertb, $hashed_pass01));
		if($recurso){
			$recurso = pg_query($cnx, "SELECT currval('dueno_id_seq')"); //otro recurso, ahora con fila q tiene id recien insertado.  Use RETURNING in insert and avoid this currval query
			$filaConId = pg_fetch_row ($recurso);
			$dueno_id = $filaConId[0];
			session_start();	$_SESSION['dueno_id'] = $dueno_id;
			pg_close($cnx);
			$respuesta = json_decode('{"registrado":true, "feedback":"Ya estas registrado.  Directo a mi cuenta, no uso feedback."}');
			echo json_encode ($respuesta); 
		}else{
			pg_close($cnx);
			throw new Exception('Mal query. Sin RECURSO, para preparadoQueryInsert. Username es nuevo, pero ... user not inserted, en: ' . __FILE__ );
		}
	}else{
		$respuesta = json_decode('{"registrado":false, "feedback":"Username no disponible, ya esta usado."}');
		pg_close($cnx);
		echo json_encode ($respuesta);
	}
	///////////////////////////////////////////////////////
}else{
	pg_close($cnx);
	throw new Exception('Mal query.  Sin RECURSO, para preparadoQueryGetIdFromNombre.  (No se pudo verificar si el nombre ya tiene id.) en: ' . __FILE__ );
}
?>

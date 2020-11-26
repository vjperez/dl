<?php
//saca los valores de POST
$usertb = $_POST['usertb'];
$pass01 = $_POST['pass01'];

//conecta al db
require_once 'conecta/conecta.php';
//i am sure i have a connection, because an exception was NOT thrown at conecta

require_once 'creaDueno/creaDuenoQueries.php';
$recurso = pg_query($cnx, $queryCheckUserName);
if($recurso){
	$isNewName;
	if($fila = pg_fetch_row($recurso)){
		$isNewName = false;
	}else{
		$isNewName = true;
	}
	if($isNewName){
		$recurso = pg_query($cnx, $queryRegisterUserReturningId);
		if($recurso && $filaConId = pg_fetch_row ($recurso)){
			$dueno_id = $filaConId[0];
			//$respuesta = json_decode('{"registrado":true, "feedback":"Ya estas registrado.  Directo a mi cuenta, no uso este feedback.", "duenoId":'  .  $dueno_id  . '}');
			$respuesta = json_decode('{"registrado":true, "feedback":"Ya estas registrado.  Directo a mi cuenta, no uso esto."}');
			setcookie('dueno_id', $dueno_id, 3600*24 + time(), '/');
		}else{
			pg_close($cnx); //maybe not needed but doesn't hurt
			throw new Exception('Mal query. Sin RECURSO, para queryRegisterUserReturningId. (username es nuevo, pero hubo error en: )' . __FILE__ );
		}
	}else{
		$respuesta = json_decode('{"registrado":false, "feedback":"Usuario no disponible."}');
	}
	pg_close($cnx); //maybe not needed but doesn't hurt
	echo json_encode ($respuesta);
}else{
	pg_close($cnx); //maybe not needed but doesn't hurt
	throw new Exception('Mal query.  Sin RECURSO, para queryCheckUserName.  (Ni se chequio el username.) en: ' . __FILE__ );
	//echo "<li>Error, pg_query, no produjo un recurso para result... en escritos\login</li>";
}

?>

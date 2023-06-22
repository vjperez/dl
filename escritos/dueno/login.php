<?php
//saca los valores de POST
$user = $_POST['user'];
$pass = $_POST['pass'];

//conecta al db
require_once 'escritos/conecta/conecta.php';
//i am sure i have a connection, because an exception was NOT thrown at conecta

require_once 'escritos/dueno/read/idAndClaveQuery.php';
$recurso = pg_execute($cnx, "preparadoQueryIdAndClave", array($user));
if($recurso){		 
	if($fila = pg_fetch_row($recurso)){
		$dueno_id = $fila[0];
		$password_from_db = $fila[1];
		if( password_verify($pass, $password_from_db) ){
			require_once 'escritos/dueno/update/lastLogQuery.php';
			$recurso = pg_execute($cnx, "preparadoQueryLastLog", array($dueno_id));
			if($recurso){
				$respuesta = json_decode('{"logueado":true}');
				pg_close($cnx);
				echo json_encode ($respuesta);
				session_start();	$_SESSION['dueno_id'] = $dueno_id;
			}else{
				pg_close($cnx);
				throw new Exception('Mal query.  Sin RECURSO, para preparadoQueryLastLog en :' . __FILE__ );
			}
		}else{	// pass incorrecto
			$respuesta = json_decode('{"logueado":false}');
			pg_close($cnx);
			echo json_encode ($respuesta);	
		}
	}else{	// cheo no existe
		$respuesta = json_decode('{"logueado":false}');
		pg_close($cnx);
		echo json_encode ($respuesta);
	}	
}else{
	pg_close($cnx); //maybe not needed but doesn't hurt	
	throw new Exception('Mal query.  Sin RECURSO, para preparadoQueryIdAndClave en :' . __FILE__ );
}
?>

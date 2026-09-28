<?php
//saca los valores de POST
$user = $_POST['user'];
$pass = $_POST['pass'];

//conecta al db
require_once '../conecta/conecta.php';
//i am sure i have a connection, because an exception was NOT thrown at conecta

require_once 'read/getIdAndClaveQuery.php';
$recurso = pg_execute($cnx, "preparadoQueryGetIdAndClave", array($user));
if($recurso){		 
	if($fila = pg_fetch_row($recurso)){
		$dueno_id = $fila[0];
		$password_from_db = $fila[1];
		if( password_verify($pass, $password_from_db) ){
			require_once 'update/lastLogQuery.php';
			$recurso = pg_execute($cnx, "preparadoQueryLastLog", array($dueno_id));
			if($recurso){
        		session_start();	$_SESSION['dueno_id'] = $dueno_id;
				
				pg_close($cnx);
				$respuesta = json_decode('{"logueado":true}');
				echo json_encode ($respuesta);
			}else{
				pg_close($cnx);
				throw new Exception('Mal query.  Sin RECURSO, para preparadoQueryLastLog en :' . __FILE__ );
			}
		}else{	// pass incorrecto
			pg_close($cnx);
			$respuesta = json_decode('{"logueado":false,  "feedback":"Trata otra vez"}');
			echo json_encode ($respuesta);	
		}
	}else{	// cheo no existe
		pg_close($cnx);
		$respuesta = json_decode('{"logueado":false,  "feedback":"Trata otra vez"}');
		echo json_encode ($respuesta);
	}	
}else{
	pg_close($cnx); //maybe not needed but doesn't hurt	
	throw new Exception('Mal query.  Sin RECURSO, para preparadoQueryGetIdAndClave en :' . __FILE__ );
}
?>

<?php
//saca los valores de POST
$user = $_POST['user'];
$pass = $_POST['pass'];

//conecta al db
require_once 'conecta/conecta.php';
//i am sure i have a connection, because an exception was NOT thrown at conecta

require_once 'login/getIdAndPasswordQuery.php';
$recurso = pg_query($cnx, $queryGetIdAndPassword);
if($recurso){		 
	if($fila = pg_fetch_row($recurso)){
		$dueno_id = $fila[0];
		$password_from_db = $fila[1];
		if( password_verify($pass, $password_from_db) ){
					require_once 'login/updateQuery.php';
					$recurso = pg_query($cnx, $queryUpdate);
					if($recurso){
					  //$respuesta = json_decode('{"loguea":true,  "duenoId":' . $dueno_id . '}');
						$respuesta = json_decode('{"loguea":true}');
						pg_close($cnx);
						echo json_encode ($respuesta);
						setcookie('dueno_id', $dueno_id, 3600*24 + time(), '/');
					}else{
						pg_close($cnx);
						throw new Exception('Mal query.  Sin RECURSO, para queryUpdate en :' . __FILE__ );
					}
		}else{	// pass incorrecto
			$respuesta = json_decode('{"loguea":false}');
			pg_close($cnx);
			echo json_encode ($respuesta);	
		}
	}else{	// cheo no existe
		$respuesta = json_decode('{"loguea":false}');
		pg_close($cnx);
		echo json_encode ($respuesta);
	}	
}else{
	pg_close($cnx); //maybe not needed but doesn't hurt	
	throw new Exception('Mal query.  Sin RECURSO, para query queryGetIdAndPassword en :' . __FILE__ );
}
?>

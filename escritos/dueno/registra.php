<?php
//saca los valores de POST
$emiliotb = $_POST['emiliotb'];
$pass = $_POST['pass'];
$hashed_pass = password_hash($pass, PASSWORD_DEFAULT);

$nombre = $_POST['nombre'];
$telefono = $_POST['telefono'];
$insta = $_POST['insta'];
$caralibro = $_POST['caralibro'];

$contactos   = array( $telefono,  $nombre,  $insta,  $caralibro);
$contactosStr = implode(',', $contactos);

//conecta al db
require_once '../conecta/conecta.php';
//i am sure i have a connection, because an exception was NOT thrown at conecta

require_once 'read/getDuenoIdQuery.php';
$recurso = pg_execute($cnx, "preparadoQueryGetDuenoId", array($emiliotb));
if($recurso){
	//if i can fetch a db row with an id ... i know emiliotb is NOT a new email
	//if there is no row with emilio, pg fetch row returns FALSE  ...  which means emilio is new
	$isNewEmail;
	if( pg_fetch_row($recurso) ){
		$isNewEmail = false; // emiliotb is NOT new
	}else{
		$isNewEmail = true; // emiliotb is new
	}
	///////////////////////////////////////////////////////
	if($isNewEmail){
		require_once 'crea/duenoInsertQuery.php';
		$recurso = pg_execute($cnx, "preparadoQueryDuenoInsert", array($emiliotb, $hashed_pass));
		if($recurso){
			$recurso = pg_query($cnx, "SELECT currval('duenoid_seq')"); //otro recurso, ahora con fila q tiene id recien insertado.  Use RETURNING in insert and avoid this currval query
			$filaConId = pg_fetch_row ($recurso);
			$dueno_id = $filaConId[0];
			session_start();	$_SESSION['dueno_id'] = $dueno_id;
			
			require_once 'crea/socialInsertQuery.php';
			$recurso = pg_execute($cnx, "preparadoQuerySocialInsert", array($dueno_id, $contactosStr));
			if($recurso){
				// just keep going to next on $tipos
			}else{
				pg_close($cnx);
				throw new Exception('Mal query. Sin RECURSO, preparadoQuerySocialInsert. Social not inserted. (Red tipo: ' .$tipos[$index]. ' en: )' . __FILE__ );
			}			
			

			pg_close($cnx);
			$respuesta = json_decode('{"registrado":true, "feedback":"Ya estas registrado.  Directo a mi cuenta, no uso feedback."}');
			echo json_encode ($respuesta); 
		}else{
			pg_close($cnx);
			throw new Exception('Mal query. Sin RECURSO, para preparadoQueryDuenoInsert. Email es nuevo, pero ... dueno not inserted, en: ' . __FILE__ );
		}
	}else{// isNewEmail is false
		$respuesta = json_decode('{"registrado":false, "feedback":"Email no disponible, ya esta usado."}');
		pg_close($cnx);
		echo json_encode ($respuesta);
	}
	///////////////////////////////////////////////////////
}else{
	pg_close($cnx);
	throw new Exception('Mal query.  Sin RECURSO, para preparadoQueryGetDuenoId.  (No se pudo verificar si el email, ya tiene id.) en: ' . __FILE__ );
}
?>

<?php
session_start();
if(isset($_SESSION['dueno_id'])){
	$dueno_id = $_SESSION['dueno_id'];
	//saca los valores de POST
	$tel          = $_POST['tel'];
	$email        = $_POST['email'];
	$rs1   = $_POST['redSocial1'];
	$rs2   = $_POST['redSocial2'];
	$tipos   = array("tel", "email", "rs1", "rs2");
	$handles = array($tel,  $email,  $rs1,  $rs2 );
	//conecta al db
	require_once 'escritos/conecta/conecta.php';
	//i am sure i have a connection, because an exception was NOT thrown at conecta
	require_once 'escritos/dueno/read/socialsIdQuery.php';
	
	$index = 0;
	while($index < 4){ // 4 redes por dueno
				$recurso = pg_execute($cnx, "preparadoQuerySocialsId", array($dueno_id, $tipo[$index]));
				if($recurso){
					///////////////////////////////////////////////////////
					//if i can fetch a db row with a user id ...   i know i will do an update
					//if there is no row, pg fetch row returns FALSE  ... i will do an insert
					$willUpdate;
					if( pg_fetch_row($recurso) ){
						$willUpdate = true; // already exists, i will update
					}else{
						$willUpdate = false; // does not exists, i will insert
					}
					///////////////////////////////////////////////////////
					if($willUpdate){
						require_once 'dueno/update/socialQuery.php';
						$recurso = pg_execute($cnx, "preparadoQuerySocial", array($dueno_id, $tipo[$index], $handle[$index]));
						if($recurso){
							$respuesta = json_decode('{"editados":true, "feedback":"Tus socials fueron editados."}');
							pg_close($cnx);
							echo json_encode ($respuesta);
						}else{
							pg_close($cnx);
							throw new Exception('Mal query. Sin RECURSO, preparadoQuerySocial. (social not updated, en: )' . __FILE__ );
						}
					}else{ // will insert
						require_once 'dueno/crea/socialInsertQuery.php';
						$recurso = pg_execute($cnx, "preparadoQuerySocialInsert", array($dueno_id, $tipo[$index], $handle[$index]));
						if($recurso){
							$respuesta = json_decode('{"creados":true, "feedback":"Tus socials fueron creados."}');
							pg_close($cnx);
							echo json_encode ($respuesta);
						}else{
							pg_close($cnx);
							throw new Exception('Mal query. Sin RECURSO, preparadoQuerySocialInsert. (social not updated, en: )' . __FILE__ );
						}
					}
					
				}else{
					pg_close($cnx);
					throw new Exception('Mal query.  Sin RECURSO, para preparadoQuerySocialsId.  (Ni se chequio una de las redes. Red tipo:' . $tipo[$index] .  ') en: ' . __FILE__ );
				}
	$index++;
	}// while
	
}else{
	throw new Exception('Session dueno_id, no seteada en: ' . __FILE__  );
}
?>

<?php
session_start();
if(isset($_SESSION['dueno_id'])){
	$dueno_id = $_SESSION['dueno_id'];
	//saca los valores de POST
	$tel          = $_POST['tel'];
	$email        = $_POST['email'];
	$rs1   = $_POST['redSocial1'];
	$rs2   = $_POST['redSocial2'];
	$contactos   = array( $tel,  $email,  $rs1,  $rs2);
	$contactosStr = implode(',', $contactos);
	//conecta al db
	require_once '../conecta/conecta.php';
	//i am sure i have a connection, because an exception was NOT thrown at conecta
	
	require_once 'read/socialsIdQuery.php';




	$recurso = pg_execute($cnx, "preparadoQuerySocialsId", array($dueno_id));
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
		/////////////////////////insert or update//////////////////////////////
		if($willUpdate){
			require_once 'update/socialUpdateQuery.php';
			$recurso = pg_execute($cnx, "preparadoQuerySocialUpdate", array($dueno_id, $contactosStr));
			if($recurso){
				// just keep going to next on $tipos
			}else{
				pg_close($cnx);
				throw new Exception('Mal query. Sin RECURSO, preparadoQuerySocialUpdate. Social not updated. (Red tipo: ' .$tipos[$index]. ' en: )'  .  __FILE__ );
			}
		}else{ // will insert
			require_once 'crea/socialInsertQuery.php';
			$recurso = pg_execute($cnx, "preparadoQuerySocialInsert", array($dueno_id, $contactosStr));
			if($recurso){
				// just keep going to next on $tipos
			}else{
				pg_close($cnx);
				throw new Exception('Mal query. Sin RECURSO, preparadoQuerySocialInsert. Social not inserted. (Red tipo: ' .$tipos[$index]. ' en: )' . __FILE__ );
			}
		}
		///////////////////////^ insert or update ^////////////////////////////
	}else{
		pg_close($cnx);
		throw new Exception('Mal query.  Sin RECURSO, para preparadoQuerySocialsId.  Error verificando una de las redes. (Red tipo: '  .  $tipos[$index]  .   ') en: '  .  __FILE__ );
	}




	$respuesta = json_decode('{"actualizados":true}');
	pg_close($cnx);
	echo json_encode ($respuesta);
}else{
	throw new Exception('Session dueno_id, no seteada en: ' . __FILE__  );
}
?>

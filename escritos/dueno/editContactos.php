<?php
session_start();
if(isset($_SESSION['dueno_id'])){
	$dueno_id = $_SESSION['dueno_id'];
	//saca los valores de POST
	$tel          = $_POST['tel'];
	$nombre       = $_POST['nombre'];
	$rs1   = $_POST['redinsta'];
	$rs2   = $_POST['redcaralibro'];
	$contactos   = array( $tel,  $nombre,  $rs1,  $rs2);
	$contactosStr = implode(',', $contactos);
	//conecta al db
	require_once '../conecta/conecta.php';
	//i am sure i have a connection, because an exception was NOT thrown at conecta
	
	///////////////////////// just update //////////////////////////////
	require_once 'update/editSocialQuery.php';
	$recurso = pg_execute($cnx, "preparadoQueryEditSocial", array($dueno_id, $contactosStr));
	if($recurso){
		pg_close($cnx);
		$respuesta = json_decode('{"actualizados":true}');
		echo json_encode ($respuesta);				
	}else{
		pg_close($cnx);
		throw new Exception('Mal query. Sin RECURSO, preparadoQuerySocialUpdate. Social not updated. (Red tipo: ' .$tipos[$index]. ' en: )'  .  __FILE__ );
	}
	/////////////////////// just update ////////////////////////////

}else{
	throw new Exception('Session dueno_id, no seteada en: ' . __FILE__  );
}
?>

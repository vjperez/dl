<?php
session_start();
if( isset($_SESSION['dueno_id']) && isset($_SESSION['own_nepes_with_ids']) ){
	$own_nepes_with_ids = $_SESSION['own_nepes_with_ids'];
	$index = $_POST['nepe_index'];
	$nepe_id = $own_nepes_with_ids[$index]['nepeId'];
	$dueno_id = $_SESSION['dueno_id'];


	$nombre = $_POST['nombre'];
	$cuando = $_POST['cuando'];
	
	//su casa - desde casa
	$su_casa_str = $_POST['suCasa'];
	if(      0 === strcmp($su_casa_str , 'si')){
		$su_casa = 't';// value that postgreSQL undestands
	}elseif( 0 === strcmp($su_casa_str , 'no')){
		$su_casa = 'f';// value that postgreSQL undestands.  
		//PHP undestands false, but tries to insert '' into Postgresql which causes an error
	}else{
		$su_casa = null;// value that postgreSQL undestands
	}
	$desde_casa_str = $_POST['desdeCasa'];
	if(      0 === strcmp($desde_casa_str , 'si')){
		$desde_casa = 't';// value that postgreSQL undestands
	}elseif( 0 === strcmp($desde_casa_str , 'no')){
		$desde_casa = 'f';// value that postgreSQL undestands
		//PHP undestands false, but tries to insert '' into Postgresql which causes an error
	}else{
		$desde_casa = null;// value that postgreSQL undestands
	}
	
	//video
	$videoUrl = $_POST['videoUrl'];
	require_once 'update/core/update.php';
	
	//foto
	/*
	if(isset( $_FILES['fotoArr'] )){
		require_once 'update/foto/with/update.php';
	}else{
		require_once 'update/foto/without/update.php';
	}
	*/
	
	require_once 'update/que-donde/update.php';
	//que
	$queToBeFrasesArr   = json_decode( $_POST['losQue'] ); 
	updateQueDonde('que',   $queToBeFrasesArr);
	//donde
	$dondeToBeFrasesArr = json_decode( $_POST['losDonde'] );
	updateQueDonde('donde', $dondeToBeFrasesArr);
}else{
	throw new Exception('Session dueno_id o own_nepes_with_ids, no seteada en: ' . __FILE__  );
}

?>

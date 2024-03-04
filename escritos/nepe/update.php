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

	//foto
	if(isset( $_FILES['fotoArr'] )){
		require_once 'update/checkFotoErrorAndMove/checkFotoErrorAndMove.php';
		require_once 'update/checkFotoErrorAndMove/updateNepe.php';
	}else{
		require_once 'update/noFoto/updateNepe.php';
	}
	
	//video
	$videoUrl = $_POST['videoUrl'];
	
	//
	$quePHP = json_decode($_POST['que']);
	$quePosgreArray = '{';
	foreach($quePHP as $key => $element){
		if(strlen($element) > 0){
			if(strlen($quePosgreArray) > strlen('{')) $quePosgreArray = $quePosgreArray . ',';
			$quePosgreArray = $quePosgreArray . $element;
		}
	}
	$quePosgreArray = $quePosgreArray . '}';

	//build a postgresql type array using 'donde' data
	$dondePHP = json_decode($_POST['donde']);
	$dondePosgreArray = '{';
	foreach($dondePHP as $key => $element){
		if(strlen($element) > 0){  // because of cleanStr in JS, this should ALWAYS be true
			if(strlen($dondePosgreArray) > strlen('{')) $dondePosgreArray = $dondePosgreArray . ',';
			$dondePosgreArray = $dondePosgreArray . $element;
			//if(1 + $key < count($dondePHP)) $dondePosgreArray = $dondePosgreArray . ',';
		}
	}
	$dondePosgreArray = $dondePosgreArray . '}';
// =======================================================================================
	require_once 'conecta/conecta.php';
	//i am sure i have a connection, because an exception was NOT thrown at conecta
}else{
	throw new Exception('Session dueno_id o own_nepes_with_ids, no seteada en: ' . __FILE__  );
}

?>

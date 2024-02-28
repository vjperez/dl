<?php
session_start();
if( isset($_SESSION['dueno_id']) ){
	$dueno_id = $_SESSION['dueno_id'];
	//saca los valores de POST
	$nombre = $_POST['nombre'];
	$cuando = $_POST['cuando'];

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
	// i already have the post values

	//conecta al db
	require_once '../conecta/conecta.php';
	//i am sure i have a connection, because an exception was NOT thrown at conecta

	require_once 'crea/insert/insertNepe.php';
	
}else{
	throw new Exception('Session dueno_id no seteada en: ' . __FILE__  );
}
?>

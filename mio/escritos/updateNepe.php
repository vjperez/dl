<?php
//saca los valores de POST
$nombre = $_POST['nombre'];
$videoUrl = $_POST['videoUrl'];
$quien_social_handle = $_POST['quienSocialHandle'];
$cuando = $_POST['cuando'];

//build a postgresql type array using 'que' data
$quePHP = str_replace(":", " ", json_decode($_POST['que']));
$quePosgreArray = '{';
foreach($quePHP as $key => $element){
	if(strlen($element) > 0){  // because of cleanStr in JS, this should ALWAYS be true
		if(strlen($quePosgreArray) > strlen('{')) $quePosgreArray = $quePosgreArray . ',';
		$quePosgreArray = $quePosgreArray . $element;
		//if(1 + $key < count($quePHP)) $quePosgreArray = $quePosgreArray . ',';
	}
}
$quePosgreArray = $quePosgreArray . '}';

//build a postgresql type array using 'donde' data
$dondePHP = str_replace(":", " ", json_decode($_POST['donde']));
$dondePosgreArray = '{';
foreach($dondePHP as $key => $element){
	if(strlen($element) > 0){  // because of cleanStr in JS, this should ALWAYS be true
		if(strlen($dondePosgreArray) > strlen('{')) $dondePosgreArray = $dondePosgreArray . ',';
		$dondePosgreArray = $dondePosgreArray . $element;
		//if(1 + $key < count($dondePHP)) $dondePosgreArray = $dondePosgreArray . ',';
	}
}
$dondePosgreArray = $dondePosgreArray . '}';


if(strcmp($_POST['aTuCasa'] , 'si') === 0){
		$a_tu_casa = 'true';
}else{
		$a_tu_casa = 'false' ;
}



$nepe_id = $_POST['nepeId'];
$dueno_id = $_POST['duenoId'];



// i already have the post values

/*
//inspecting $_FILES array ; curiosity and debugging
//name at client
foreach ($_FILES['fotoArr']['name'] as $key => $name) {
	echo 'name ' . $key . ': ' . $name . '<br>';
}
//temp name in server
foreach ($_FILES['fotoArr']['tmp_name'] as $key => $tmpn) {
	echo 'tmp name ' . $key . '= ' . $tmpn . '<br>';
}
//image/png por ejemplo
foreach ($_FILES['fotoArr']['type'] as $key => $type) {
	echo 'type ' . $key . ': ' . $type . '<br>';
}
//size in bytes
foreach ($_FILES['fotoArr']['size'] as $key => $size) {
	echo 'size ' . $key . '= ' . $size . '<br>';
}
foreach ($_FILES['fotoArr']['error'] as $key => $error) {
	echo 'error ' . $key . '= ' . $error . '<br>';
}
*/
/*
//output for 2 images:
name 0: light_button.png
name 1: light_logo.png
tmp name 0= C:\Users\victor\lighttpd\tmp\php2E44.tmp
tmp name 1= C:\Users\victor\lighttpd\tmp\php2E54.tmp
type 0: image/png
type 1: image/png
size 0= 2072
size 1= 35431
error 0= 0
error 1= 0
*/






//conecta al db
require_once 'conecta/conecta.php';
//i am sure i have a connection, because an exception was NOT thrown at conecta

/*
if( ! isset($nepe_id) || trim($nepe_id) === ''){
	$mediaFotoUrlPosgreArray = '{vacio}';
	require_once 'creaNepe/crea/creaNepe.php';
	//check for foto errors   ;   move fotos   ;   build a $fotoUrlPosgreArray postgresql type array and insert array into db
	require_once 'creaNepe/checkFotoUploadErrorAndMove/checkFotoUploadErrorAndMove.php';
	require_once 'creaNepe/update/updateMediaFotoUrl.php';
}else{
*/
require_once 'updateNepe/update/updateNepe.php';

/*
}
*/
?>

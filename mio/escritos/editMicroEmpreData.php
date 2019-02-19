<?php
//saca los valores de POST
$nombre = $_POST['nombre'];
$videoUrl = $_POST['videoUrl'];
$fbk = $_POST['red1'];
$tt = $_POST['red2'];
$igrm = $_POST['red3'];
$phn = $_POST['red4'];
$quien_social_handle = json_encode ( array("fbk"=>$fbk, "tt"=>$tt, "igrm"=>$igrm, "phn"=>$phn) );
$lun = $_POST['dia1'];
$mar = $_POST['dia2'];
$mier = $_POST['dia3'];
$jue = $_POST['dia4'];
$vier = $_POST['dia5'];
$sab = $_POST['dia6'];
$dom = $_POST['dia7'];
$cuando = json_encode ( array("lun"=>$lun, "mar"=>$mar, "mier"=>$mier, "jue"=>$jue, "vier"=>$vier, "sab"=>$sab, "dom"=>$dom) );
$que   = '{' . $_POST['que'] . '}';
$donde = '{' . $_POST['donde'] . '}';

if(strcmp($_POST['aTuCasa'] , 'si') === 0){
		$a_tu_casa = 'true';
}else{
		$a_tu_casa = 'false' ;
}


$micro_empre_id = $_POST['meId'];
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

//check for foto errors now ;
require_once 'checkFotoUploadError/checkFotoUploadError.php';




//conecta al db
require_once 'conecta/conecta.php';
//i am sure i have a connection, because an exception was NOT thrown at conecta

if($micro_empre_id == 0){
	require_once 'editMicroEmpreData/insert/insertMicroEmpreData.php';
}else{
	require_once 'editMicroEmpreData/update/updateMicroEmpreData.php';
}
?>

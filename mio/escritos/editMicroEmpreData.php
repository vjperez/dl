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
/*
$que = '{' . $_POST['que'][0];
for ($i=1; $i < 10; $i++) {
	if ($_POST['que'][$i] !== '') $que = $que . ', ' . $_POST['que'][$i];
}
$que = $que . '}';

$donde = '{' . $_POST['donde'][0];
for ($i=1; $i < 5 ; $i++) {
	if ($_POST['donde'][$i] !== '') $donde = $donde . ', ' . $_POST['donde'][$i];
}
$donde = $donde . '}';
*/

//echo $_POST['aTuCasa'] . ' : ';
if(strcmp($_POST['aTuCasa'] , 'si') === 0){
		$a_tu_casa = 'true';
}else{
		$a_tu_casa = 'false' ;
}
//echo $a_tu_casa . '<br>';


$micro_empre_id = $_POST['meId'];
$dueno_id = $_POST['duenoId'];
// i already have the post values


//inspecting $_FILES array ; curiosity and debugging
foreach ($_FILES['fotoArr']['name'] as $key => $nombre) {
	echo $key . ' nombre: ' . $nombre . '<br>';
}
foreach ($_FILES['fotoArr']['size'] as $key => $size) {
	echo $key . ' size: ' . $size . '<br>';
}

//check for foto errors now ; if and only if $_FILES has content
/*
if(){
	require_once 'checkFotoUploadError/checkFotoUploadError.php';
}
*/


//conecta al db
require_once 'conecta/conecta.php';
//i am sure i have a connection, because an exception was NOT thrown at conecta

if($micro_empre_id == 0){
	require_once 'editMicroEmpreData/insert/insertMicroEmpreData.php';
}else{
	require_once 'editMicroEmpreData/update/updateMicroEmpreData.php';
}
?>

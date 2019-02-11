<?php
//saca los valores de POST
$nombre = $_POST['nombre'];
$videoUrl = $_POST['videoUrl'];
$fbk = $_POST['fbk'];
$tt = $_POST['tt'];
$igrm = $_POST['igrm'];
$phn = $_POST['phn'];
$quien_social_handle = json_encode ( array("fbk"=>$fbk, "tt"=>$tt, "igrm"=>$igrm, "phn"=>$phn) );
$lun = $_POST['lun'];
$mar = $_POST['mar'];
$mier = $_POST['mier'];
$jue = $_POST['jue'];
$vier = $_POST['vier'];
$sab = $_POST['sab'];
$dom = $_POST['dom'];
$cuando = json_encode ( array("lun"=>$lun, "mar"=>$mar, "mier"=>$mier, "jue"=>$jue, "vier"=>$vier, "sab"=>$sab, "dom"=>$dom) );
$que = $_POST['que'];
$donde = $_POST['donde'];
$a_tu_casa = $_POST['atucasa'];
$micro_empre_id = $_POST['meId'];

//conecta al db
require_once 'conecta/conecta.php';
//i am sure i have a connection, because an exception was NOT thrown at conecta

require_once 'editMicroEmpreData/editMicroEmpreDataQuery.php';
$recurso = pg_query($cnx, $query);
if($recurso){
	$respuesta = json_decode('{"actualizado":true, "feedback":"Microempresa actualizada."}');
	pg_close($cnx); //maybe not needed but doesn't hurt
	echo json_encode ($respuesta);
}else{
	pg_close($cnx); //maybe not needed but doesn't hurt
	throw new Exception('Mal query.  Sin RECURSO, para query editMicroEmpreDataQuery');
}
?>

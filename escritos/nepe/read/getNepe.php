<?php
//lo que hay q sacar de la basedatos logueado y con sesson definida para hacer update Nepe,
//es la mismo info q hace falta sacar para mostrar el profile del nepe publicamente
//en look=view nepe.  Pero el url trae cosas diferentes en el get
session_start();
if( isset($_SESSION['dueno_id']) && isset($_SESSION['own_nepes_with_ids']) && isset($_GET['nepe_index'])){
	$own_nepes_with_ids = $_SESSION['own_nepes_with_ids'];
	$index = $_GET['nepe_index'];
	$nepe_id = $own_nepes_with_ids[$index]['nepeId'];
}else{
	$nepe_id = $_GET['nepeId']; 
}
//conecta al db
require_once '../../conecta/conecta.php';
//i am sure i have a connection, because an exception was NOT thrown at conecta

require_once 'getNepe/getNepeQuery.php';
$recurso = pg_execute($cnx, "preparadoQueryGetNepe", array($nepe_id));

if($recurso){
//When you put bool values, arrays, or integers like the nepe Id, into a json format it allows
//the later use of functions like json_decode().  This makes possible
//the preservation of the datatypes, as stored in postgresql.
//When jQuery.getJSON receives data it will build a javascript objects
//with the correct datatypes only if you preserve those datatypes,
//otherwise it simply receives text, and you get hard to debug,
//wrong results.
	$fila = array();
	$nepeDato = array();
	if($fila = pg_fetch_row($recurso)){
		//Read data already in json format, and decode it into PHP variables with correct datatype
		$nepeDato['nepeId']    = json_decode($fila[0]);
		$nepeDato['creado']    = $fila[1];
		$nepeDato['nombre']    = $fila[2];
		$nepeDato['cuando']    = json_decode($fila[3]);
		$nepeDato['sucasa']    = json_decode($fila[4]);
		$nepeDato['desdecasa'] = json_decode($fila[5]);
		pg_close($cnx); 
		//Send data from server in json format
		echo json_encode($nepeDato);
	}else{
		pg_close($cnx);
		throw new Exception('Con RECURSO, pero sin $fila, (nepe id no existe) en :'  .  __FILE__  .  '.');	
	}
}else{
	pg_close($cnx);
	throw new Exception('Mal query.  Sin RECURSO para preparadoQueryGetNepe en :'  .  __FILE__  .  '.');
}
?>

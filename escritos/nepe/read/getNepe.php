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
	$fila = array();
	$nepeDato = array();
	if($fila = pg_fetch_row($recurso)){
		//Read data already in json format, and decode it into PHP variables with correct datatype
		$nepeDato['nepeId']    = json_decode($fila[0]);
		$nepeDato['creado']    = $fila[1];
		$nepeDato['revisado']  = $fila[2];
		$nepeDato['nombre']    = $fila[3];
		$nepeDato['cuando']    = json_decode($fila[4]);
		if(is_null($fila[5])){
			$nepeDato['suCasa'] = 'na';
		}elseif(0 === strcmp($fila[5], 't')) {
			$nepeDato['suCasa'] = 'si';
		}elseif(0 === strcmp($fila[5], 'f')){
			$nepeDato['suCasa'] = 'no';
		} 
		if(is_null($fila[6])){
			$nepeDato['desdeCasa'] = 'na';
		}elseif(0 === strcmp($fila[6], 't')) {
			$nepeDato['desdeCasa'] = 'si';
		}elseif(0 === strcmp($fila[6], 'f')){
			$nepeDato['desdeCasa'] = 'no';
		} 

		//video
			$nepeDato['videoUrl'] = $fila[7];
		//que
			$nepeDato['losQue']   = $fila[8];
		//donde
			$nepeDato['losDonde'] = $fila[9];

		// fotos is an array with urls, obtained from next required files
			require_once 'getFoto/getFotosQuery.php';
			require_once 'getFoto/getFotos.php';
			$nepeDato['losFoto'] = $fotos;
		// /////////////////   fotos   //////////////////////////////

		// los socials is an array with handle and tipos, obtained from next required files
			require_once 'getSocial/getSocialQuery.php';
			require_once 'getSocial/getSocial.php';
			$nepeDato['losSocial'] = $losSocial;
	    //  /////////////   social   //////////////////////////////

		pg_close($cnx); 
		//Send data from server in json format
		echo json_encode($nepeDato);
		//echo x;
	}else{
		pg_close($cnx);
		throw new Exception('Con RECURSO, pero sin $fila, (nepe id do not exists or index is out of bounds) en :'  .  __FILE__  .  '.');	
	}
}else{
	pg_close($cnx);
	throw new Exception('Mal query.  Sin RECURSO para preparadoQueryGetNepe en :'  .  __FILE__  .  '.');
}
?>

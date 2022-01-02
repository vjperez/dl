<?php

session_start();
$nepe_id = $_SESSION['nepe_id']; 
//conecta al db
require_once 'conecta/conecta.php';
//i am sure i have a connection, because an exception was NOT thrown at conecta

require_once 'getNepe/getNepeQuery.php';
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
		$nepeDato['nepeId'] = json_decode($fila[0]);
		$nepeDato['nombre'] = $fila[1];
		$nepeDato['revisado'] = $fila[2];
		$nepeDato['que'] = json_decode($fila[3]);
		$nepeDato['donde'] = json_decode($fila[4]);
		$nepeDato['cuando'] = json_decode($fila[5]);
		$nepeDato['atucasa'] = json_decode($fila[6]);

		$nepeDato['videoUrl'] = $fila[7];	

		$nepeDato['quienSocialHandle'] = json_decode($fila[8]);
		$nepeDato['quienFotoSrc'] = json_decode($fila[9]);

		$nepeDato['videoCode'] = videoCode( $fila[7] );
		pg_close($cnx); 
		//Send data from server in json format
		echo json_encode($nepeDato);
	}else{
		pg_close($cnx); //maybe not needed but doesn't hurt
		throw new Exception('Vacio query.  Con RECURSO, pero sin $fila, (nepe id no existe) en :'  .  __FILE__  .  '.');	
	}
}else{
	pg_close($cnx); //maybe not needed but doesn't hurt
	throw new Exception('Mal query.  Sin RECURSO en :'  .  __FILE__  .  '.');
	//echo "<li>Error, pg_query, no produjo un recurso ... en .....</li>";
}


//lo que hay q sacar de la basedatos para q al loguarte hacer updateNepe
//es la mismo info q hace falta sacar para mostrar el profile del nepe publicamente
//en look=profile 
//Solo que en update nepe tambien se anaden los datos del admin.



function videoCode($url) { // mide al menos 11 y tiene youtu; youtu123456 aun siendo invalido,devuelve true
	if(strpos($url, 'no video') === 0){
		return 0;  
	}elseif (  ! (strpos($url, 'youtu') === false)  ){	// 'youtu' is somewhere
		return 1;
	}else {
		return 2;
	}
} 
 

?>

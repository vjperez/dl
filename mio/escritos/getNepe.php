<?php

//saca los valores de GET
$nepe_id = $_GET['nepeId'];
//conecta al db
require_once 'conecta/conecta.php';
//i am sure i have a connection, because an exception was NOT thrown at conecta

require_once 'getNepe/getNepeQuery.php';
$fila = array();
$nepeDato = array();
$recurso = pg_query($cnx, $query);
if($recurso){
//When you put bool values, arrays, or integers like the nepe Id, into a json format it allows
//the later use of functions like json_decode().  This makes possible
//the preservation of the datatypes, as stored in postgresql.
//When jQuery.getJSON receives data it will build a javascript objects
//with the correct datatypes only if you preserve those datatypes,
//otherwise it simply receives text, and you get hard to debug,
//wrong results.
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

		$nepeDato['isValidVideoUrl'] = json_decode(isValidVideoUrl( $fila[7] ));
		//Send data from server in json format
		echo json_encode($nepeDato);
	}else{
		throw new Exception('Mal query.  Con RECURSO, pero sin $fila, (nepe id no existe) en :'  .  __FILE__  .  '.');	
	}
}else{
	throw new Exception('Mal query.  Sin RECURSO en :'  .  __FILE__  .  '.');
	//echo "<li>Error, pg_query, no produjo un recurso ... en .....</li>";
}
pg_close($cnx); //maybe not needed but doesn't hurt


//lo que hay q sacar de la basedatos para q al loguarte hacer updateNepe
//es la mismo info q hace falta sacar para mostrar el profile del nepe publicamente
//en look=profile 
//Solo que en update nepe tambien se anaden los datos del admin.



function isValidVideoUrl($url) { // run broken-links.php
	if (strlen(substr($url, -11)) < 11){
		return false;
	}elseif (strpos($url, 'youtu') === false){
		return false;
	}else{ 
		$jeders = check_url( 'http://youtu.be/' .  substr($url, -11) );
		return strpos($jeders['http_code'], '302') === 0;
	}
}

function check_url($url) {  // run broken-links.php 
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HEADER, 1);
    curl_setopt($ch , CURLOPT_RETURNTRANSFER, 1);
    $data = curl_exec($ch);
    $headers = curl_getinfo($ch);
    curl_close($ch);

	return $headers;
    //return $headers['http_code'];
}

?>

<?php
//saca los valores de GET
$id = $_GET['id'];

//conecta al db
require_once 'conecta/conecta.php';

if($cnx){
	require_once 'lee/showProfileQuery.php';
	$result = array(); 
	$profile = array();
	$recurso = pg_query($cnx, $query);
	if($recurso){ 	
		$result = pg_fetch_row($recurso); 
		$profile['micro_empre_id'] = json_decode($result[0]);
		$profile['nombre'] = $result[1];
		$profile['revisado'] = $result[2];
		$profile['videoUrl'] = $result[3];
		$profile['quienSocialHandle'] = json_decode($result[4]);
		$profile['quienFotoSrc'] = json_decode($result[5]);
		$profile['cuando'] = json_decode($result[6]);	
		$profile['que'] = json_decode($result[7]);	
		$profile['donde'] = json_decode($result[8]);
		$profile['atucasa'] = json_decode($result[9]);
//When you put text, or string or arrays, into a json format it allows
//the later use of functions like json_decode().  This makes possible
//the preservation of the datatypes, as stored in the postgresql.  
//When jQuery.getJSON receives data it will build a javascript objects
//with the correct datatypes only if you preserve those datatypes, 
//otherwise it simply receives text, and you get hard to debug,
//wrong results.		
	}else{
		echo "<li>Error, pg_query con indice de query $queryIndex, no produjo un recurso para result...</li>";
	}
	echo json_encode($profile);
	pg_close($cnx); //maybe not needed but doesn't hurt	
}
?>

<?php


//lo que hay q sacar de la basedatos para q al loguarte puedas puedas editar
//los datos del empre, es la mismo info q hace falta sacar para mostrar el profile
//publicamente; por eso este file es identico a showProfileQuery
//Falta anadir para q se pueda editar tambien los datos personales.

//saca los valores de GET
$id = $_GET['id'];
//conecta al db
require_once 'conecta/conecta.php';
if($cnx){
	require_once 'showProfile/showProfileQuery.php';
	$result = array(); 
	$profile = array();
	$recurso = pg_query($cnx, $query);
	if($recurso){ 	
//When you put bool values, arrays, or integers like the id, into a json format it allows
//the later use of functions like json_decode().  This makes possible
//the preservation of the datatypes, as stored in postgresql.  
//When jQuery.getJSON receives data it will build a javascript objects
//with the correct datatypes only if you preserve those datatypes, 
//otherwise it simply receives text, and you get hard to debug,
//wrong results.		
//Read data already in json format, and decode it into PHP variables with correct datatype	
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
//Send data from server in json format
		echo json_encode($profile);	
	}else{
		throw new Exception('Mal query.  Sin RECURSO.');
		//echo "<li>Error, pg_query, no produjo un recurso para result... en showProfile</li>";
	}
	pg_close($cnx); //maybe not needed but doesn't hurt	
}
?>
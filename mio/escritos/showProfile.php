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
		$profile['micro_empre_id'] = $result[0];
		$profile['nombre'] = $result[1];
		$profile['revisado'] = $result[2];
		$profile['videoUrl'] = $result[3];
		$profile['quienSocialHandle']['tt'] = $result[4];
		$profile['quienSocialHandle']['fbk'] = $result[5];
		$profile['quienSocialHandle']['igrm'] = $result[6];
		$profile['quienSocialHandle']['phn'] = $result[7];
		$profile['quienFotoSrc'] = $result[8];
		$profile['cuando']['lun'] = $result[9];
		$profile['cuando']['mar'] = $result[10];
		$profile['cuando']['mier'] = $result[11];
		$profile['cuando']['jue'] = $result[12];
		$profile['cuando']['vier'] = $result[13];
		$profile['cuando']['sab'] = $result[14];
		$profile['cuando']['dom'] = $result[15];		
		$profile['que'] = $result[16];	
		$profile['donde'] = $result[17];
		$profile['atucasa'] = $result[18];
		//json_encode($profile);
		//$profile['quienSocialHandle'] = $result[4];
		//$profile['cuando'] = $result[6];
	}else{
		echo "<li>Error, pg_query con indice de query $queryIndex, no produjo un recurso para result...</li>";
	}
	echo json_encode($profile);
	pg_close($cnx); //maybe not needed but doesn't hurt	
}
?>

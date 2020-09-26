<?php
//saca los valores de GET
$duenoId = $_GET['duenoId'];
//conecta al db
require_once 'conecta/conecta.php';
//i am sure i have a connection, because an exception was NOT thrown at conecta

require_once 'showNepesGetIds/showNepesGetIdsQuery.php';
$empresa =  array();
$empresas = array();
$recurso = pg_query($cnx, $getNepeIdsQuery);
if($recurso){
	$index = 0;
	while($empresa = pg_fetch_row($recurso) ){
		$empresas[$index]['nepeId'] = json_decode($empresa[0]);
		$empresas[$index]['nepeNombre'] = $empresa[1];
		$index++;
	}

//Send data from server in json format
	echo json_encode($empresas);
}else{
	throw new Exception('Mal query.  Sin RECURSO en: ' . __FILE__  );
	//echo "<li>Error, pg_query, no produjo un recurso para result... en getMicroEmpreData</li>";
}
pg_close($cnx); //maybe not needed but doesn't hurt

?>

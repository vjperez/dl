<?php
//saca los valores de GET
$duenoId = $_GET['duenoId'];
//conecta al db
require_once 'conecta/conecta.php';
//i am sure i have a connection, because an exception was NOT thrown at conecta

require_once 'showEmpresasGetIds/showEmpresasGetIdsQuery.php';
$empresa =  array();
$empresas = array();
$recurso = pg_query($cnx, $getMicroEmpreIdsQuery);
if($recurso){
	$index = 0;
	while($empresa = pg_fetch_row($recurso) ){
		$empresas[$index]['meId'] = json_decode($empresa[0]);
		$empresas[$index]['nombre'] = $empresa[1];
		$index++;
	}
	$empresas[$index]['meId'] = json_decode(0);  //in JS case 'editMicroEmpre':  we try to get data from db only if meId > o
	$empresas[$index]['nombre'] = 'Crea empresa';
//Send data from server in json format
	echo json_encode($empresas);
}else{
	throw new Exception('Mal query.  Sin RECURSO.');
	//echo "<li>Error, pg_query, no produjo un recurso para result... en getMicroEmpreData</li>";
}
pg_close($cnx); //maybe not needed but doesn't hurt

?>

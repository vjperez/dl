<?php
require_once 'conecta.php';

$query = $_GET['query'];
$resource = pg_query($cnx, $query);
if($resource){
	$ul = array();
	$index = 0;
	while($fila = pg_fetch_row($resource)){
		//$liString = '';
		//foreach($fila as $item){
		//	$liString += $item . '  '; 
		//}
		$ul[$index] = $fila;
		$index++;
	}
	echo json_encode($ul);
}else{
	echo "<li>Error, pg_query no produjo un result resource...</li>";
}

?>
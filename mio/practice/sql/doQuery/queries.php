<?php
require_once 'conecta.php';

$query = $_GET['query'];
$resource = pg_query($cnx, $query);
if($resource){
	$ul = array();
	$ul[0] = pg_num_rows($resource);  // the first row in the $ul array, is just a number
	$index = 1;						  //so must start counting from 1 here
	while($fila = pg_fetch_row($resource)){
		$ul[$index] = $fila;		  //other rows are arrays
		$index++;
	}
	echo json_encode($ul);
}else{
	echo "<li>Error, pg_query no produjo un result resource...</li>";
}
pg_close($cnx); //maybe not needed but doesn't hurt
?>
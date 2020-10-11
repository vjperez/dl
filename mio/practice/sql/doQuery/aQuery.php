<?php
require_once 'conecta.php';

$query = 'SELECT username, nombre FROM bregando 
			INNER JOIN  nepe   ON bregando.nepe_id   = nepe.id
			INNER JOIN  dueno  ON bregando.dueno_id  = dueno.id';
$resource = pg_query($cnx, $query);
if($resource){
	echo "<br><br>Query result:<br><br>";
	while($fila = pg_fetch_row($resource)){
		foreach($fila as $item){
			echo $item . " -- "; 
		}
		echo '<br>';
	}
	echo '<br>';
	if(pg_close($cnx))   echo 'Coneccion cerrada.';  else echo 'Coneccion sigue abierta.';  
}else{
	echo "<br><br>Error en el result resource...<br><br>";
	throw new Exception('Sin recurso en : ' . __FILE__ );
}
?>
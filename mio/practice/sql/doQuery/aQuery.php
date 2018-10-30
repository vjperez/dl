<?php
require_once 'conecta.php';

$query = 'SELECT username, nombre FROM bregando 
			INNER JOIN micro_empre ON bregando.micro_empre_id = micro_empre.micro_empre_id
			INNER JOIN usuario     ON bregando.usuario_id     = usuario.usuario_id';
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
	echo "Error en el result resource...";
}
?>
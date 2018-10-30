<?php
require_once 'datosConectar.php';

$cnx = pg_connect("$host $port $dbname $usuario");
if($cnx){
	//echo "Conectado a $dbname en $host.";
}else{
	echo "<li>Error conectando a $dbname en $host.</li>";
}
?>
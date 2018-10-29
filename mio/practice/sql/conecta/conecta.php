<?php
require_once 'datosConectar.php';

$cnx = pg_connect("$host $port $dbname $usuario");
if($cnx){
	echo "Conectado a $dbname en $host.";
}else{
	echo "Error conectando a $dbname en $host.";
	echo '\nError: ' . pg_last_error($cnx);
}
?>
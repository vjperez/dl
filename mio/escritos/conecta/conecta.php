<?php
require_once 'datosConectar.php';

$cnx = pg_connect("$host $port $dbname $usuario");
if($cnx){
	//echo "Conectado a $dbname en $host.";
}else{
	throw new Exception('Sin coneccion a BASEDATOS.');
	//echo "<li>Error conectando a $dbname en $host.</li>";
}

//YOU COULD INSTEAD SAY 
//IF NOT CONNECTED THEN THROW EXCEPTION, BUT THIS FOR ME IS MORE READABLE
?>
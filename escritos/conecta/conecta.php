<?php
require_once 'datosConectar.php';

$cnx = pg_connect(HOST . PORT . DBNAME . USUARIO);
if($cnx){
	//echo "Conectado a "  . DBNAME .  " en "  . HOST .  " !";
}else{
	throw new Exception('Sin coneccion a '  .  DBNAME . ' en file: '  .  __FILE__  .  ' y host compu: '  .  HOST );
}
//YOU COULD INSTEAD SAY 
//IF NOT CONNECTED THEN THROW EXCEPTION, BUT THIS FOR ME IS MORE READABLE
?>

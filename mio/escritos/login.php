<?php
//saca los valores de POST
$user = $_POST['user'];
$pass = $_POST['pass'];

//conecta al db
require_once 'conecta/conecta.php';
//i am sure i have a connection, because an exception was NOT thrown at conecta

require_once 'login/loginQuery.php';
$recurso = pg_query($cnx, $query + 'xcd');
if($recurso){		 
	if($fila = pg_fetch_row($recurso)){
		$dueno_id = $fila[0];
		$respuesta = json_decode('{"loguea":true,  "duenoId":' . $dueno_id . '}');
	}else{
		$respuesta = json_decode('{"loguea":false}');
	}
//Send data from server in json format
echo json_encode($respuesta);		
}else{
	throw new Exception('Mal query.  Sin RECURSO, para query loginQuery en :' . __FILE__ );
	//echo "<li>Error, pg_query, no produjo un recurso para result... en escritos\login</li>";
}
pg_close($cnx); //maybe not needed but doesn't hurt	

?>
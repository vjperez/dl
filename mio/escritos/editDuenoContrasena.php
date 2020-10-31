<?php
//saca los valores de POST
$dueno_id = $_POST['duenoId'];
$pass01 = $_POST['pass01'];

//conecta al db
require_once 'conecta/conecta.php';
//i am sure i have a connection, because an exception was NOT thrown at conecta

require_once 'editDuenoContrasena/editDuenoContrasenaQuery.php';
$recurso = pg_query($cnx, $query);
if($recurso){		 
	if(pg_affected_rows($recurso) == 1){
		$respuesta = json_decode('{"cambiado":true}');
	}elseif(pg_affected_rows($recurso) == 0){
		$respuesta = json_decode('{"cambiado":false}');
	}
//Send data from server in json format
echo json_encode($respuesta);		
}else{
	throw new Exception('Mal query.  Sin RECURSO, para editDuenoContrasenaQuery en: '  . __FILE__ );
	//echo "<li>Error, pg_query, no produjo un recurso para result... en escritos\login</li>";
}
pg_close($cnx); //maybe not needed but doesn't hurt	

?>
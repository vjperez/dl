<?php	
// query to insert new dueno on db
$queryInsert = "INSERT INTO
	dueno(nombre, clave, first_log, last_log)
	VALUES($1, $2, NOW()::date, NOW()::date)";
	// google  'RETURNING' clause on the INSERT INTO statement, and avoid a currval query

pg_prepare($cnx, "preparadoQueryInsert", $queryInsert);
?>

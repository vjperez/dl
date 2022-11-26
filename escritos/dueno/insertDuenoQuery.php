<?php
//case sensitive PostgreSQL search tito and tiTo are diferent
	
// query to insert new dueno on db
$queryInsertDueno = "INSERT INTO
	dueno(nombre, clave, first_log, last_log)
	VALUES($1, $2, NOW()::date, NOW()::date)";

pg_prepare($cnx, "preparadoQueryInsertDueno", $queryInsertDueno);
?>

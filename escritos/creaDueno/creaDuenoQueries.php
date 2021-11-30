<?php
//case sensitive PostgreSQL search tito and tiTo are diferent
$queryCheckUserName = "SELECT 
	id
FROM dueno
WHERE username = $1";

pg_prepare($cnx, "preparadoQueryCheckUserName", $queryCheckUserName);



 
// query to insert new dueno on db
$queryInsertDueno = "INSERT INTO
	dueno(username, password, first_log, last_log)
	VALUES($1, $2, NOW()::date, NOW()::date)";

pg_prepare($cnx, "preparadoQueryInsertDueno", $queryInsertDueno);
?>

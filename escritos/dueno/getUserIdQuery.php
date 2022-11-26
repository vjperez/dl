<?php
//case sensitive PostgreSQL search tito and tiTo are diferent

//query to get user id using a username
$queryGetUserId = "SELECT 
	id
FROM dueno
WHERE nombre = $1";

pg_prepare($cnx, "preparadoQueryGetUserId", $queryGetUserId);


?>
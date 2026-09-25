<?php
//query to get social id using email
$queryGetDuenoId = "SELECT 
	id
FROM dueno
WHERE emilio = $1";

pg_prepare($cnx, "preparadoQueryGetDuenoId", $queryGetDuenoId);
?>
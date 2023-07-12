<?php
//query to get user id using a username
$queryId = "SELECT 
	id
FROM dueno
WHERE nombre = $1";

pg_prepare($cnx, "preparadoQueryId", $queryId);
?>
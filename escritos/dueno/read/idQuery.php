<?php
//query to get user id using a 'nombre'
$queryId = "SELECT 
	id
FROM dueno
WHERE nombre = $1";

pg_prepare($cnx, "preparadoQueryGetIdFromNombre", $queryId);
?>
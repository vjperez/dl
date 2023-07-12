<?php
//query to find out if certain type of social exist for a dueno
$querySocialsId = "SELECT 
	id
FROM social
WHERE dueno_id = $1 AND tipo = $2";

pg_prepare($cnx, "preparadoQuerySocialsId", $querySocialsId);
?>
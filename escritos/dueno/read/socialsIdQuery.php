<?php
//query to find out (read) if for a dueno, social contacts exists
$querySocialsId = "SELECT 
	id
FROM social
WHERE dueno_id = $1";

pg_prepare($cnx, "preparadoQuerySocialsId", $querySocialsId);
?>
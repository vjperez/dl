<?php
//query to find out (read) if for a dueno, certain type of social contact exists
$querySocialsId = "SELECT 
	id
FROM social
WHERE dueno_id = $1 AND tipo = $2";

pg_prepare($cnx, "preparadoQuerySocialsId", $querySocialsId);
?>
<?php
// query to insert new dueno on db
$querySocialInsert = "INSERT INTO
	social(dueno_id, tipo, handle)
	VALUES($1, $2, $3)";

pg_prepare($cnx, "preparadoQuerySocialInsert", $querySocialInsert);
?>

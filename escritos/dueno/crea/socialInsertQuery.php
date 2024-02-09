<?php
// query to insert dueno's social red handle, using tipo and id
$querySocialInsert = "INSERT INTO
	social(dueno_id, tipo, handle)
	VALUES($1, $2, $3)";

pg_prepare($cnx, "preparadoQuerySocialInsert", $querySocialInsert);
?>

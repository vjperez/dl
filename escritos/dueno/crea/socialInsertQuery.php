<?php
// query to insert dueno's social red handle, using tipo and id
$querySocialInsert = "INSERT INTO
	social(dueno_id, contactos)
	VALUES($1, string_to_array( $2, ',' ))";

pg_prepare($cnx, "preparadoQuerySocialInsert", $querySocialInsert);
?>

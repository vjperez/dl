<?php
$query = "UPDATE 
	dueno
SET password = $1
WHERE id = $2";
pg_prepare($cnx, "preparo", $query);
$recurso = pg_execute($cnx, "preparo", array($hashed_pass01, $dueno_to_edit));
?>

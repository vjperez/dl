<?php
// query to update dueno social red
$querySocial = "UPDATE social
SET handle = $3
WHERE dueno_id = $1 AND tipo = $2";

pg_prepare($cnx, "preparadoQuerySocial", $querySocial);
?>

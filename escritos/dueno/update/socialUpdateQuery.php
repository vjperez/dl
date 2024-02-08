<?php
// query to update dueno's social red handle, using tipo and id
$querySocialUpdate = "UPDATE social
SET handle = $3
WHERE dueno_id = $1 AND tipo = $2";

pg_prepare($cnx, "preparadoQuerySocialUpdate", $querySocialUpdate);
?>

<?php
//joins dueno and social to get tipo and hangle using id
$querySocials = "SELECT
    tipo, handle
FROM social
WHERE dueno_id = $1";

pg_prepare($cnx, "preparadoQuerySocials", $querySocials);
?>

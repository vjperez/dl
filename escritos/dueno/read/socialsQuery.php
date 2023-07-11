<?php
$querySocials = "SELECT
    tipo, handle
FROM dueno 
INNER JOIN social  ON  social.dueno_id = dueno.id
WHERE dueno.id = $1";

pg_prepare($cnx, "preparadoQuerySocials", $querySocials);
?>
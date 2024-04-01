<?php
//gets social contacts using dueno id
$querySocials = "SELECT
    array_to_json( contactos )
FROM social
WHERE dueno_id = $1";

pg_prepare($cnx, "preparadoQuerySocials", $querySocials);
?>

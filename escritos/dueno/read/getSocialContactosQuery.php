<?php
//gets social contactos using dueno id
$queryGetSocialContactos = "SELECT
    array_to_json( contactos )
FROM social
WHERE dueno_id = $1";

pg_prepare($cnx, "preparadoQueryGetSocialContactos", $queryGetSocialContactos);
?>

<?php
// query to update dueno's social red handle, using tipo and id
$querySocialUpdate = "UPDATE social
SET 
    contactos = string_to_array( $2, ',' )
WHERE dueno_id = $1";

pg_prepare($cnx, "preparadoQuerySocialUpdate", $querySocialUpdate);
?>

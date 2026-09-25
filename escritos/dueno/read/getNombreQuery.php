<?php
//get nombre from social, using dueno_id
//see registra and social insert query, contactos[2] is "nombre", telefono is on index 1
$queryGetNombre = "SELECT
    contactos[2]
FROM social 
WHERE dueno_id = $1";

pg_prepare($cnx, "preparadoQueryGetNombre", $queryGetNombre);
?>
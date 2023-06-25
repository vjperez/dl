<?php

$queryNepesWithIds = "SELECT 
    nepe.id, nepe.nombre 
FROM dueno 
INNER JOIN nepe  ON nepe.dueno_id = dueno.id
WHERE dueno.id = $1";

pg_prepare($cnx, "preparadoQueryNepesWithIds", $queryNepesWithIds);

?>
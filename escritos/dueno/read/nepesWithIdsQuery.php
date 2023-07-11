<?php

$queryNepesWithIds = "SELECT 
    nepe.id, nepe.nombre 
FROM dueno 
INNER JOIN dueno_nepe  ON  dueno_nepe.dueno_id = dueno.id
INNER JOIN nepe        ON  dueno_nepe.nepe_id  =  nepe.id
WHERE dueno.id = $1";

pg_prepare($cnx, "preparadoQueryNepesWithIds", $queryNepesWithIds);

?>
<?php
//joins dueno dueno_nepe and nepe to get nepe info for a given dueno id
$queryNepesWithIds = "SELECT 
    nepe.id, nepe.nombre 
FROM dueno 
INNER JOIN dueno_nepe  ON  dueno_nepe.dueno_id = dueno.id
INNER JOIN nepe        ON  dueno_nepe.nepe_id  =  nepe.id
WHERE dueno.id = $1";

pg_prepare($cnx, "preparadoQueryNepesWithIds", $queryNepesWithIds);

?>
<?php

$getNepeIdsQuery = "SELECT 
    nepe.id, nepe.nombre 
FROM dueno 
INNER JOIN nepe  ON nepe.dueno_id = dueno.id
WHERE dueno.id = '$dueno_to_query'";

?>
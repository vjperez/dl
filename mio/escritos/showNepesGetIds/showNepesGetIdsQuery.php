<?php
$getNepeIdsQuery = "SELECT
nepe.id, nepe.nombre 
FROM dueno 
INNER JOIN  bregando ON dueno.id = bregando.dueno_id 
INNER JOIN nepe  ON nepe.id = bregando.nepe_id
WHERE dueno.id = '$duenoId'";
?>
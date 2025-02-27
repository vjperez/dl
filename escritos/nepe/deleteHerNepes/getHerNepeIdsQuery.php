<?php

$getHerNepeIdsQuery = "SELECT 
dueno_nepe.nepe_id
FROM dueno_nepe  
INNER JOIN nepe  ON nepe.id = dueno_nepe.nepe_id
WHERE dueno_nepe.dueno_id = $1";

pg_prepare($cnx, "preparadoQueryGetHerNepeIds", $getHerNepeIdsQuery);

?>
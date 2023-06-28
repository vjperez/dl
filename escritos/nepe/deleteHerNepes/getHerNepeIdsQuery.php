<?php

$getHerNepeIdsQuery = "SELECT 
nepe.id
FROM dueno 
INNER JOIN  bregando ON dueno.id = bregando.dueno_id 
INNER JOIN nepe  ON nepe.id = bregando.nepe_id
WHERE dueno.id = '$user_to_leave_without_nepes'";

$recurso = pg_query($cnx, $getHerNepeIdsQuery);

?>
<?php

$getHerNepeIdsQuery = "SELECT 
dueno_nepe.nepe_id
FROM dueno_nepe  
INNER JOIN nepe  ON nepe.id = dueno_nepe.nepe_id
WHERE dueno_nepe.dueno_id = '$user_to_leave_without_nepes'";

$recurso = pg_query($cnx, $getHerNepeIdsQuery);

?>
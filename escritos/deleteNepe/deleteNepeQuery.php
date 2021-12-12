<?php


$query = "DELETE 
FROM nepe
INNER JOIN  bregando ON dueno.id = bregando.dueno_id 
INNER JOIN nepe  ON nepe.id = bregando.nepe_id
WHERE id = $2";
pg_prepare($cnx, "preparo", $query);
$recurso = pg_execute($cnx, "preparo", array($hashed_pass01, $dueno_to_edit));
?>


<?php
$getNepeIdsQuery = "SELECT
nepe.id, nepe.nombre 
FROM dueno 
INNER JOIN  bregando ON dueno.id = bregando.dueno_id 
INNER JOIN nepe  ON nepe.id = bregando.nepe_id
WHERE dueno.id = '$dueno_to_query'";
?>
<?php
$getMicroEmpreIdsQuery = "SELECT
micro_empre.micro_empre_id, micro_empre.nombre 
FROM dueno 
INNER JOIN  bregando ON dueno.dueno_id = bregando.dueno_id 
INNER JOIN micro_empre  ON micro_empre.micro_empre_id = bregando.micro_empre_id
WHERE dueno.dueno_id = '$duenoId'";
?>
<?php
$getMicroEmpreIdsQuery = "SELECT
	micro_empre.micro_empre_id, nombre
FROM bregando INNER JOIN micro_empre ON micro_empre.micro_empre_id = bregando.micro_empre_id
WHERE dueno_id = '$duenoId'";
?>

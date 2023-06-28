<?php

$deleteNepeQuery = "DELETE 
FROM nepe
WHERE id = '$nepe_to_delete'";
$recurso = pg_query($cnx, $deleteNepeQuery);

?>
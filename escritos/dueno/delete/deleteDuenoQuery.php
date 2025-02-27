<?php

$deleteDuenoQuery = "DELETE 
FROM dueno
WHERE id = $1";

pg_prepare($cnx, "preparadoQueryDeleteDueno", $deleteDuenoQuery);  

?>
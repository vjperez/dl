<?php

$deleteNepeQuery = "DELETE 
FROM nepe
WHERE id = $1";

pg_prepare($cnx, "preparadoQueryDeleteNepe", $deleteNepeQuery);  

?>
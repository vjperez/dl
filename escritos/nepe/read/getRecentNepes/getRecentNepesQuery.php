<?php
define("INTERVALO_DIAS", 30);

$queryGetRecentNepes = "SELECT
    nepe.id, nepe.nombre, (now()::date - nepe.creado) as dias 
FROM nepe

WHERE (now()::date - nepe.creado) < $1  
order by dias asc";

pg_prepare($cnx, "preparadoQueryGetRecentNepes", $queryGetRecentNepes);
?>
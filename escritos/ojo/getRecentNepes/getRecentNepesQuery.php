<?php
$intervalo_en_dias = 14;
$getRecentNepesQuery = "SELECT
    nepe.id, nepe.nombre, (now()::date - nepe.creado) as dias 
FROM nepe

WHERE (now()::date - nepe.creado) < $intervalo_en_dias 
order by dias asc";
?>
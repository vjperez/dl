<?php
$intervalo_en_dias = 60;
$getRecentNepesQuery = "SELECT
    nepe.id, nepe.nombre, (now()::date - nepe.revisado) as dias 
FROM nepe

WHERE (now()::date - nepe.revisado) < $intervalo_en_dias 
order by dias asc";
?>
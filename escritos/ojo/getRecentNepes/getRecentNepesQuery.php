<?php
$intervalo_en_dias = 1 * 365;
$getRecentNepesQuery = "SELECT
    nepe.id, nepe.nombre, array_to_json(nepe.media_foto_url), (now()::date - nepe.revisado) as dias 
FROM nepe

WHERE (now()::date - nepe.revisado) < $intervalo_en_dias 
order by dias asc";
?>
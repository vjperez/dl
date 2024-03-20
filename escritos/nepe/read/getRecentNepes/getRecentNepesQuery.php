<?php

$queryGetRecentNepes = "SELECT
    id, nombre, (now()::date - revisado) as dias 
    FROM nepe
    WHERE ((now()::date - revisado)  <  $1)
    order by dias asc";

pg_prepare($cnx, "preparadoQueryGetRecentNepes", $queryGetRecentNepes);
?>
<?php
$queryGetFotos = "SELECT json_agg(url) as losFoto  
        FROM foto
        WHERE nepe_id = $1" ;

pg_prepare($cnx, "preparadoQueryGetFotos", $queryGetFotos);
?>
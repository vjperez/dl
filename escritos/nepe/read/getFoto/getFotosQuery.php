<?php
$queryGetFotos = "SELECT array_to_json(urls) 
        FROM foto
        WHERE nepe_id = $1" ;

pg_prepare($cnx, "preparadoQueryGetFotos", $queryGetFotos);
?>
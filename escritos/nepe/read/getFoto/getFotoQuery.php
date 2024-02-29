<?php
$queryGetFoto = "SELECT
    foto.url 
FROM foto

WHERE id = $1";

pg_prepare($cnx, "preparadoQueryGetFoto", $queryGetFoto);
?>
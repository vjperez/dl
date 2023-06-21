<?php
$queryNombre = "SELECT
    nombre
FROM dueno 
WHERE id = $1";

pg_prepare($cnx, "preparadoQueryNombre", $queryNombre);
?>
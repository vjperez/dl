<?php
// sacando el id primero y despues seteando last log usando id 

$queryGetIdAndPassword = "SELECT id, clave
FROM dueno
WHERE nombre = $1";

pg_prepare($cnx, "preparadoQueryGetIdAndPassword", $queryGetIdAndPassword);

?>
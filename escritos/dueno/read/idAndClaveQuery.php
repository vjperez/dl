<?php
// sacando el id primero y despues seteando last log usando id 

$queryIdAndClave = "SELECT id, clave
FROM dueno
WHERE nombre = $1";

pg_prepare($cnx, "preparadoQueryIdAndClave", $queryIdAndClave);

?>
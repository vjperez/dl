<?php
// sacando el id y clave usando nombre
// despues se setea last log usando id 

$queryIdAndClave = "SELECT id, clave
FROM dueno
WHERE nombre = $1";

pg_prepare($cnx, "preparadoQueryIdAndClave", $queryIdAndClave);

?>
<?php
// sacando el id y clave usando email
// despues se setea last log usando id 

$queryGetIdAndClave = "SELECT id, clave
FROM dueno
WHERE emilio = $1";

pg_prepare($cnx, "preparadoQueryGetIdAndClave", $queryGetIdAndClave);

?>
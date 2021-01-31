<?php
// sacando el id primero y despues seteando last log usando id 

$queryGetIdAndPassword = "SELECT id, password
FROM dueno
WHERE username = $1";
pg_prepare($cnx, "preparo", $queryGetIdAndPassword);
$recurso = pg_execute($cnx, "preparo", array($user));
?>
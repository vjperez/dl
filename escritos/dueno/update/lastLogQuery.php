<?php
//  saque el id primero y ahora seteo last log usando id 

$queryLastLog = "UPDATE dueno
SET last_log = NOW()::date 
WHERE id = $1";

pg_prepare($cnx, "preparadoQueryLastLog", $queryLastLog);
?>

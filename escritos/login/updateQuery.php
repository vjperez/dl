<?php
//  saque el id primero y ahora seteo last log usando id 

$queryUpdate = "UPDATE dueno
SET last_log = NOW()::date 
WHERE id = $dueno_id";

?>

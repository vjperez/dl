<?php
// sacando el id primero y despues seteando last log usando id 

$queryGetIdAndPassword = "SELECT id, password
FROM dueno
WHERE username = '$user'";
?>
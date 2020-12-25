<?php
// podrias sacar el id primero y setear last log usando id
$query = "UPDATE 
		dueno
SET last_log = NOW()::date 
WHERE username = '$user'
AND password = '$hashed_pass'

 ;

	SELECT 
	id
FROM dueno 
WHERE username = '$user'
AND password = '$hashed_pass'";
?>
<?php
$query = "UPDATE 
		dueno
SET last_log = NOW()::date 
WHERE username = '$user'
AND password = '$pass'

 ;

	SELECT 
	dueno_id
FROM dueno 
WHERE username = '$user'
AND password = '$pass'";
?>
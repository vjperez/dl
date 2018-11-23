<?php
$query = "UPDATE 
		usuario
SET last_log = NOW()::date 
WHERE username = '$user'
AND password = '$pass'

 ;

	SELECT 
	usuario_id
FROM usuario 
WHERE username = '$user'
AND password = '$pass'";
?>
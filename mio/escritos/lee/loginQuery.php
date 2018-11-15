<?php
$query = "SELECT 
	usuario_id
FROM usuario 
WHERE username = '$user'
AND password = '$pass'";
?>
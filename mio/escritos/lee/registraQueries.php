<?php
$queryCheckUserName = "SELECT 
	usuario_id
FROM usuario 
WHERE username = '$usertb'";

//double query
$queryRegisterUserReturningId = "INSERT INTO 
	usuario(username, password, first_log, last_log) 
	VALUES('$usertb', '$pass01', NOW()::date, NOW()::date)
	
	; 
	
	SELECT currval('usuario_usuario_id_seq')";
?>
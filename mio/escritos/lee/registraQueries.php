<?php
$queryCheckUserName = "SELECT 
	usuario_id
FROM usuario 
WHERE username = '$usertb'";

//double query
$queryRegisterUserReturningId = "INSERT INTO 
	usuario(username, password) 
	VALUES('$usertb', '$pass01'); 
	
	SELECT currval('usuario_usuario_id_seq')";
?>
<?php
//case sensitive PostgreSQL search tito and tiTo are diferent
$queryCheckUserName = "SELECT 
	id
FROM dueno
WHERE username = '$usertb'";

//double query
$queryRegisterUserReturningId = "INSERT INTO
	dueno(username, password, first_log, last_log)
	VALUES('$usertb', '$pass01', NOW()::date, NOW()::date)

	;

	SELECT currval('dueno_dueno_id_seq')";
?>

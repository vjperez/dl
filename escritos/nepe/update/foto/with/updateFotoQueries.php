<?php
$queryGetFotos = "SELECT id, url  
FROM foto
WHERE nepe_id = $1" ;
pg_prepare($cnx, "preparadoQueryGetFotos", $queryGetFotos);


$queryUpdateFoto = "UPDATE foto
SET
	url = $2,
	revisado = NOW()::date 
WHERE id = $1";
pg_prepare($cnx, "preparedQueryUpdateFoto", $queryUpdateFoto);


$queryInsertFoto = "INSERT INTO foto (url, nepe_id, creado, revisado)
	VALUES(url = $1, nepe_id = $2, creado = NOW()::date, revisado = NOW()::date)";
pg_prepare($cnx, "preparedQueryInsertFoto", $queryInsertFoto);



?>

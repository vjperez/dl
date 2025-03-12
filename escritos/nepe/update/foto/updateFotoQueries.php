<?php
$queryGetFotoUrls = "SELECT to_json(urls), to_json(prox_indice) 
	FROM foto
	WHERE nepe_id = $1" ;
pg_prepare($cnx, "preparadoQueryGetFotoUrls", $queryGetFotoUrls);


$queryUpdateFoto = "UPDATE foto
SET
	urls = string_to_array($2, ','),
	prox_indice = $3,
	revisado = NOW()::date 
WHERE nepe_id = $1";
pg_prepare($cnx, "preparadoQueryUpdateFoto", $queryUpdateFoto);


$queryInsertFotoUrls = "INSERT INTO foto (nepe_id, urls, creado, revisado)
	VALUES($1, string_to_array($2, ','), NOW()::date, NOW()::date)";
pg_prepare($cnx, "preparadoQueryInsertFotoUrls", $queryInsertFotoUrls);


?>

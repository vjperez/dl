<?php
//updates nepe core parts
$queryUpdateNepe = "UPDATE nepe SET
 	nombre=$2, cuando=$3, su_casa=$4, desde_casa=$5, revisado=NOW()::date
	WHERE id=$1";
pg_prepare($cnx, "preparadoQueryUpdateNepe", $queryUpdateNepe);


$queryInsertVideoUrl = "INSERT INTO video (url, nepe_id, creado, revisado)
	VALUES ($1, $2, NOW()::date, NOW()::date)";
pg_prepare($cnx, "preparadoQueryInsertVideoUrl", $queryInsertVideoUrl);


$queryUpdateVideoUrl = "UPDATE video SET
	url=$1, revisado=NOW()::date
	WHERE nepe_id=$2";
pg_prepare($cnx, "preparadoQueryUpdateVideoUrl", $queryUpdateVideoUrl);
?>
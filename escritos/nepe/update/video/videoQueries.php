<?php
//query to get video id using nepe_id
$queryNepeHasVideo = "SELECT 
	id
	FROM video
	WHERE nepe_id = $1";
pg_prepare($cnx, "preparadoQueryNepeHasVideo", $queryNepeHasVideo);


$queryInsertVideoUrl = "INSERT INTO video (url, nepe_id, creado, revisado)
	VALUES ($1, $2, NOW()::date, NOW()::date)";
pg_prepare($cnx, "preparadoQueryInsertVideoUrl", $queryInsertVideoUrl);


$queryUpdateVideoUrl = "UPDATE video SET
	url=$1, revisado=NOW()::date
	WHERE nepe_id=$2";
pg_prepare($cnx, "preparadoQueryUpdateVideoUrl", $queryUpdateVideoUrl);


$queryRemoveVideoUrl = "DELETE from video
	WHERE nepe_id=$1";
pg_prepare($cnx, "preparadoQueryRemoveVideoUrl", $queryRemoveVideoUrl);
?>
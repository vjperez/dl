<?php
//query to get video id using nepe_id
$queryNepeHasVideo = "SELECT 
	id
	FROM video
	WHERE nepe_id = $1";
pg_prepare($cnx, "preparadoQueryNepeHasVideo", $queryNepeHasVideo);
?>
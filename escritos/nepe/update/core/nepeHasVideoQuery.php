<?php
//query to get user id using a 'nombre'
$queryNepeHasVideo = "SELECT 
	id
	FROM video
	WHERE nepe_id = $1";

pg_prepare($cnx, "preparadoQueryNepeHasVideo", $queryNepeHasVideo);
?>
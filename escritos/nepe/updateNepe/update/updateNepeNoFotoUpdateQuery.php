<?php
//que and donde receive data from JSON stringify (a string in json format).
// In order to form a postgresql array, i first extract the elements and then 
// aggregate them into a postgresql array.  So this query should manage data
// sent by any language as long as they send it in JSON strinngify format
$queryUpdateNepe = "UPDATE nepe
SET
	nombre = $1,
	media_video_url = $2,
	media_social_handle = $3,
	
	cuando = $4,
	que   = $5,
	donde = $6,
	a_tu_casa = $7,
	nombre_que_vector =	to_tsvector('spanish', unaccent($8)),
	donde_vector = to_tsvector('simple', unaccent($9)),
	revisado = NOW()::date 
WHERE id = $10";

pg_prepare($cnx, "preparedQueryUpdateNepe", $queryUpdateNepe);
$recurso = pg_execute($cnx, "preparedQueryUpdateNepe", array($nombre, $videoUrl, $quien_social_handle,
															 $cuando, $quePosgreArray, $dondePosgreArray, $a_tu_casa, 
															 $nombre . ' ' . $quePosgreArray,
															 $dondePosgreArray,
															 $nepe_id
															));
?>

<?php
$queryUpdateNepe = "UPDATE nepe
SET
	nombre = $1,
	media_video_url = $2,
	media_social_handle = $3,
	media_foto_url = $4,
	cuando = $5,
	que   = $6,
	donde = $7,
	a_tu_casa = $8,
	nombre_que_vector =	to_tsvector('spanish', unaccent($9)),
	donde_vector = to_tsvector('simple', unaccent($10)),
	revisado = NOW()::date 
WHERE id = $11";

pg_prepare($cnx, "preparedQueryUpdateNepe", $queryUpdateNepe);
$recurso = pg_execute($cnx, "preparedQueryUpdateNepe", array($nombre, $videoUrl, $quien_social_handle, $mediaFotoUrlPosgreArray,
															 $cuando, $quePosgreArray, $dondePosgreArray, $a_tu_casa, 
															 $nombre . ' ' . $quePosgreArray,
															 $dondePosgreArray,
															 $nepe_id
															));
?>

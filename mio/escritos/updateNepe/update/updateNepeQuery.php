<?php
//que and donde receive data from JSON stringify (a string in json format).
// In order to form a postgresql array, i first extract the elements and then 
// aggregate them into a postgresql array.  So this query should manage data
// sent by any language as long as they send it in JSON strinngify format
$query = "UPDATE
	micro_empre
SET revisado = NOW()::date,
nombre = '$nombre',
media_video_url = '$videoUrl',
media_social_handle = '$quien_social_handle',
media_foto_url = '$quien_foto_srcPosgreArray',
cuando = '$cuando',
que   = '$quePosgreArray',
donde = '$dondePosgreArray',
nombre_que_vector =	to_tsvector('spanish', '$nombre' || ' ' || '$quePosgreArray' ),
donde_vector = to_tsvector('simple', '$dondePosgreArray' ),
a_tu_casa = '$a_tu_casa'
WHERE micro_empre_id = '$micro_empre_id'";
?>

<?php
//double query

//que and donde receive data from JSON stringify (a string in json format).
// In order to form a postgresql array, i first extract the elements and then 
// aggregate them into a postgresql array.  So this query should manage data
// sent by any language as long as they send it in JSON strinngify format

// inserts a into db a nepe with fotos

$queryCreaNepeReturningId = "INSERT INTO
	nepe (revisado, nombre, media_video_url, media_social_handle, media_foto_url, cuando, que, donde, nombre_que_vector, donde_vector, a_tu_casa)
 	VALUES (NOW()::date,
	'$nombre',
	'$videoUrl',
	'$quien_social_handle',
	'$mediaFotoUrlPosgreArray',
	'$cuando', 
	'$quePosgreArray',
	'$dondePosgreArray',
	to_tsvector('spanish', '$nombre' || ' ' || '$quePosgreArray' ),
	to_tsvector('simple', '$dondePosgreArray' ),
	$a_tu_casa)

;

SELECT currval('nepe_id_seq')";
?>
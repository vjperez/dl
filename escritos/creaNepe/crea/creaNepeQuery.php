<?php
//double query

//que and donde receive data from JSON stringify (a string in json format).
// In order to form a postgresql array, i first extract the elements and then 
// aggregate them into a postgresql array.  So this query should manage data
// sent by any language as long as they send it in JSON strinngify format

// inserts a into db a nepe with fotos

$queryCreaNepe = "INSERT INTO
	nepe (revisado, nombre, media_video_url, media_social_handle, media_foto_url, cuando, que, donde, a_tu_casa, nombre_que_vector, donde_vector)
 	VALvUES (NOW()::date,
	$1,
	$2,
	$3,
	$4,
	$5, 
	$6,
	$7,
	$8,
	to_tsvector('spanish', $1 || ' ' || $6 ),
	to_tsvector('simple', $7 )    )";

	pg_prepare($cnx, "preparo", $queryCreaNepe);
	$recurso = pg_execute($cnx, "preparo", array($nombre, $videoUrl, $quien_social_handle, $mediaFotoUrlPosgreArray, $cuando, $quePosgreArray, $dondePosgreArray, $a_tu_casa));



$querySelectNepeIdCurrval = "SELECT currval('nepe_id_seq')";
?>
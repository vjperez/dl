<?php
//double query

//que and donde receive data from JSON stringify (a string in json format).
// In order to form a postgresql array, i first extract the elements and then 
// aggregate them into a postgresql array.  So this query should manage data
// sent by any language as long as they send it in JSON stringify format

// inserts a into db a nepe with fotos
$queryInsertNepe = "INSERT INTO
	nepe (nombre, media_video_url, media_social_handle, media_foto_url, cuando, que, donde, a_tu_casa, nombre_que_vector, donde_vector, revisado)
 	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, to_tsvector('spanish', unaccent($9)), to_tsvector('simple', unaccent($10)), NOW()::date )";

pg_prepare($cnx, "preparadoQueryInsertNepe", $queryInsertNepe);



$querySelectNepeIdCurrval = "SELECT currval('nepe_id_seq')";
?>
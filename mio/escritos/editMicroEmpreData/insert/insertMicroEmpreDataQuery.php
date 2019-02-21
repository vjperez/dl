<?php
//double query

//que and donde receive data from JSON stringify (a string in json format).
// In order to form a postgresql array, i first extract the elements and then 
// aggregate them into a postgresql array.  So this query should manage data
// sent by any language as long as they send it in JSON strinngify format
$queryInsertMicroEmpreReturningId = "INSERT INTO
	micro_empre (revisado, nombre, video_url, quien_social_handle, quien_foto_src, cuando, que, donde, a_tu_casa)
 	VALUES (NOW()::date, '$nombre', '$videoUrl', '$quien_social_handle', '{sin foto, no foto}', '$cuando', 
	'$quePosgreArray', '$dondePosgreArray',  $a_tu_casa)

;

SELECT currval('micro_empre_micro_empre_id_seq')";



?>

<?php
//double query
$queryInsertMicroEmpreReturningId = "INSERT INTO
	micro_empre (revisado, nombre, video_url, quien_social_handle, quien_foto_src, cuando, que, donde, a_tu_casa)
 	VALUES (NOW()::date, '$nombre', '$videoUrl', '$quien_social_handle', '{sin foto, no foto}', '$cuando', '$que', '$donde',  $a_tu_casa)

;

SELECT currval('micro_empre_micro_empre_id_seq')";


//insert into bregando
$queryInsertBregando = "INSERT INTO
	bregando(dueno_id, micro_empre_id)
	VALUES($dueno_id, $micro_empre_id)";
?>

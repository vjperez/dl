<?php
//When you put bool values, arrays, or integers like nepe id, into a json format it allows
//the later use of functions like json_decode(), making it possible
//to preservate datatypes, as stored in  postgresql.
//When jQuery.getJSON receives data it will build a javascript objects
//with the correct datatypes only if you preserve those datatypes,
//otherwise it simply receives text, and you get hard to debug,
//wrong results.
$queryGetNepe = "SELECT
	to_json(nepe.id),
	to_char(nepe.creado,   'MM/DD/YYYY'),
	to_char(nepe.revisado, 'MM/DD/YYYY'),
	nombre,
	cuando,
	su_casa,
	desde_casa,
	video.url,
	array(
		SELECT
			que.frase
		FROM nepe_que left JOIN que
			ON nepe_que.que_id = que.id	
		WHERE nepe_que.nepe_id = $1
	) as losQue,
    array(
		SELECT
			donde.frase
		FROM nepe_donde left JOIN donde
			ON nepe_donde.donde_id = donde.id	
		WHERE nepe_donde.nepe_id = $1
	) as losDonde
FROM nepe left JOIN video
	ON nepe.id = video.nepe_id	
WHERE nepe.id = $1";
pg_prepare($cnx, "preparadoQueryGetNepe", $queryGetNepe);
?>

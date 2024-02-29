<?php
//When you put bool values, arrays, or integers like nepe id, into a json format it allows
//the later use of functions like json_decode(), making it possible
//to preservate datatypes, as stored in  postgresql.
//When jQuery.getJSON receives data it will build a javascript objects
//with the correct datatypes only if you preserve those datatypes,
//otherwise it simply receives text, and you get hard to debug,
//wrong results.
$queryGetNepe = "SELECT
	to_json(id),
	to_char(creado, 'MM/DD/YYYY'),
	nombre,
	cuando,
	to_json(su_casa),
	to_json(desde_casa)
FROM nepe 
WHERE id = $1";
pg_prepare($cnx, "preparadoQueryGetNepe", $queryGetNepe);
?>

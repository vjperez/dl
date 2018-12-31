<?php

//When searching, use a percentMatch() 'que' vs 'que' and 'donde' vs 'donde'


//barbero -> barbero   +   moca -> moca
$queries[1] = "SELECT quien_foto_src, micro_empre_id FROM micro_empre
			WHERE '$queLiteralStr' = ANY(que)
			AND '$dondeLiteralStr' = ANY(donde)";
/*
SELECT queasrows.micro_empre_id, losque, losdonde, queasrows.quien_foto_src  FROM (
				  SELECT micro_empre_id, unnest (que) losque, quien_foto_src FROM micro_empre
	 ) queasrows
	 INNER JOIN (
				  SELECT micro_empre_id, unnest (donde) losdonde, quien_foto_src FROM micro_empre
	 ) dondeasrows
	ON queasrows.micro_empre_id = dondeasrows.micro_empre_id
	WHERE losque = 'barbero' AND losdonde = 'moca';
*/



//barbero -> barbero
$queries[3] = "SELECT quien_foto_src, micro_empre_id FROM micro_empre
			WHERE '$queLiteralStr' = ANY(que)";
/*
SELECT micro_empre_id, losque, quien_foto_src FROM
				 (
				  SELECT micro_empre_id, unnest (que) losque, quien_foto_src FROM micro_empre
				 ) queasrows
WHERE losque = 'barbero';
*/



//moca -> moca
$queries[5] = "SELECT quien_foto_src, micro_empre_id FROM micro_empre
			WHERE '$dondeLiteralStr' = ANY(donde)";
/*
SELECT micro_empre_id, losdonde, quien_foto_src  FROM
				 (
				  SELECT micro_empre_id, unnest (donde) losdonde, quien_foto_src FROM micro_empre
				 ) dondeasrows
WHERE losdonde = 'moca';
*/







//barber -> los barberos, la barberia   +   junco -> juncos, maya -> mayaguez, baya -> bayamon, kiss -> kissimmee
$queries[2] = "SELECT queasrows.quien_foto_src, queasrows.micro_empre_id FROM (
				  SELECT micro_empre_id, unnest (que) losque, quien_foto_src FROM micro_empre
	 ) queasrows
	 INNER JOIN (
				  SELECT micro_empre_id, unnest (donde) losdonde, quien_foto_src FROM micro_empre
	 ) dondeasrows
	ON queasrows.micro_empre_id = dondeasrows.micro_empre_id
	WHERE losque iLIKE '%$queLiteralStr%' AND losdonde  iLIKE '%$dondeLiteralStr%'";
/*
$queries[2] = "SELECT quien_foto_src, micro_empre_id
			FROM  (SELECT quien_foto_src, micro_empre_id, unnest (que) losque, unnest (donde) losdonde FROM micro_empre) queasrows
			WHERE losque iLIKE '%$queLiteralStr%'
			AND losdonde iLIKE '%$dondeLiteralStr%'";
*/

//barber -> los barberos, la barberia      eria -> panaderia, heladeria, barberia
$queries[4] = "SELECT quien_foto_src, micro_empre_id
			FROM  (SELECT quien_foto_src, micro_empre_id, unnest (que) losque FROM micro_empre) queasrows
			WHERE losque iLIKE '%$queLiteralStr%'";

//junco -> juncos, maya -> mayaguez, baya -> bayamon, kiss -> kissimmee
$queries[6] = "SELECT DISTINCT quien_foto_src, micro_empre_id
			FROM  (SELECT quien_foto_src, micro_empre_id, unnest (donde) losdonde FROM micro_empre) dondeasrows
			WHERE losdonde iLIKE '%$dondeLiteralStr%'";







//Othe way to query array
//$query = 'SELECT micro_empre_id, que FROM micro_empre WHERE que @> ARRAY['payaso']::varchar[]';
?>

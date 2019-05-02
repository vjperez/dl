<?php

//When searching, use a percentMatch() 'que' vs 'que' and 'donde' vs 'donde'


//barbero -> barbero   +   moca -> moca
//If pattern does not contain percent signs or underscore, then the pattern only represents the string itself;
//in that case LIKE acts like the equals operator
$queries['literalBoth'] = "SELECT array_to_json(quien_foto_src), micro_empre_id FROM micro_empre
			WHERE '$queLiteralStr'  iLIKE  ANY(que)
			AND '$dondeLiteralStr'  iLIKE  ANY(donde)";
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
//If pattern does not contain percent signs or underscore, then the pattern only represents the string itself;
//in that case LIKE acts like the equals operator
$queries['literalQue'] = "SELECT array_to_json(quien_foto_src), micro_empre_id FROM micro_empre
			WHERE '$queLiteralStr' iLIKE  ANY(que)";
/*
SELECT micro_empre_id, losque, quien_foto_src FROM
				 (
				  SELECT micro_empre_id, unnest (que) losque, quien_foto_src FROM micro_empre
				 ) queasrows
WHERE losque = 'barbero';
*/



//moca -> moca
//If pattern does not contain percent signs or underscore, then the pattern only represents the string itself;
//in that case LIKE acts like the equals operator
$queries['literalDonde'] = "SELECT array_to_json(quien_foto_src), micro_empre_id FROM micro_empre
			WHERE '$dondeLiteralStr' iLIKE  ANY(donde)";
/*
SELECT micro_empre_id, losdonde, quien_foto_src  FROM
				 (
				  SELECT micro_empre_id, unnest (donde) losdonde, quien_foto_src FROM micro_empre
				 ) dondeasrows
WHERE losdonde = 'moca';
*/







//barber -> los barberos, la barberia   +   junco -> juncos, maya -> mayaguez, baya -> bayamon, kiss -> kissimmee
//to not repeat literals ... add to where    AND losque NOT iLIKE '$queLiteralStr' AND losdonde NOT iLIKE '$dondeLiteralStr'
$queries['embeddedBoth'] = "SELECT array_to_json(queasrows.quien_foto_src), queasrows.micro_empre_id, COUNT(losque) cuentaenlosque
   FROM ( SELECT micro_empre_id, unnest (que) losque, quien_foto_src FROM micro_empre ) queasrows
	 INNER JOIN
	      ( SELECT micro_empre_id, unnest (donde) losdonde, quien_foto_src FROM micro_empre ) dondeasrows
	ON queasrows.micro_empre_id = dondeasrows.micro_empre_id
	WHERE losque iLIKE '%$queLiteralStr%' AND losdonde  iLIKE '%$dondeLiteralStr%'
	GROUP BY queasrows.quien_foto_src, queasrows.micro_empre_id
	ORDER BY cuentaenlosque DESC";
/*
$queries[2] = "SELECT quien_foto_src, micro_empre_id
			FROM  (SELECT quien_foto_src, micro_empre_id, unnest (que) losque, unnest (donde) losdonde FROM micro_empre) queasrows
			WHERE losque iLIKE '%$queLiteralStr%'
			AND losdonde iLIKE '%$dondeLiteralStr%'";
*/

//barber -> los barberos, la barberia      eria -> panaderia, heladeria, barberia
//to not repeat literals ... ad to where    AND losque NOT iLIKE '$queLiteralStr' 
$queries['embeddedQue'] = "SELECT array_to_json(quien_foto_src), micro_empre_id, COUNT(losque) cuentaenlosque
			FROM  (SELECT quien_foto_src, micro_empre_id, unnest (que) losque FROM micro_empre) queasrows
			WHERE losque iLIKE '%$queLiteralStr%'
			GROUP BY quien_foto_src, micro_empre_id
			ORDER BY cuentaenlosque DESC";

//junco -> juncos, maya -> mayaguez, baya -> bayamon, kiss -> kissimmee
//to not repeat literals ... ad to where     AND losdonde NOT iLIKE '$dondeLiteralStr'
$queries['embeddedDonde'] = "SELECT array_to_json(quien_foto_src), micro_empre_id
			FROM  (SELECT quien_foto_src, micro_empre_id, unnest (donde) losdonde FROM micro_empre) dondeasrows
			WHERE losdonde iLIKE '%$dondeLiteralStr%'
			";


//select queries to used
switch($buscaMode){
	case 'buscaQue':
		$queries[1] = $queries['literalQue'];
		$queries[2] = $queries['embeddedQue'];
		break;
	case 'buscaDonde':
	  $queries[1] = $queries['literalDonde'];
	  $queries[2] = $queries['embeddedDonde'];
		break;
	case 'buscaBoth':
	  $queries[1] = $queries['literalBoth'];
	  $queries[2] = $queries['embeddedBoth'];
		break;
}




//Othe way to query array
//$query = 'SELECT micro_empre_id, que FROM micro_empre WHERE que @> ARRAY['payaso']::varchar[]';
?>

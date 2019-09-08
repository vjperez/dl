<?php
//saca los valores de GET
$queLiteralStr   = str_replace(":", " ", $_GET['que']);   //here 'que' and 'donde' come as STRINGS with ':' as delimiters between words, delimeter is changed to " "
$dondeLiteralStr = str_replace(":", " ", $_GET['donde']); //here 'que' and 'donde' come as STRINGS with ':' as delimiters between words, delimeter is changed to " "
//str_replace("world","Peter","Hello world!");   produces "Hello Peter!"


//When searching, use a percentMatch() ; que % de los tsquery de los buscaQues
//machea con los tsquery de los profileQues


//barbero -> barbero   +   moca -> moca
//If pattern does not contain percent signs or underscore, then the pattern only represents the string itself;
//in that case LIKE acts like the equals operator
$queries['literalBoth'] = 
			"SELECT array_to_json(media_foto_url), micro_empre_id 
			FROM micro_empre
			WHERE '$queLiteralStr'  iLIKE  ANY(que)
			AND '$dondeLiteralStr'  iLIKE  ANY(donde)";
/*
SELECT queasrows.media_foto_url, queasrows.micro_empre_id, losque, losdonde  
FROM       ( SELECT micro_empre_id, unnest (que)   losque,   media_foto_url FROM micro_empre ) queasrows
INNER JOIN ( SELECT micro_empre_id, unnest (donde) losdonde, media_foto_url FROM micro_empre ) dondeasrows
ON queasrows.micro_empre_id = dondeasrows.micro_empre_id
WHERE losque = 'barbero' AND losdonde = 'moca';
*/



//barbero -> barbero
//If pattern does not contain percent signs or underscore, then the pattern only represents the string itself;
//in that case LIKE acts like the equals operator
$queries['literalQue'] = "SELECT array_to_json(media_foto_url), micro_empre_id 
			FROM micro_empre
			WHERE '$queLiteralStr' iLIKE  ANY(que)";
/*
SELECT micro_empre_id, losque, media_foto_url 
FROM(  SELECT micro_empre_id, unnest (que) losque, media_foto_url FROM micro_empre ) queasrows
WHERE losque = 'barbero';
*/



//moca -> moca
//If pattern does not contain percent signs or underscore, then the pattern only represents the string itself;
//in that case LIKE acts like the equals operator
$queries['literalDonde'] = "SELECT array_to_json(media_foto_url), micro_empre_id 
			FROM micro_empre
			WHERE '$dondeLiteralStr' iLIKE  ANY(donde)";
/*
SELECT micro_empre_id, losdonde, media_foto_url  
FROM (  SELECT micro_empre_id, unnest (donde) losdonde, media_foto_url FROM micro_empre ) dondeasrows
WHERE losdonde = 'moca';
*/







//barber -> los barbero s, la barberia   +   junco -> juncos, maya -> mayaguez, baya -> bayamon, kiss -> kissimmee
//to not repeat literals ... add to where    AND losque NOT iLIKE '$queLiteralStr' AND losdonde NOT iLIKE '$dondeLiteralStr'
$queries['embeddedBoth'] = "SELECT array_to_json(queasrows.media_foto_url), queasrows.micro_empre_id, COUNT(losque) cuentaenlosque
   FROM ( SELECT micro_empre_id, unnest (que) losque, media_foto_url FROM micro_empre ) queasrows
   INNER JOIN
	    ( SELECT micro_empre_id, unnest (donde) losdonde, media_foto_url FROM micro_empre ) dondeasrows
   ON queasrows.micro_empre_id = dondeasrows.micro_empre_id
   WHERE losque iLIKE '%$queLiteralStr%' 
   AND losdonde  iLIKE '%$dondeLiteralStr%'
   GROUP BY queasrows.media_foto_url, queasrows.micro_empre_id
   ORDER BY cuentaenlosque DESC";
/*
$queries[2] = "SELECT media_foto_url, micro_empre_id
			FROM  (SELECT media_foto_url, micro_empre_id, unnest (que) losque, unnest (donde) losdonde FROM micro_empre) queasrows
			el select de arriba produce macheos parciales, por eso se hace el join en el query de arriba
			WHERE losque iLIKE '%$queLiteralStr%'
			AND losdonde iLIKE '%$dondeLiteralStr%'";
*/

//barber -> los barberos, la barberia      eria -> panaderia, heladeria, barberia
//to not repeat literals ... ad to where    AND losque NOT iLIKE '$queLiteralStr'       was using    WHERE losque iLIKE '%$queLiteralStr%'  AND losque != '$queLiteralStr'
$queries['embeddedQue'] = "SELECT array_to_json(media_foto_url), micro_empre_id, COUNT(losque) cuentaenlosque
			FROM  (SELECT micro_empre_id, unnest (que) losque, media_foto_url FROM micro_empre) queasrows
			WHERE to_tsvector(losque) @@ to_tsquery('$queLiteralStr')
			GROUP BY media_foto_url, micro_empre_id
			ORDER BY cuentaenlosque DESC";

//junco -> juncos, maya -> mayaguez, baya -> bayamon, kiss -> kissimmee
//to not repeat literals ... ad to where     AND losdonde NOT iLIKE '$dondeLiteralStr'
$queries['embeddedDonde'] = "SELECT array_to_json(media_foto_url), micro_empre_id
			FROM  (SELECT micro_empre_id, unnest (donde) losdonde, media_foto_url FROM micro_empre) dondeasrows
			WHERE losdonde iLIKE '%$dondeLiteralStr%'
			";



//busca mode
//because of js (buscas algo); they cant both be 0
if(strlen($queLiteralStr) == 0 && strlen($dondeLiteralStr) >  0) $buscaMode = 'buscaDonde';
elseif(strlen($queLiteralStr) >  0 && strlen($dondeLiteralStr) == 0) $buscaMode = 'buscaQue';
elseif(strlen($queLiteralStr) >  0 && strlen($dondeLiteralStr) >  0) $buscaMode = 'buscaBoth';
else ; // sholud not get here ; throw warning


//select queries to be used based on $buscaMode
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

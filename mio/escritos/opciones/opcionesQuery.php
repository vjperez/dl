<?php
//saca los valores de GET
$queLiteralStr   = str_replace(":", " | ", $_GET['que']);   //here 'que' and 'donde' come as STRINGS with ':' as delimiters between words, delimeter is changed to " "
$dondeLiteralStr = str_replace(":", " | ", $_GET['donde']); //here 'que' and 'donde' come as STRINGS with ':' as delimiters between words, delimeter is changed to " "
//str_replace("world","Peter","Hello world!");   produces "Hello Peter!"


$queryBoth = "SELECT array_to_json(media_foto_url), micro_empre_id, ts_rank_cd(nombre_que_vector, que_query) + ts_rank_cd(donde_vector, donde_query) AS ranqueo
FROM micro_empre, to_tsquery('spanish', '$queLiteralStr') que_query,  to_tsquery('simple', '$dondeLiteralStr') donde_query
WHERE que_query @@ nombre_que_vector AND donde_query @@ donde_vector 
ORDER BY ranqueo DESC
";



$queryQue = "SELECT array_to_json(media_foto_url), micro_empre_id, ts_rank_cd(nombre_que_vector, el_query) AS ranqueo
FROM micro_empre, to_tsquery('spanish', '$queLiteralStr') el_query
WHERE el_query @@ nombre_que_vector
ORDER BY ranqueo DESC
";
	
$queryDonde = "SELECT array_to_json(media_foto_url), micro_empre_id, ts_rank_cd(donde_vector, el_query) AS ranqueo
FROM micro_empre, to_tsquery('simple', '$dondeLiteralStr') el_query
WHERE el_query @@ donde_vector
ORDER BY ranqueo DESC
";	


if(strlen($queLiteralStr) == 0 && strlen($dondeLiteralStr) >  0) $buscaMode = 'buscaDonde';
elseif(strlen($queLiteralStr) >  0 && strlen($dondeLiteralStr) == 0) $buscaMode = 'buscaQue';
elseif(strlen($queLiteralStr) >  0 && strlen($dondeLiteralStr) >  0) $buscaMode = 'buscaBoth';
else throw new Exception('No tengo un Busca Mode, en opcionesQuery.php.'); // sholud not get here ; throw warning

//select query to be used based on $buscaMode
switch($buscaMode){
	case 'buscaQue':
		$query = $queryQue;
		break;
	case 'buscaDonde':
	  $query = $queryDonde;
		break;
	case 'buscaBoth':
	  $query = $queryBoth;
		break;
}
?>

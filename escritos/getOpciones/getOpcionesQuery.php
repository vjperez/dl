<?php
//saca los valores de GET
$queLiteralStr   = str_replace("%", ":* | ", $_GET['que'])   . ':*';   //here 'que' and 'donde' come as STRINGS with ':' as delimiters between words, delimeter is changed to " | ", an OR for ts query     :* means begins with on a ts query, add it to every word not just the last as would be if only added on the switch below 
$dondeLiteralStr = str_replace("%", ":* | ", $_GET['donde']) . ':*';   //here 'que' and 'donde' come as STRINGS with ':' as delimiters between words, delimeter is changed to " | ", an OR for ts query.    :* means begins with on a ts query, add it to every word not just the last as would be if only added on the switch below
//str_replace("world","Peter","Hello world!");   produces "Hello Peter!"


//define buscaMode
if(strlen($queLiteralStr) == strlen(':*') && strlen($dondeLiteralStr) >  strlen(':*'))     $buscaMode = 'buscaDonde';
elseif(strlen($queLiteralStr) >  strlen(':*') && strlen($dondeLiteralStr) == strlen(':*')) $buscaMode = 'buscaQue';
elseif(strlen($queLiteralStr) >  strlen(':*') && strlen($dondeLiteralStr) >  strlen(':*')) $buscaMode = 'buscaBoth';
else throw new Exception('No tengo un Busca Mode, en getOpcionesQuery.php : ' . __FILE__ ); // sholud not get here ; throw warning

//select query to be used based on $buscaMode
//switch structure is not necessary, $query could be built inside above if/elseif structure
//but maybe this is clearer ... maybe not
switch($buscaMode){
		//:* so that the last word in the query, also get the benefit of :* in the ts query
	case 'buscaQue':
		$query = "SELECT id, array_to_json(media_foto_url), ts_rank_cd(nombre_que_vector, el_query) AS ranqueo
		FROM nepe, to_tsquery('spanish', $1) el_query
		WHERE el_query @@ nombre_que_vector
		ORDER BY ranqueo DESC
		";
		pg_prepare($cnx, "preparo", $query);
		$recurso = pg_execute($cnx, "preparo", array($queLiteralStr));
		break;
	case 'buscaDonde':
		$query = "SELECT id, array_to_json(media_foto_url), ts_rank_cd(donde_vector, el_query) AS ranqueo
		FROM nepe, to_tsquery('spanish', $1) el_query
		WHERE el_query @@ donde_vector
		ORDER BY ranqueo DESC
		";
		pg_prepare($cnx, "preparo", $query);
		$recurso = pg_execute($cnx, "preparo", array($dondeLiteralStr));
		break;
	case 'buscaBoth':
		$query = "SELECT id, array_to_json(media_foto_url), ts_rank_cd(nombre_que_vector, que_query) + ts_rank_cd(donde_vector, donde_query) AS ranqueo
		FROM nepe, to_tsquery('spanish', $1) que_query,  to_tsquery('spanish', $2) donde_query
		WHERE que_query @@ nombre_que_vector AND donde_query @@ donde_vector 
		ORDER BY ranqueo DESC
		";
		pg_prepare($cnx, "preparo", $query);
		$recurso = pg_execute($cnx, "preparo", array($queLiteralStr, $dondeLiteralStr));
		break;
}
?>

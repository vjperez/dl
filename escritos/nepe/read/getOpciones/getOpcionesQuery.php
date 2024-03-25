<?php
//saca los valores de GET
//see cleanedStr() on funciones to see how values are received... they are already trimmed
$queStr   = $_GET['que'];
$dondeStr = $_GET['donde'];

//define buscaMode
if(    strlen($queStr) == strlen('') && strlen($dondeStr) >  strlen('')) $buscaMode = 'buscaDonde';
elseif(strlen($queStr) >  strlen('') && strlen($dondeStr) == strlen('')) $buscaMode = 'buscaQue';
elseif(strlen($queStr) >  strlen('') && strlen($dondeStr) >  strlen('')) $buscaMode = 'buscaBoth';
// should not get here because of cleanedStr() on funciones and check at busca js; throw exception
else   throw new Exception('No tengo un Busca Mode, en getOpcionesQuery.php : ' . __FILE__ ); 
     
//delimeter is changed to " | ", OR for ts_query     
// :* means begins with on a ts_query, specifies a prefix matching, 
// added it to every word including the last 
//str_replace("world","Peter","Hello world!");   produces "Hello Peter!"
$queStr   = str_replace(" ", ":* | ", $_GET['que'])   . ':*'; 
$dondeStr = str_replace(" ", ":* | ", $_GET['donde']) . ':*';   



//select query to be used based on $buscaMode
//switch structure is not necessary, $query could be built inside above if/elseif structure
//but maybe this is clearer ... maybe not
switch($buscaMode){
	case 'buscaQue':
		$query = "SELECT 
			nepe_que.nepe_id
		FROM
		(
		SELECT id,  ts_rank_cd(que_vector, el_query) AS ranqueo
		FROM que, to_tsquery('spanish', unaccent($1)) el_query
		WHERE el_query @@ que_vector 
		ORDER BY ranqueo DESC
		) queIds
		INNER JOIN nepe_que 
			ON  queIds.id = nepe_que.que_id";
		
		pg_prepare($cnx, "preparo", $query);
		$recurso = pg_execute($cnx, "preparo", array($queStr));
		break;
	case 'buscaDonde':
		$query = "SELECT 
			nepe_donde.nepe_id
		FROM
		(
		SELECT id,  ts_rank_cd(donde_vector, el_query) AS ranqueo
		FROM donde, to_tsquery('spanish', unaccent($1)) el_query
		WHERE el_query @@ donde_vector 
		ORDER BY ranqueo DESC
		) dondeIds
		INNER JOIN nepe_donde 
			ON  dondeIds.id = nepe_donde.donde_id";

		pg_prepare($cnx, "preparo", $query);
		$recurso = pg_execute($cnx, "preparo", array($dondeStr));
		break;
	case 'buscaBoth':
		$query = "SELECT 
			nepe_que.nepe_id
		FROM
		(
		SELECT id, ts_rank_cd(que_vector, que_query)  AS ranqueo
		FROM que, to_tsquery('spanish', unaccent($1)) que_query
		WHERE que_query @@ que_vector
		ORDER BY ranqueo DESC
		) queIds
		INNER JOIN nepe_que 
			ON  queIds.id = nepe_que.que_id,
		(
		SELECT id, ts_rank_cd(donde_vector, donde_query) AS ranqueo
		FROM donde, to_tsquery('spanish', unaccent($2)) donde_query
		WHERE donde_query @@ donde_vector
		ORDER BY ranqueo DESC
		) dondeIds		
		INNER JOIN nepe_donde 
			ON  dondeIds.id = nepe_donde.donde_id
		WHERE nepe_que.nepe_id = nepe_donde.nepe_id";

		pg_prepare($cnx, "preparo", $query);
		$recurso = pg_execute($cnx, "preparo", array($queStr, $dondeStr));
		break;
}
?>

<?php
//saca los valores de GET
//see cleanedStr() on funciones to see how values are received... they are already trimmed
$queStr   = $_GET['que'];
$dondeStr = $_GET['donde'];

//define buscaMode
if(    strlen($queStr) == strlen('') && strlen($dondeStr) >  strlen('')) $buscaMode = 'buscaDonde';
elseif(strlen($queStr) >  strlen('') && strlen($dondeStr) == strlen('')) $buscaMode = 'buscaQue';
elseif(strlen($queStr) >  strlen('') && strlen($dondeStr) >  strlen('')) $buscaMode = 'buscaBoth';
// should not get here because of Buscas algo? check at busca js; throw exception
else   throw new Exception('No tengo un Busca Mode, en getOpcionesQuery.php : ' . __FILE__ ); 
     
//delimeter is changed to " | ", OR for ts_query     
// :* means begins with on a ts_query, specifies a prefix matching, 
// added it to every word including the last 
//str_replace("world","Peter","Hello world!");   produces "Hello Peter!"
$queStr   = str_replace(" ", ":* | ", $queStr)   . ':*'; 
$dondeStr = str_replace(" ", ":* | ", $dondeStr) . ':*';   



//select query to be used based on $buscaMode
//$query could have been built inside if/elseif structure above...
//maybe this is clearer ... maybe not
switch($buscaMode){
	case 'buscaQue':
		$query = "SELECT 
			nepe_que.nepe_id,  STRING_AGG(queIds.frase, ', '),  SUM(queIds.ranqueo)
		FROM
		(
			SELECT id,  frase, ts_rank_cd(que_vector, el_query) AS ranqueo
			FROM que, to_tsquery( 'spanish', $1 ) el_query
			WHERE el_query @@ que_vector 
			ORDER BY ranqueo DESC
		) queIds
		INNER JOIN nepe_que 
			ON  queIds.id = nepe_que.que_id
		GROUP BY  nepe_que.nepe_id
		ORDER BY SUM(queIds.ranqueo) DESC";
		
		pg_prepare($cnx, "preparo", $query);
		$recurso = pg_execute($cnx, "preparo", array($queStr));
		break;
	case 'buscaDonde':
		$query = "SELECT 
			nepe_donde.nepe_id, STRING_AGG(dondeIds.frase, ', '), SUM(dondeIds.ranqueo)
		FROM
		(
			SELECT id,  frase, ts_rank_cd(donde_vector, el_query) AS ranqueo
			FROM donde, to_tsquery( 'spanish', $1 ) el_query
			WHERE el_query @@ donde_vector 
			ORDER BY ranqueo DESC
		) dondeIds
		INNER JOIN nepe_donde 
			ON  dondeIds.id = nepe_donde.donde_id
		GROUP BY  nepe_donde.nepe_id
		ORDER BY SUM(dondeIds.ranqueo) DESC";
		
		pg_prepare($cnx, "preparo", $query);
		$recurso = pg_execute($cnx, "preparo", array($dondeStr));
		break;
	case 'buscaBoth':
		$query = "SELECT 
			nepe_que.nepe_id, STRING_AGG(distinct queIds.frase, ', '), STRING_AGG(distinct dondeIds.frase, ', '), SUM(queIds.ranqueo + dondeIds.ranqueo)
		FROM
		(
			SELECT id, frase, ts_rank_cd(que_vector, que_query)  AS ranqueo
			FROM que, to_tsquery( 'spanish', $1 ) que_query
			WHERE que_query @@ que_vector
		) queIds
		INNER JOIN nepe_que 
			ON  queIds.id = nepe_que.que_id,
		(
			SELECT id, frase, ts_rank_cd(donde_vector, donde_query) AS ranqueo
			FROM donde, to_tsquery( 'spanish', $2 ) donde_query
			WHERE donde_query @@ donde_vector
		) dondeIds		
		INNER JOIN nepe_donde 
			ON  dondeIds.id = nepe_donde.donde_id

		WHERE nepe_que.nepe_id = nepe_donde.nepe_id

		GROUP BY  nepe_que.nepe_id
		ORDER BY SUM(queIds.ranqueo + dondeIds.ranqueo) DESC";

		pg_prepare($cnx, "preparo", $query);
		$recurso = pg_execute($cnx, "preparo", array($queStr, $dondeStr));
		break;
}
?>

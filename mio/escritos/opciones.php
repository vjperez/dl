<?php
// When 'que' and 'donde' gets here they should already be clean (no blank spaces
// no weird symbols, just a to z, A to Z and 0 to 9, that's it.
// no words bigger than 10,
// ignore words smaller than 2, a vowel in every word ... thins like that.
//Do functions in getMainContent using jQuery :
//			-cleanStr() is used in the busca case on getMainContent


//saca los valores de GET
$queLiteralStr   = $_GET['que'];   //here 'que' and 'donde' are STRINGS with empty spaces as delimiters
$dondeLiteralStr = $_GET['donde'];

//busca mode
if(strlen($queLiteralStr) == 0 && strlen($dondeLiteralStr) >  0) $buscaMode = 'buscaDonde';
if(strlen($queLiteralStr) >  0 && strlen($dondeLiteralStr) == 0) $buscaMode = 'buscaQue';
if(strlen($queLiteralStr) >  0 && strlen($dondeLiteralStr) >  0) $buscaMode = 'buscaBoth';


//generar array con pares fotoSrc => id usando el database
//conecta al db
require_once 'conecta/conecta.php';
if($cnx){
	require_once 'opciones/opcionesQuery.php';
	$result = array();
	for($queryIndex = 1; $queryIndex <= 2; $queryIndex++){
		//$queries is defined in opcionesQuery.php, required above
		$query = $queries[$queryIndex];
		$recurso = pg_query($cnx, $query);
		if($recurso){
			$parIndex = 0;  // para ordenar los pares $fila[1] , $random_micro_empre_foto.  $fila 1 viene de micro_empre_id y $random_micro_empre_foto es una de las fotos de quien_foto_src ($fila[0])
			while($fila = pg_fetch_row($recurso)){
				$toLetter = array(1=>"a", 2=>"b", 3=>"c", 4=>"d", 5=>"e");
				//para lo unico q uso fila 0 o sea quien_foto_src es para saber cuantas fotos son, y sacar un random number entre 1 y ese numero
				//So, en el db podria guardar simplemente cuantas fotos tiene cada micro_empre
				$random_micro_empre_foto = $fila[1] .  $toLetter[rand(1, count(explode(',', $fila[0])))] . '.jpg';
				$result["$buscaMode"][$queryIndex][$parIndex][$fila[1]] = $random_micro_empre_foto;
				$parIndex++;
			}
		}else{
			throw new Exception('Mal query.  Sin RECURSO.  Busca Mode: ' .  $buscaMode .  '.  Indice de query: ' .  $queryIndex .  '.');
			//echo "<li>Error, pg_query con indice de query $queryIndex, no produjo un recurso para result...</li>";
		}
	}
	echo json_encode($result);
	pg_close($cnx); //maybe not needed but doesn't hurt
}


/*
not using this idea ; 'lava carro' is not necessarily related to 'lava casa' so why explode them
//explode into arrays
$queArray   = explode(' ', $queLiteralStr);
$dondeArray = explode(' ', $dondeLiteralStr);
//used to verify that i was really producing literal strings and arrays.
//echo json_encode($queLiteralStr . ' : ' . $queArray[1] . ' y ' . $dondeLiteralStr . ' : ' . $dondeArray[1]);
*/
?>

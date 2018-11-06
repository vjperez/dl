<?php
// When 'que' and 'donde' gets here they should already be clean (no blank spaces
// no weird symbols, just a to z and 0 to 9 case insensitive, that's it. 
// no words bigger than 10,
// ignore words smaller than 2, a vowel in every word ... thins like that.  Do functions in 
// getMainContent using jQuery )

//When searching, use a percentMatch() 'que' vs 'que' and 'donde' vs 'donde' 

//saca los valores de GET
$queLiteralStr = $_GET['que']; //here 'que' and 'donde' are strings with commas as delimiters
$dondeLiteralStr = $_GET['donde'];



//explode into arrays
$queArray   = explode(' ', $queLiteralStr);
$dondeArray = explode(' ', $dondeLiteralStr);
//used to verify that i was really producing literal strings and arrays. 
//echo json_encode($queLiteralStr . ' : ' . $queArray[2]);


//generar array con pares fotoSrc => id usando el database
//conecta al db
require_once 'conecta/conecta.php';
if($cnx){
	require_once 'conecta/buildQuery.php';
	$result = array(); 
	for($queryIndex = 1; $queryIndex <= 3; $queryIndex++){
		//$queries is defined in buildQuery.php, required above
		$query = $queries[$queryIndex];
		$recurso = pg_query($cnx, $query);
		if($recurso){ 					       
			while($fila = pg_fetch_row($recurso)){
				$toLetter = array(1=>"a", 2=>"b", 3=>"c", 4=>"d", 5=>"e");
				$random_micro_empre_foto = 'imagenes/profile/bob30' . $fila[1] .  $toLetter[rand(1, count(explode(',', $fila[0])))] . '.jpg'; 
				$result[$queryIndex][$random_micro_empre_foto] = $fila[1];
			}
		}else{
			echo "<li>Error, pg_query con indice de query $queryIndex, no produjo un recurso para result...</li>";
		}
	}
	echo json_encode($result);
	pg_close($cnx); //maybe not needed but doesn't hurt
}
?>
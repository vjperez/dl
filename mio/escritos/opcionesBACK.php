<?php
//generar array con pares fotoSrc => id usando el database
//conecta al db
require_once 'conecta/conecta.php';
//i am sure i have a connection, because an exception was NOT thrown at conecta

require_once 'opciones/opcionesQuery.php';
$result = array();  //array con pares fotoSrc => id
for($queryIndex = 1; $queryIndex <= 2; $queryIndex++){
	//$queries is defined in opcionesQuery.php, required above
	$query = $queries[$queryIndex];
	$recurso = pg_query($cnx, $query);
	if($recurso){
		$parIndex = 0;  // para ordenar los pares $fila[1] , $random_micro_empre_foto.  $fila 1 viene de micro_empre_id y $random_micro_empre_foto es una de las fotos de media_foto_url ($fila[0])
		while($fila = pg_fetch_row($recurso)){
			//para lo unico q uso fila 0 o sea media_foto_url es para saber cuantas fotos son, y sacar un random number entre 0 y ese numero-1
			//So, en el db podria guardar simplemente cuantas fotos tiene cada micro_empre
			$fotos = json_decode($fila[0]);
			$randomIndex = rand(0, -1 + count($fotos));
			$random_micro_empre_foto = $fotos[$randomIndex];
			//$random_micro_empre_foto = $fila[1] .  $toLetter[rand(1, count(explode(',', $fila[0])))] . '.jpg'; not needed, complete name is on db
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



/*
not using this idea ; 'lava carro' is not necessarily related to 'lava casa'  ot to 'pinto carros' so why explode them
//explode into arrays
$queArray   = explode(' ', $queLiteralStr);
$dondeArray = explode(' ', $dondeLiteralStr);
//used to verify that i was really producing literal strings and arrays.
//echo json_encode($queLiteralStr . ' : ' . $queArray[1] . ' y ' . $dondeLiteralStr . ' : ' . $dondeArray[1]);
*/
?>

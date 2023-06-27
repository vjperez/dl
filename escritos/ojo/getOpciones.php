<?php
//genera array con pares NePeId : randomNepeFoto usando el database indexados por $parIndex y por $buscaMode (4d array !?)
//y lo envia usando json_encode.


//conecta al db
require_once 'conecta/conecta.php';
//i am sure i have a connection, because an exception was NOT thrown at conecta

require_once 'getOpciones/getOpcionesQuery.php';

	if($recurso){
		$result = array();  //array con pares
		$parIndex = 0;  // para ordenar los pares $fila[0] , $randomNepeFoto.  
						// $fila 0 viene de nepe_id y $randomNepeFoto es una de las fotos de media_foto_url 
		while($fila = pg_fetch_row($recurso)){
			$nepeId = $fila[0];
			
			//para lo unico q uso fila 1 o sea media_foto_url es para saber cuantas fotos son, y sacar un random number entre 0 y ese numero-1
			//So, en el db podria guardar simplemente cuantas fotos tiene cada micro_empre
			// hum maybe pero tendrias q construir el filename de la foto on the fly
			$fotos = json_decode($fila[1]);  // todas las fotos de un nepe changed from json to php array
			$randomIndex = rand(0, -1 + count($fotos));
			$randomNepeFoto = $fotos[$randomIndex];
			
			$result['opciones']["$buscaMode"][$parIndex][$nepeId] = $randomNepeFoto;
			$parIndex++;
		}
		$result['cuantasOpciones'] = $parIndex;
		pg_close($cnx); 
		echo json_encode($result);
	}else{
		pg_close($cnx); //maybe not needed but doesn't hurt
		throw new Exception('Mal query.  Sin RECURSO en getOpciones.php : ' . __FILE__ . '.  Busca Mode: ' .  $buscaMode  .  '.');
	}
?>

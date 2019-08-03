<?php
//generar array con pares fotoSrc => id usando el database
//conecta al db
require_once 'conecta/conecta.php';
//i am sure i have a connection, because an exception was NOT thrown at conecta

require_once 'opciones/opcionesQuery.php';
$result = array();  //array con pares fotoSrc => id

	$recurso = pg_query($cnx, $query);
	if($recurso){
		$parIndex = 0;  // para ordenar los pares $fila[1] , $randomMicroEmpreFoto.  $fila 1 viene de micro_empre_id y $randomMicroEmpreFoto es una de las fotos de media_foto_url ($fila[0])
		while($fila = pg_fetch_row($recurso)){
			//para lo unico q uso fila 0 o sea media_foto_url es para saber cuantas fotos son, y sacar un random number entre 0 y ese numero-1
			//So, en el db podria guardar simplemente cuantas fotos tiene cada micro_empre
			$fotos = json_decode($fila[0]);
			$randomIndex = rand(0, -1 + count($fotos));
			$randomMicroEmpreFoto = $fotos[$randomIndex];
			
			$nepeId = $fila[1];
			$result["$buscaMode"][$parIndex][$nepeId] = $randomMicroEmpreFoto;
			$parIndex++;
		}
	}else{
		throw new Exception('Mal query.  Sin RECURSO.  Busca Mode: ' .  $buscaMode  .  '.');
	}

echo json_encode($result);
pg_close($cnx); //maybe not needed but doesn't hurt
?>

<?php
//genera array con pares NePeId : randomNepeFoto usando el database indexados por $parIndex y por $buscaMode (4d array !?)
//y lo envia usando json_encode.


//conecta al db
require_once '../../conecta/conecta.php';
require_once 'getFoto/getFotosQuery.php';
require_once 'getFoto/getFotos.php';
//i am sure i have a connection, because an exception was NOT thrown at conecta

require_once 'getOpciones/getOpcionesQuery.php';

	if($recurso){
		$result = array();
		while($fila = pg_fetch_row($recurso)){
			$nepe_id = $fila[0];
			
			// para lo unico q uso $fotos es para saber cuantas fotos son, 
			// y sacar un random number entre 0 y ese numero-1
			// So, en el db podria guardar simplemente cuantas fotos tiene cada nepe
			// hum maybe pero tendrias q construir el filename de la foto on the fly
			// fotos is an array with urls, obtained from required files
			$fotos = getFotos($cnx, $nepe_id);
			$randomIndex = rand(0, -1 + count($fotos));
			$randomNepeFoto = $fotos[$randomIndex];

      if( strpos($buscaMode, 'buscaBoth') !== false ){   //if(  str_contains($buscaMode, 'buscaBoth')  ){
				$queDondeTag = $fila[1] . " + " . $fila[2];
				$ranqueoDeNepe = $fila[3];
				array_push( $result, array("nepeId"=>$nepe_id,  "fotoUrl"=>$randomNepeFoto, "queDondeTag"=>$queDondeTag, "ranqueoDeNepe"=>$ranqueoDeNepe ) );
			}else{
				$queDondeTag = $fila[1];
				$ranqueoDeNepe = $fila[2];
				array_push( $result, array("nepeId"=>$nepe_id,  "fotoUrl"=>$randomNepeFoto, "queDondeTag"=>$queDondeTag, "ranqueoDeNepe"=>$ranqueoDeNepe ) );				
			}
		}
		pg_close($cnx); 
		echo json_encode($result);
	}else{
		pg_close($cnx); //maybe not needed but doesn't hurt
		throw new Exception('Mal query.  Sin RECURSO en getOpciones.php : ' . __FILE__ . '.  Busca Mode: ' .  $buscaMode  .  '.');
	}
?>

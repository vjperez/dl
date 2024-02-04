<?php 
//conecta al db
require_once  MAQUINA_PATH . SITE_PATH_APPEND  . 'escritos/conecta/conecta.php';
//i am sure i have a connection, because an exception was NOT thrown at conecta

require_once 'getRecentNepes/getRecentNepesQuery.php';
$recurso = pg_execute($cnx, "preparadoQueryGetRecentNepes", array(INTERVALO_DIAS) );

if($recurso){
	$nepes = array();
    $index = 0;
    while($nepe = pg_fetch_row($recurso) ){
		$nepeId = json_decode($nepe[0]);
		$randomNepeFoto;
        
		require_once 'getFoto/getFotoQuery.php';
		$recurso = pg_execute($cnx, "preparadoQueryGetFoto", array($nepeId));
		if($recurso){
			$fotos = array();
			$fotoIndex = 0;
			while($foto = pg_fetch_row($recurso)) {
				$fotos[$fotoIndex] = $foto[0];    
				$fotoIndex++;
			}
			$randomIndex = rand(0, -1 + count($fotos));
			$randomNepeFoto = $fotos[$randomIndex];
		}else{
		    pg_close($cnx); 
			throw new Exception('Mal query.  Sin RECURSO para preparadoQueryGetFoto en: ' . __FILE__  );	
		}
		$nepes[$index]['nepeId'] = $nepeId;
		$nepes[$index]['nepeNombre'] = $nepe[1];
		$nepes[$index]['dias'] = json_decode($nepe[2]);
		$nepes[$index]['nepeFotoName'] = $randomNepeFoto;
		$index++;
    }
    pg_close($cnx);
    echo json_encode($nepes);
}else{
    pg_close($cnx);
    throw new Exception('Mal query.  Sin RECURSO para preparadoQueryGetRecentNepes en: ' . __FILE__  );
}
?>

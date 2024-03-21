<?php 
//require_once '../../configConstants/constants.php';
//conecta al db
//require_once  MAQUINA_PATH . SITE_PATH_APPEND  . 'escritos/conecta/conecta.php';
require_once  '../../conecta/conecta.php';
//i am sure i have a connection, because an exception was NOT thrown at conecta
define("INTERVALO_DIAS", 30);

require_once 'getRecentNepes/getRecentNepesQuery.php';
$recurso = pg_execute($cnx, "preparadoQueryGetRecentNepes" , array( INTERVALO_DIAS ));

if($recurso){
	$nepes = array();
    $index = 0;
    while($nepe = pg_fetch_row($recurso) ){
		$nepe_id = json_decode($nepe[0]);
		$nepes[$index]['nepeId'] = $nepe_id;
		$nepes[$index]['nepeNombre'] = $nepe[1];
		$nepes[$index]['dias'] = json_decode($nepe[2]);
		// fotos is an array with urls, obtained from next required files
    require_once 'getFoto/getFotosQuery.php';
    require_once 'getFoto/getFotos.php';
    $randomIndex = rand(0, -1 + count($fotos));
    $randomNepeFoto = $fotos[$randomIndex];
    $nepes[$index]['nepeFotoName'] = $randomNepeFoto;
    // /////////////////   fotos   //////////////////////////////
		$index++;
    }
    pg_close($cnx);
    echo json_encode($nepes);
}else{
    pg_close($cnx);
    throw new Exception('Mal query.  Sin RECURSO para preparadoQueryGetRecentNepes en: ' . __FILE__  );
}
?>

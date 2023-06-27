<?php 
//conecta al db
require_once 'conecta/conecta.php';
//i am sure i have a connection, because an exception was NOT thrown at conecta

require_once 'getRecentNepes/getRecentNepesQuery.php';
$recurso = pg_query($cnx, $getRecentNepesQuery);

if($recurso){
	$nepe =  array();
	$nepes = array();
    $index = 0;
    while($nepe = pg_fetch_row($recurso) ){
        //deal with random foto first
        $fotos = json_decode($nepe[2]);  // todas las fotos de un nepe changed from json to php array
        $randomIndex = rand(0, -1 + count($fotos));
        $randomNepeFoto = $fotos[$randomIndex];
        //foto to put as fotoName has been chosen
        $nepes[$index]['nepeId'] = json_decode($nepe[0]);
        $nepes[$index]['nepeNombre'] = $nepe[1];
        $nepes[$index]['nepeFotoName'] = $randomNepeFoto;
        $nepes[$index]['dias'] = json_decode($nepe[3]);
        $index++;
    }
    pg_close($cnx);
    echo json_encode($nepes);
}else{
    pg_close($cnx); //maybe not needed but doesn't hurt
    throw new Exception('Mal query.  Sin RECURSO en: ' . __FILE__  );
}
?>

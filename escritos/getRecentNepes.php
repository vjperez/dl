<?php 
//conecta al db
require_once 'conecta/conecta.php';
//i am sure i have a connection, because an exception was NOT thrown at conecta

require_once 'getRecentNepes/getRecentNepesQuery.php';
$empresa =  array();
$empresas = array();
$recurso = pg_query($cnx, $getRecentNepesQuery);
if($recurso){
    $index = 0;
    while($empresa = pg_fetch_row($recurso) ){
        //deal with random foto first
        $fotos = json_decode($empresa[2]);  // todas las fotos de un nepe changed from json to php array
        $randomIndex = rand(0, -1 + count($fotos));
        $randomNepeFoto = $fotos[$randomIndex];
        //foto to put as fotoName has been chosen
        $empresas[$index]['nepeId'] = json_decode($empresa[0]);
        $empresas[$index]['nepeNombre'] = $empresa[1];
        $empresas[$index]['nepeFotoName'] = $randomNepeFoto;
        $empresas[$index]['dias'] = json_decode($empresa[3]);
        $index++;
    }
    pg_close($cnx);
    echo json_encode($empresas);
}else{
    pg_close($cnx); //maybe not needed but doesn't hurt
    throw new Exception('Mal query.  Sin RECURSO en: ' . __FILE__  );
}
?>

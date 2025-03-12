<?php
session_start();
if( isset($_SESSION['dueno_id']) && isset($_SESSION['own_nepes_with_ids']) ){
    $dueno_id = $_SESSION['dueno_id'];
    //saca los valores de POST
    $nombre = $_POST['nombre'];
    $cuando = $_POST['cuando'];

    $su_casa_str = $_POST['suCasa'];
    if(      0 === strcmp($su_casa_str , 'si')){
      $su_casa = 't';// value that postgreSQL undestands
    }elseif( 0 === strcmp($su_casa_str , 'no')){
      $su_casa = 'f';// value that postgreSQL undestands.  //PHP undestands false, but tries to insert '' into Postgresql which causes an error
    }else{
      $su_casa = null;// value that postgreSQL undestands
    }
    
    $desde_casa_str = $_POST['desdeCasa'];
    if(      0 === strcmp($desde_casa_str , 'si')){
      $desde_casa = 't';// value that postgreSQL undestands
    }elseif( 0 === strcmp($desde_casa_str , 'no')){
      $desde_casa = 'f';// value that postgreSQL undestands
      //PHP undestands false, but tries to insert '' into Postgresql which causes an error
    }else{
      $desde_casa = null;// value that postgreSQL undestands
    }
    // i already have the post values
    require_once 'crea/insert/insertNepe.php';
	
}else{
	throw new Exception('Session dueno_id o own_nepes_with_ids, no seteada en: ' . __FILE__  );
}
?>

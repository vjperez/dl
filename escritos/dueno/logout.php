<?php
    session_start();
    unset($_SESSION['dueno_id']);
    unset($_SESSION['own_nepes_with_ids']);
    unset($_SESSION['updating_nepe_index']);

    if( isset($_SESSION['dueno_id']) ){
      $isSetStr = '{"duenoIsSet":true}';
    }else{
      $isSetStr = '{"duenoIsSet":false}';
    }
    
    $respuesta = json_decode( $isSetStr );
    
    echo json_encode($respuesta);
?>
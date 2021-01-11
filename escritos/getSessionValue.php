<?php
    session_start();
    
    $key = $_GET['key'];
    //$value = false;
    //if(isset($_SESSION[$key]))   { $value = $_SESSION[$key]; }
    //$respuesta = json_decode('{"valor":' + $value + '}');
    $valorSession = json_decode( $_SESSION[$key] );
    echo json_encode( $valorSession );
?>
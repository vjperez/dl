<?php
    session_start();
    
    $key = $_GET['key'];
    
    if(isset($_SESSION[$key]))   { $value = $_SESSION[$key]; }
    else                         { $value = null; }
    $respuesta = json_decode('{"valorSession":' + $value + '}');
    echo json_encode( $respuesta );
?>
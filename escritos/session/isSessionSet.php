<?php
    session_start();

    $key = $_GET['key'];
    if(isset($_SESSION[$key])){
        $respuesta = json_decode('{"isSet":true}');
    }else{
        $respuesta = json_decode('{"isSet":false}');
    }
    echo json_encode($respuesta);
?>
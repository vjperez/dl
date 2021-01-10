<?php
    $key = $_GET['key'];
    //$value = false;
    //if(isset($_SESSION[$key]))   { $value = $_SESSION[$key]; }
    //$respuesta = json_decode('{"valor":' + $value + '}');
    $respuesta = json_decode('{"valor":' + $_SESSION['dueno_id'] + '}');
    echo json_encode($respuesta);
?>
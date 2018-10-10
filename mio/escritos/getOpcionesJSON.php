<?php
//saca los valores de GET
$que = $_GET['que'];
$quien = $_GET['donde'];

//generar array con pares profileLink => fotoSrc usando el database


//tengo que devolver un array con pares profileLink => fotoSrc
$opciones = array("profile.html" => "imagenes/bob200.jpeg");
echo json_encode($opciones);
?>

<?php
//This ui test assumes that after quering the DB with values 'que'
//and 'donde' the response is the array $opciones

//To see test, put path of this file on getMainContent.js on the opciones 'case' section.
//Then reload portada.html page directly or by going back to busca look and hitting search button.

//saca los valores de GET
$que = $_GET['que'];
$quien = $_GET['donde'];

//generar array con pares fotoSrc => id usando el database


//tengo que devolver un array con pares fotoSrc => id
$opciones = array("imagenes/profile/bob303b.jpg" => 3);
echo json_encode($opciones);
?>

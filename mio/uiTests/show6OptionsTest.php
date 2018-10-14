<?php
//This ui test assumes that after quering the DB with values 'que'
//and 'donde' the response is the array $opciones

//To see test, put path of this file, 'uiTests/show6OptionsTest.php', on getMainContent.js on the opciones 'case' section.
//Then reload portada.html with a look=opciones, or go back to busca look and search with any parameters(the test ignore them).
//The option will be properly displayed only if image is available on images/profile.
//Will link to an existing profile only if it is available at 06ProfilesDB.json.

//saca los valores de GET
//$que = $_GET['que'];
//$quien = $_GET['donde'];

//generar array con pares fotoSrc => id usando el database


//tengo que devolver un array con pares fotoSrc => id
$opciones = array("imagenes/profile/bob302c.jpg" => 2, "imagenes/profile/bob303a.jpg" => 3, "imagenes/profile/bob301e.jpg" => 1, 
                  "imagenes/profile/bob305a.jpg" => 5, "imagenes/profile/bob306b.jpg" => 6, "imagenes/profile/bob304d.jpg" => 4);
echo json_encode($opciones);
?>

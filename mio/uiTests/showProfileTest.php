<?php
//In this ui test 06ProfileDB-missingPics.json represents data on a database. It is a JSON file that 
//will be read and decoded as the PHP variable $db.  PHP will use the $db variable  representing the database
// together with id comming as a GET parameter to return data of the requested option, the
//one with the matching id.

//To see test, put path, 'uiTests/show15RandomOptionsTest.php', on getMainContent.js on the opciones 'case' section.
//Then reload portada.html with a look=opciones, or go back to busca look and search with any parameters(the test ignore them).
//Profile will be properly displayed only if images required are available on images/profile.
//Will display profiles available at 06ProfileDB-missingPics.json.

$dbJSON = file_get_contents('06ProfilesDB.json');
$db = json_decode($dbJSON); 
// the data is now a PHP object
// the JSON file is improperly formed and won't decode correctly into PHP
// if you use the concept of associative array in your JSON file.
// Seems obvious .... NOW

//saca los valores de GET
$id = $_GET['id'];


//generar la opcion deseada
$opcion = $db[ -1+$id ]; // off by one - my JSON data starts counting from id=1, but PHP obvously at 0

//devuelve la opcion deseada as JSON 
echo json_encode($opcion);
?>

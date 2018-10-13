<?php
//This ui test assumes that after quering the DB with values 'que'
//and 'donde' the response is the array $opciones

//To see test, put path of this file, 'uiTests/show15RandomOptionsTest.php', on getMainContent.js on the opciones 'case' section.
//Then reload portada.html with a look=opciones, or go back to busca look and search with any parameters(the test ignore them).
//The option will be properly displayed only if image is available on images/profile.
//Will link to an existing profile only if it is available at 06ProfileDB-missingPics.json.
//Note that 06ProfileDB-missingPics.json provides 6 profiles, that's why a random id is selected between 1 and 6.
//Also $numberOfPics reflect the pics provided on 06ProfileDB-missingPics.json.

//saca los valores de GET
//$que = $_GET['que'];
//$quien = $_GET['donde'];

//generar array con pares fotoSrc => id usando el database







//tengo que devolver un array con pares fotoSrc => id
//Select randomly 12 options (images that link to the profile of service providers (with diferent id) )
//Since there are 15 images and they are the key into the opciones array, that is the maximum number
//of options. It is likely that the same key (image) will be selected more than once but only included
//1 time in the opciones array, which will produce less than 15 options.


//provider id   		number of pics provided
//1					5
//2					3
//3					2
//4					4
//5					1
//6					2
$numberOfPics = array(1=>5, 2=>3, 3=>2, 4=>4, 5=>1, 6=>2);
$toLetter = array(1=>"a", 2=>"b", 3=>"c", 4=>"d", 5=>"e");
$opciones = array();
for($i=0; $i<15; $i++){
	$randomId = rand(1, 6);
	$randomLetter = $toLetter[ rand(1, $numberOfPics[$randomId]) ];
	$fotoSrc = 'imagenes/profile/bob30' . $randomId . $randomLetter . '.jpg';
	$opciones[$fotoSrc] = $randomId;
}
//$opciones = array("imagenes/profile/bob302c.jpg" => 2, "imagenes/profile/bob303a.jpg" => 3, "imagenes/profile/bob301e.jpg" => 1, 
//                  "imagenes/profile/bob305a.jpg" => 5, "imagenes/profile/bob306b.jpg" => 6, "imagenes/profile/bob304d.jpg" => 4);
echo json_encode($opciones);
?>

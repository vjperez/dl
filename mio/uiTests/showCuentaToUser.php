<?php
//This ui test assumes that a user is trying to log in. User is quering the DB with values 'user'
//and 'pass', the response is the array $userDatos with user data if user is successfully logged. 
//Otherwise $userDatos will contain an "id" of -1.  Response will be sent in JSON format.
//'user' and 'pass' data appears on 06usersDB.json.

//To see test, put path of this file, 'uiTests/showCuentaToUser.php', on getMainContent.js on the micuenta 'case' section.
//Then reload portada.html with a look=micuenta, or go back to login look and try to log in.


//saca los valores de POST
$user = $_POST['user'];
$pass = $_POST['pass'];

//lee 06usersDB.json y decide si logueas o no
$usersJSON = file_get_contents('06usersDB.json');
$usersDB = json_decode($usersJSON);
//try to match user and pass with data on $usersDB
$index;
for($index=0; $index < count($usersDB) ;$index++){
  if($user == $usersDB[$index]->user && $pass == $usersDB[$index]->pass ) break;
}

if($index < count($usersDB)){
  //lee 06ProfilesDB.json y busca datos para usuario con el index donde se encontro un match
  $profilesJSON = file_get_contents('06ProfilesDB.json');
  $profilesDB = json_decode($profilesJSON);
  $userDatos = $profilesDB[$index]; 
}else{
  //$userDatos = array("id"=>-1)         // is there a diference with the code below ?!
  $userDatos = json_decode( '{"id":-1}' );  	
}
echo json_encode($userDatos);
?>

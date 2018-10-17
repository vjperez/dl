<?php
//This ui test assumes that a user is trying to see his account data. User is quering the DB with value 'id'.
//The response is the array $userDatos with user data. 
//Response will be sent in JSON format.
//User data appears on 06ProfilesDB.json.

//To see test, put path of this file, 'uiTests/showCuentaToUser.php', on getMainContent.js on the micuenta 'case' section.
//Then reload portada.html with a look=micuenta, or go back to login look and try to log in.


//saca los valores de POST
$id = $_POST['id'];

//lee 06ProfilesDB.json y busca datos para usuario con el index donde se encontro un match
$profilesJSON = file_get_contents('06ProfilesDB.json');
$profilesDB = json_decode($profilesJSON);
  
$index = $id -1;  
if($index < count($profilesDB)){
  $userDatos = $profilesDB[$index]; 
}else{
  // CODE should never get here when trying to login
  //here you should create new empty profile,  with id = id on 06ProfilesDB.json
  //and add user with id = id on 06usersDB.json
  $userDatos = json_decode( '{}' );  	
}
echo json_encode($userDatos);
?>

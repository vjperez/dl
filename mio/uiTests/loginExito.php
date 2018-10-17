<?php
//This ui test assumes that a user is trying to log in. User is quering the DB with values 'user'
//and 'pass', the response will be in JSON format.  It will contain '{"log":true}', if user is
//appears on 06usersDB.json. Otherwise it will contain '{"log":false}'.  
//'user' and 'pass' data appears on 06usersDB.json.

//To see test, put path of this file, 'uiTests/loginExito.php', on getMainContent.js on the login 'case' section.
//Then go back to login look and try to log in.


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
  $id = 1 + $index;
  $response = json_decode('{"log":true, "id":' . $id . '}'); 
}else{
  //$response = array("id"=>false)         // is there a diference with the code below ?!
  $response = json_decode( '{"log":false}' );  	
}
echo json_encode($response);
?>

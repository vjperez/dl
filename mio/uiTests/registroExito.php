<?php
//This ui test assumes that a user is trying to register. User is quering the DB with values 'usertb',
//'pass01' and 'pass02', the response will be in JSON format.  It will contain '{"register":true}',
//if a new user was created 
//Otherwise it will contain '{"register":false}'.  
//'user' and 'pass' data appears on 06usersDB.json.

//To see test, put path of this file, 'uiTests/registroExito.php', on getMainContent.js on the registro 'case' section.
//Then go back to login look and try to log in.

//PreCONDITIONS before creating a user:
//   'usertb' : 
//		does not appear on 06usersDB.json.
//		is at least 6 chars long 
//		doesn't contain empty space
//   both 'pass01' and 'pass02'
//		are equal
//		are at least 6 chars long
// 		doesn't contain empty space 
//This conditions can be tested with jQuery, the job of the server when the conditions are meet is to create
//a new user; in this case update 06usersDB.json and 06ProfilesDB.json

//saca los valores de POST
$usertb = $_POST['usertb'];
$pass01 = $_POST['pass01'];
$pass02 = $_POST['pass02'];

//lee 06usersDB.json y decide si registras o no
$usersJSON = file_get_contents('06usersDB.json');
$usersDB = json_decode($usersJSON);


//CONDITION 1
//Try to match usertb with data on $usersDB
$index;
for($index=0; $index < count($usersDB) ;$index++){
  if($usertb == $usersDB[$index]->user ) break;
}
if($index < count($usersDB)){ //username already exists
  $response = json_decode( '{"register":false}' );
}else{ // index==count(usersDB) ; username doesn't exist 
  $response json_decode( '{"register":true, "id":7}' );  //in my json simulated DB with 6 users in 06usersDB.json and 06ProfilesDB.json, id=7 is a new user	
}
echo json_encode($response);
?>

<?php
//This ui test assumes that a user is trying to register. User is quering the DB with values 'usertb',
//'pass01' and 'pass02'.  A JSON format response to the ui will contain '{"register":true, "id":7}',
//if 'usertb' is not already one of the user values on 06usersDB.json and the passwords are equal. 
//Otherwise it will contain '{"register":false}'.  


//To see test, put path of this file, 'uiTests/registroExito.php', on getMainContent.js on the registro 'case' section.
//Then go back to login look and try to log in.  

//PreCONDITIONS before creating a user:
//   'usertb' : 
//		does not appear on 06usersDB.json.  **** checked on this script ****
//		is at least 6 chars long 
//		doesn't contain empty space
//   both 'pass01' and 'pass02'
//		are equal                           **** checked on this script ****
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
if($index === count($usersDB) && $pass01 === $pass02 ){ // username doesn't exist and passwords are equal
  $response = json_decode( '{"registra":true, "id":7}' );  //in my json simulated DB with 6 users in 06usersDB.json and 06ProfilesDB.json, id=7 is a new user
  // at this point a new user should be created when implemented on a database; 
  //1)get a new id   ; simulated with id=7
  //2)insert this id, user, pass in users table. 
  //3)insert a new empty profile on profiles table  ;  simulated with empty profile using id=7
  
  }else{ //  username already exists or passwords are diferent
  $response = json_decode( '{"registra":false}' );
}
echo json_encode($response);
?>

<?php
//a 'json object' representation of "key":value pairs ; an 'ARRAY' of "key":value pairs produces null when json encoded
  $r1 = '{"uno":1, "dos":2}'; 
//a php assoc array
  $a = array("uno"=>1, "dos"=>2);
//when you json encode them the 2 vars above produce exactly the same thing

//an ARRAY of json objects ; a 'json object' representation of objects produces null when json encoded
  $r2 = '[{"uno":1}, {"dos":2}]'; 
  	

  $str1 =json_encode( json_decode($r1) );
  echo 'json from json string === ' . $str1 . "\n";
 
  $str2 =json_encode( $a );
  echo 'json from array ===       ' . $str2 . "\n";
  
  $str3 =json_encode( json_decode($r2) );
  echo 'json from object of object json string === ' . $str3;
?>
<?php

$clave = "abcd";
echo '<br>el md5 de ' . $clave . ' es: ' . md5($clave) . '<br>';




// Generate a hash of the password "mypassword"
$hash = password_hash($clave, PASSWORD_DEFAULT);
 
// Echoing it out, so we can see it:
echo '<br>el password hash de ' . $clave . ' es: ' . $hash . '<br>';
 
// Some line breaks for a cleaner output:
echo "<br><br>";
 
// Using password_verify() to check if $clave matches the hash.
// Try changing $clave below to something else and then refresh the page.
if (password_verify('abcdef', $hash)) {
    echo 'Password es valido!';
} else {
    echo 'Invalido password.';
}

?>
<?php
$servidor = 'localhost';
$usuario = 'victordbu';
$clave = 'kt';

try{
    $cnx = new PDO("mysql:host=$servidor", $usuario, $clave);
    // set the PDO error mode to exception
    $cnx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "CREATE DATABASE cwdc";
    $cnx->exec($sql);
    echo "<br> Database fue creada.";
}catch(PDOException $exc){
    echo "<br> Error fue: <br>" . $exc->getMessage(); 
}
$cnx = null;
?>
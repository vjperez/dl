<?php
$servidor = "localhost";
$usuario = "victordbu";
$clave = "kt";
$eldb = "cwdc";

try{
    $cnx = new PDO("mysql:host=$servidor;dbname=$eldb", $usuario, $clave);
    $cnx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql =  "DROP TABLE entrada";
    $cnx->exec($sql);

    echo "<br>Tabla dropeada.<br>";
}catch(PDOException $exc){
    echo "<br> Error fue: <br> " . $exc->getMessage();
}
$cnx = null;
?>
<?php
$servidor = "localhost";
$usuario = "victordbu";
$clave = "kt";
$eldb = "cwdc";

try{
    $cnx = new PDO("mysql:host=$servidor;dbname=$eldb", $usuario, $clave);
    $cnx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql =  "CREATE TABLE microEmpre(
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(30) NOT NULL, 
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL 
    )";
    $cnx->exec($sql);
    echo "<br>Tabla creada.<br>";
}catch(PDOException $exc){
    echo "<br> Error fue: <br> " . $exc->getMessage();
}
$cnx = null;
?>
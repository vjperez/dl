 <?php
$servidor = "localhost";
$usuario = "victordbu";
$clave = "kt";
$dbnombre = "cwdc";

try {
    $cnx = new PDO("mysql:host=$servidor;dbname=$dbnombre", $usuario, $clave);

    // set the PDO error mode to exception
    $cnx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  
    $sql = "INSERT INTO microEmpre (nombre) VALUES ('Dron Imagenes')";
    // use exec() because no results are returned
    $cnx->exec($sql);
  
    echo "Tuplo insertado at id= " . $cnx->lastInsertId() . ".";
}catch(PDOException $e){
    echo "<br> Error : (exc get message): <br>" . $e->getMessage();
    }

$conn = null;
?> 
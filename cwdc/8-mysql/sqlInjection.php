 <?php
$servidor = "localhost";
$usuario = "victordbu";
$clave = "kt";
$dbnombre = "cwdc";

try {
    $cnx = new PDO("mysql:host=$servidor;dbname=$dbnombre", $usuario, $clave);

    // set the PDO error mode to exception
    $cnx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  
    $stringWithInjectedSQL = "'lola'   ;    UPDATE microempre SET nombre = 'Claje Inyeccion Papito!' WHERE id=20  ";
    $sql = "SELECT * FROM microempre WHERE nombre = $stringWithInjectedSQL";
    // use exec() because no results are returned
    $cnx->exec($sql);
  
    echo $sql;

    
}catch(PDOException $e){
    echo "<br> Error : (exc get message): <br>" . $e->getMessage();
    }

$conn = null;
?> 
 <?php
$servidor = "localhost";
$usuario = "victordbu";
$clave = "kt";
$dbnombre = "cwdc";

try {
    $cnx = new PDO("mysql:host=$servidor;dbname=$dbnombre", $usuario, $clave);
    // set the PDO error mode to exception
    $cnx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //start transaction
    $cnx->beginTransaction();
    $sql = "INSERT INTO microEmpre (nombre) VALUES ('Social Media Guy')";
    $cnx->exec($sql);
    $sql = "INSERT INTO microEmpre (nombre) VALUES ('Video Editor Girl')";
    $cnx->exec($sql);
    $sql = "INSERT INTO microEmpre (nombre) VALUES ('Yeezy Limpio')";
    $cnx->exec($sql);
    $sql = "INSERT INTO microEmpre (nombre) VALUES ('Hospedaje and Car Cleaner')";
    $cnx->exec($sql);
    $sql = "INSERT INTO microEmpre (nombre) VALUES ('Titi Flanes')";
    $cnx->exec($sql);
    $lastId = $cnx->lastInsertId();  //  save this id before commiting transaction, after it, you cannot get it
    //commit transaction
    $cnx->commit();

    echo "Transaccion de insertar tuplos exitosa, hasta id= " . $lastId . ".";
}catch(PDOException $e){
    echo "<br> Error : (exc get message): <br>" . $e->getMessage();
    }

$conn = null;
?> 
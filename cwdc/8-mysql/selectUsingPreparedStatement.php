 <?php
$servidor = "localhost";
$usuario = "victordbu";
$clave = "kt";
$dbnombre = "cwdc";

try {
    $cnx = new PDO("mysql:host=$servidor;dbname=$dbnombre", $usuario, $clave);

    // set the PDO error mode to exception
    $cnx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  
    //prepare sql statement
    $prep_stmnt = $cnx->prepare(  "SELECT id, nombre FROM microEmpre WHERE id= :valor"  );
    //bind parameter        
    $prep_stmnt->bindParam(':valor', $var);

    $prep_stmnt->setFetchMode(PDO::FETCH_ASSOC);
    
    //use prepared statement as many time as needed; 
    //1)statement is parsed only once even when used multiple times
    //2)whole query is not transmitted to server on every execution, 
    //only the parameters are transmitted each time

    echo "<h1>Selecting a single row, multiple times, with prepared statement.</h1>";
    echo "<h3>Using fetch()</h3>";
    $var = 4;
    $prep_stmnt->execute();
    $row = $prep_stmnt->fetch();
    echo "<br>" . $prep_stmnt->rowCount() . " Tuplo(s) seleccionado.<br> id: " . $row['id'] . " nombre: " . $row['nombre'] . "<br>";

    $var = 8;
    $prep_stmnt->execute();
    $row = $prep_stmnt->fetch();
    echo "<br>" . $prep_stmnt->rowCount() . " Tuplo(s) seleccionado.<br> id: " . $row['id'] . " nombre: " . $row['nombre'] . "<br>";

}catch(PDOException $e){
    echo "<br> Error : (exc get message): <br>" . $e->getMessage();
    }

$conn = null;
?> 
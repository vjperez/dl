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
    $prep_stmnt = $cnx->prepare(  "INSERT INTO microEmpre (nombre) VALUES (:valor00)"   );
    //bind parameter        
    $prep_stmnt->bindParam(':valor00', $var);


    //use prepared statement as many time as needed; 
    //1)statement is parsed only once even when used multiple times
    //2)whole query is not transmitted to server on every execution, 
    //only the parameters are transmitted each time
    $var = "Soy Free Taxista";
    $prep_stmnt->execute();
    echo "<br>" . $prep_stmnt->rowCount() ." Tuplo(s) insertados. ";

    $var = "Scooter Renting";
    $prep_stmnt->execute();
    echo "<br>" . $prep_stmnt->rowCount() ." Tuplo(s) insertados. ";

}catch(PDOException $e){
    echo "<br> Error : (exc get message): <br>" . $e->getMessage();
    }

$conn = null;
?> 
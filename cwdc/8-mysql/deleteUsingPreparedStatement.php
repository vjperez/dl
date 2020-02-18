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
    $prep_stmnt = $cnx->prepare(  "DELETE FROM microEmpre WHERE id= :valor"   );
    //bind parameter        
    $prep_stmnt->bindParam(':valor', $var);


    //use prepared statement as many time as needed; 
    //1)statement is parsed only once even when used multiple times
    //2)whole query is not transmitted to server on every execution, 
    //only the parameters are transmitted each time
    $var = 11;
    $prep_stmnt->execute();
    echo "<br>" . $prep_stmnt->rowCount() ." Tuplos borrados. ";

    $var = 12;
    $prep_stmnt->execute();
    echo "<br>" . $prep_stmnt->rowCount() ." Tuplos borrados. ";

}catch(PDOException $e){
    echo "<br> Error : (exc get message): <br>" . $e->getMessage();
    }

$conn = null;
?> 
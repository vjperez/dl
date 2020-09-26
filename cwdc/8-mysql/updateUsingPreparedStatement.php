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
    $prep_stmnt = $cnx->prepare(  "UPDATE microEmpre SET nombre= :valor0 WHERE id= :valor1"   );
    //bind parameter        
    $prep_stmnt->bindParam(':valor0', $var0);
    $prep_stmnt->bindParam(':valor1', $var1);


    //use prepared statement as many time as needed; 
    //1)statement is parsed only once even when used multiple times
    //2)whole query is not transmitted to server on every execution, 
    //only the parameters are transmitted each time
    $var1 = 8;
    $var0 = "Otro Social Media Guy";
    $prep_stmnt->execute();
    echo "<br>" . $prep_stmnt->rowCount() ." Tuplos updeitiados.";

    $var1 = 9;
    $var0 = "Otro Video Editor";
    $prep_stmnt->execute();
    echo "<br>" . $prep_stmnt->rowCount() ." Tuplos updeitiados.";

    $var1 = 10;
    $var0 = "Otro Yeezy Limpiador";
    $prep_stmnt->execute();
    echo "<br>" . $prep_stmnt->rowCount() ." Tuplos updeitiados.";

}catch(PDOException $e){
    echo "<br> Error : (exc get message): <br>" . $e->getMessage();
    }

$conn = null;
?> 
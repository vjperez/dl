<?php
if($_GET){
    echo "el get tiene esto:  " . print_r( $_GET, true ) . '<br>';
}else{
    echo "el get tiene NADA.<br>";
}
?>

<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">

    <title>Que tal victor</title>
  </head>
  <body>
    <h3>form using GET method.</h3>
    <form>
        <label>el texto</label>
        <input type="text" name="texto">
        <input type="submit" value="sometele">
    </form>
  </body>
</html>
<?php
if($_POST){
    echo "el post tiene esto:  " . print_r( $_POST, true ) . '<br>';
}else{
    echo "el post tiene NADA.<br>";
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
    <h3>form using POST method.</h3>
    <form method="post">
        <label>el texto</label>
        <input type="text" name="texto">
        <input type="submit" value="sometele">
    </form>
  </body>
</html>
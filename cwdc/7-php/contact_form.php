<?php
if($_POST){
    echo "el post tiene esto:  " . print_r( $_POST, true ) . '<br><br><br>';
}else{
    echo "el post tiene NADA.<br><br><br>";
}
?>

<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="../../bootstrap/css/bootstrap.css">

    <title>contact form</title>
  </head>
  <body>
    
    <h3>Contactanos:</h3>
    
    <form method="post">
    <div class="form-group">
        <label for="nombre">Tu nombre</label>
        <input type="text" class="form-control" id="nombre" name="namename" placeholder="tita"
        pattern="[\w-]+" required>
        <small>Format: Letras, numeros, underscore y/o signo de menos</small> 
    </div>
    <div class="form-group">
        <label for="telefono">telefono</label>
        <input type="tel" class="form-control" id="telefono" name="telname" placeholder="787-456-7890" 
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required>
        <small>Format: 787-456-7890</small>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    </form>

      <!-- Optional JavaScript -->
      <!-- jQuery first, then Popper.js, then Bootstrap JS -->
      <script src="../../jquery/jquery.js"></script>
      <!-- <script src="../../poppermio/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>  -->
      <script src="../../bootstrap/js/bootstrap.js"></script>    
  </body>
</html>
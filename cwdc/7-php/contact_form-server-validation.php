<?php
$phpValidation = '';
if($_POST){
    $nombre      = $_POST['nombrename'];
    $telefono    = $_POST['telefononame'];
    $informacion = $_POST['informacionname'];
    $emilio      = $_POST['emilioname'];
    $nombreregexp      = "/^[\s\w\x{00E1}\x{00E9}\x{00ED}\x{00F3}\x{00FA}\x{00C1}\x{00C9}\x{00CD}\x{00D3}\x{00DA}]*[a-zA-Z\x{00E1}\x{00E9}\x{00ED}\x{00F3}\x{00FA}\x{00C1}\x{00C9}\x{00CD}\x{00D3}\x{00DA}]+[\s\w\x{00E1}\x{00E9}\x{00ED}\x{00F3}\x{00FA}\x{00C1}\x{00C9}\x{00CD}\x{00D3}\x{00DA}]*$/u";
    $telefonoregexp    = "/^[\s]*[0-9]{3}-[0-9]{3}-[0-9]{4}[\s]*$/";
    $emilioregexp      = "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/";
    $informacionregexp = "/^[:.,?=&-\[\]\(\)!@\/\s\w\x{00E1}\x{00E9}\x{00ED}\x{00F3}\x{00FA}\x{00C1}\x{00C9}\x{00CD}\x{00D3}\x{00DA}]*[a-zA-Z\x{00E1}\x{00E9}\x{00ED}\x{00F3}\x{00FA}\x{00C1}\x{00C9}\x{00CD}\x{00D3}\x{00DA}]+[:.,?=&-\[\]\(\)!@\/\s\w\x{00E1}\x{00E9}\x{00ED}\x{00F3}\x{00FA}\x{00C1}\x{00C9}\x{00CD}\x{00D3}\x{00DA}]*$/u";
    if(preg_match($nombreregexp, $nombre))           $phpValidation = $phpValidation . '<div class="alert alert-success" role="alert"> nombre: ' . $nombre . '</div>';             else $phpValidation = $phpValidation . '<div class="alert alert-danger" role="alert"> invalid nombre </div>';
    if(preg_match($telefonoregexp, $telefono))       $phpValidation = $phpValidation . '<div class="alert alert-success" role="alert"> telefono: ' . $telefono . '</div>';         else $phpValidation = $phpValidation . '<div class="alert alert-danger" role="alert"> invalid telefono </div>';
    if(preg_match($emilioregexp, $emilio))           $phpValidation = $phpValidation . '<div class="alert alert-success" role="alert"> email: ' . $emilio . '</div>';              else $phpValidation = $phpValidation . '<div class="alert alert-danger" role="alert"> invalid email </div>';
    if(preg_match($informacionregexp, $informacion)) $phpValidation = $phpValidation . '<div class="alert alert-success" role="alert"> informacion: ' . $informacion . '</div>';   else $phpValidation = $phpValidation . '<div class="alert alert-danger" role="alert"> invalid informacion </div>';    

    if(preg_match($emilioregexp, $emilio)){
      $to = "vijapefi@gmail.com";
      $subject = "Contacto";
      $txt = $informacion;
      $headers = "From: " . $emilio;
      
      if(mail($to,$subject,$txt,$headers))           $phpValidation = $phpValidation . '<div class="alert alert-success" role="alert"> email sent! </div>';   else $phpValidation = $phpValidation . '<div class="alert alert-danger" role="alert"> email not sent. </div>'; ;
    }
  }else{
   //   $phpValidation = $phpValidation . "el post tiene NADA.<br><br><br>";
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
  <div class="container mt-3">
      <?php echo $phpValidation; ?>
  </div>
  <div class="container mt-3">  
    <div class="card bg-light text-dark">
      <div class="card-header">  
          <h1>Contactanos:</h1>
      </div>
      <div class="card-body text-center">
          <form method="post" clxxxass="border border-dark">
          <div class="form-group mt-5">
              <label for="nombre" class="font-weight-bold text-info">Tu nombre</label>
              <input type="text" class="form-control" id="nombre" name="nombrename" placeholder="tita"
              pattern="^[\s\w\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA]*[a-zA-Z\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA]+[\s\w\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA]*$" maxlength="64" required>
              <small class="text-muted">Formato: Letras, numeros, y/o espacios.</small> 
          </div>
          <div class="form-group mt-5">
              <label for="telefono" class="font-weight-bold text-info">Tu Telefono</label>
              <input type="tel" class="form-control" id="telefono" name="telefononame" placeholder="787-111-1234" 
              pattern="^[\s]*[0-9]{3}-[0-9]{3}-[0-9]{4}[\s]*$" required>
              <small class="text-muted">Formato: 787-111-1234</small>
          </div>
          <div class="form-group mt-5">
              <label for="emilio" class="font-weight-bold text-info">Tu Email</label>
              <input type="email" class="form-control" id="emilio" name="emilioname" placeholder="vijapefi@gmail.com" 
              pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" required>
              <small class="text-muted">Formato: vijapefi@gmail.com</small>
          </div>

          <div class="form-group mt-5">
              <label for="informacion" class="font-weight-bold text-info">Informacion</label>
              <textarea class="form-control" id="informacion" rows="18" name="informacionname" 
              placeholder="Tu facebook, twitter, web page, instagram y/o tu email" maxlength="1000" required
              pattern="^[:.,?=&-\[\]\(\)!@\/\s\w\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA]*[a-zA-Z\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA]+[:.,?=&-\[\]\(\)!@\/\s\w\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA]*$"></textarea>
              <!-- pattern no funciona en html5 pero jQuery lo lee ; (attr pattern)-->
              <small class="text-muted">Formato: Letras, numeros, espacios, y/o   : . , ? = & - [] () ! @ /</small>
          </div>

          <button type="submit" class="btn btn-info mt-5">Submit</button>
          </form>
      </div> <!-- card body -->
    </div> <!-- card card-outline-secondary -->
  </container>  

      <!-- Optional JavaScript -->
      <!-- jQuery first, then Popper.js, then Bootstrap JS -->
      <script src="../../jquery/jquery.js"></script>
      <!-- <script src="../../poppermio/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>  -->
      <script src="../../bootstrap/js/bootstrap.js"></script>   
      
      <script>
        $(document).ready(function(){

          jQuery("input, textarea").on({
            blur:function(){
              validaElemento(this);
            },
            focus:function(){
              jQuery(this).siblings( "small" ).removeClass("font-weight-bold text-danger");
              jQuery(this).siblings( "small" ).addClass("text-muted");
            }
          });

          function validaElemento(elemento){
              let valor = jQuery(elemento).val();
              let patron = jQuery(elemento).attr('pattern');
              let esValido =  valido(patron, valor);
              console.log(valor);   console.log(patron);  console.log(esValido);
              if( ! esValido){
                jQuery(elemento).siblings( "small" ).removeClass("text-muted");
                jQuery(elemento).siblings( "small" ).addClass("font-weight-bold text-danger");
              }
              return esValido;
          }

          function valido(regexptext, string){  //el html validation le anade ^ y $ al reg exp; el js no
            let regexp = new RegExp(regexptext);            
            return regexp.test(string);
          }

          jQuery('form').submit(function(evento){
            let todoValido = true;
            jQuery("#nombre, #telefono, #emilio, #informacion").each(function(indice){
              let esteValido = validaElemento(this);
              todoValido = todoValido && esteValido;
              console.log(  jQuery(this).attr('id') + ': ' + esteValido);   
              console.log('todo: ' + todoValido);
            });
            if(todoValido){
              return
            }else{
              evento.preventDefault();
            }
          });

        });
      </script>
  </body>
</html>
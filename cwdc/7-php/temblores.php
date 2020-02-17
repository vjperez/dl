<?php
date_default_timezone_set('America/Puerto_Rico');
//  call this function to create new earthquake files, fuertes.txt and recientes.txt
function creaFiles(){
    $urlFuertes = 'https://earthquaketrack.com/';
    $urlRecientes = 'https://earthquaketrack.com/recent';
    $strFuertes = file_get_contents( $urlFuertes ); 
    $strRecientes = file_get_contents( $urlRecientes );
    $fileFuertes = fopen('fuertes.txt', 'w') or die('No se pudo crear file fuertes.txt');
    $fileRecientes = fopen('recientes.txt', 'w') or die ('No se pudo crear file recientes.txt');
    fwrite($fileFuertes, $strFuertes);
    fwrite($fileRecientes, $strRecientes);
}
//  call this function to create new earthquake files, fuertes.txt and recientes.txt
//creaFiles();

function fileToArray($urlFile){
    $tenStringsStr = file_get_contents($urlFile);
    //  '/<div[\s]*class="quake.?info.+<div[\s]*class="[\s]*pull.?left/'
    //  '/<div[\s]*class="quake.?info.+<div[\s]*class="[\s]*pull.?left.+<div[\s]*class="quiet row"[\s]*>/'
    $tenStringsArr = preg_split('/<div[\s]*class="quiet row"[\s]*>/', $tenStringsStr, 11);
    $temblores = array();
    foreach($tenStringsArr as $index => $str){
          if($index >= 1){
              preg_match('/<span[\s]*class.+>[\d]+[\.]*[\d]*.+<\/span>/', $str, $magnitudeTemblor);
              preg_match('/[\d]+[\.]*[\d]*/', $magnitudeTemblor[0], $magnitudeTemblor);
              $magnitudeTemblor = $magnitudeTemblor[0];

              preg_match('/<abbr[\s]*class.+[\s]*title="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z">/', $str, $horaTemblor);
              preg_match('/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z/', $horaTemblor[0], $horaTemblor);
              $horaTemblor = $horaTemblor[0];


              //  '/<br\/>[\s]*<a[\s]*href=".+<\/a>[\s]*,[\s]*<a[\s]*href=".+<\/a>[\s]*,[\s]*<a[\s]*href=".+<\/a>[\s]*<\/div>/'
              preg_match('/<br\/>[\s]*<a[\s]*href=".+<\/a>[\s]*(,[\s]*<a[\s]*href=".+<\/a>[\s]*)*<\/div>/', $str, $sitioTemblor);
              preg_match_all('/<a[\s]*href=".+<\/a>/', $sitioTemblor[0], $sitioTemblor);
              $sitioTemblorArr = $sitioTemblor[0]; 

              if( preg_match('/\([\s]*[\d]+[\.]*[\d]*[\s]*miles[\s]*\)/', $str, $distanciaTemblor) ){
                preg_match('/[\d]+[\.]*[\d]*[\s]*miles/', $distanciaTemblor[0], $distanciaTemblor); // pude haber removido parentesis usando algun replace
                $distanciaTemblor = $distanciaTemblor[0];
              }else{
                $distanciaTemblor = '<span class="text-danger">No Sabemos !</span>';
              }

              preg_match('/<p>Depth:[\s]*[\d]+[\.]*[\d]*[\s]*km[\s]*<\/p>/', $str, $profundidadTemblor);
              preg_match('/Depth:[\s]*[\d]+[\.]*[\d]*[\s]*km[\s]*/', $profundidadTemblor[0], $profundidadTemblor);
              $profundidadTemblor = $profundidadTemblor[0];

              $temblores[$index]['magnitude'] = $magnitudeTemblor;
              $temblores[$index]['hora'] =   date("l jS \of F Y", strtotime($horaTemblor)) . ' at: ' . date("h:i:s A", strtotime($horaTemblor));
              $temblores[$index]['sitioArr'] = $sitioTemblorArr;
              $temblores[$index]['distancia'] = $distanciaTemblor;
              $temblores[$index]['profundidad'] = $profundidadTemblor;
          }
    }
    return $temblores;
  }


function echoArray($temblores){
    for($i=1; $i <= 10; $i++){ 
          echo '<br><br><br>';
          echo 'Temblor ' . $i . ': <br>' .
               'magnitud : ' . '<span class="text-danger font-weight-bold">' . $temblores[$i]['magnitude'] . '</span>' . '<br>' .
               'hora : ' . '<span class="text-info font-weight-bold">'. $temblores[$i]['hora'] . '</span>' .  '<br>' ;
          echo 'sitio: ' . $temblores[$i]['sitioArr'][0];
               for($j=1; $j < count($temblores[$i]['sitioArr']); $j++){ 
                 echo ', ' . $temblores[$i]['sitioArr'][$j];
               }
               echo '<br>';
          echo 'distancia : ' . $temblores[$i]['distancia']  .  '<br>' .
               'profundidad : ' . $temblores[$i]['profundidad'] . '<br>';
    }
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

    <title>Temblores</title>
  </head>
  <body>
      <div class="container my-3">
        <h1 class="text-info">Temblores</h1>
        <p id='fecha'></p>
        <p id='hora'></p>
      </div>

      <div class="container my-5 border">
        <div class="container my-3 border">
            <h3 class="">Recientes</h3>

            <?php
              $urlFile = 'recientes.txt';
              echoArray(fileToArray($urlFile));
            ?>

        </div>
        <div class="container my-3 border">
            <h3 class="">Los mas fuertes</h3>
            <small>mas de 3, ultimas 24 horas</small>

            <?php
              $urlFile = 'fuertes.txt';
              echoArray(fileToArray($urlFile));
            ?>

        </div>
      </div>

      <!-- Optional JavaScript -->
      <!-- jQuery first, then Popper.js, then Bootstrap JS -->
      <script src="../../jquery/jquery.js"></script>
      <!-- <script src="../../poppermio/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>  -->
      <script src="../../bootstrap/js/bootstrap.js"></script>

      <script type='text/javascript'>
        let laFecha = new Date(Date.now());
        const options01 = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'};
        const options02 = { hour: '2-digit', minute: '2-digit', hourCycle: 'h12'};
        jQuery('p[id=fecha]').text( laFecha.toLocaleDateString('es-MX', options01) );
        jQuery('p[id=hora]').text( laFecha.toLocaleTimeString('es-MX', options02) );
      </script>
    </body>
</html>
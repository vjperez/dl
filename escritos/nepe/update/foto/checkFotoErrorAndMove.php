<?php
$files_to_skip = array();
$phpFileUploadErrors = array(
  0 => 'There is no error, the file uploaded with success',
  1 => 'The uploaded file exceeds the upload_max_filesize directive in php.ini',
  2 => 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form',
  3 => 'The uploaded file was only partially uploaded',
  4 => 'No file was uploaded',
  6 => 'Missing a temporary folder',
  7 => 'Failed to write file to disk.',
  8 => 'A PHP extension stopped the file upload.',
  );
for($indice = 0; $indice < count($_FILES['fotoArr']['tmp_name']); $indice++){
    /////////////////////////////////////////////////////////////////
    $error_value = $_FILES['fotoArr']['error'][$indice];
    if($error_value > 0) {
      $error_texto = 'Skiping file:' . $indice . ':' . $phpFileUploadErrors[$error_value];
      $files_to_skip[$indice] = $error_texto;
      //when you get one of these errors above, 
      //$tempo_name = $_FILES['fotoArr']['tmp_name'] below, will be empty.
      //To avoid trying to use its value just go to next file
      continue;
    }else{
      $files_to_skip[$indice] = '';
    }
    
    /////////////////////////////////////////////////////////////////
    $tempo_name = $_FILES['fotoArr']['tmp_name'][$indice];
    if(!is_uploaded_file($tempo_name)){ // si el file no es uploaded file
      $error_texto = 'Skiping file:' . $indice . ':' . $tempo_name . ' no es un uploaded file.';
      $files_to_skip[$indice] = $files_to_skip[$indice]  .  $error_texto;
    }else{
      $files_to_skip[$indice] = $files_to_skip[$indice]  .  '' ;
    }
    
    /////////////////////////////////////////////////////////////////
    //returns false when $tempo_name is not an image, 
    //returns an array with image info otherwise (was printed on elseif)
    $es_imagen = getimagesize($tempo_name); 
    $no_es_imagen = ! $es_imagen;
    if( $no_es_imagen ){
        $error_texto = 'Skiping file:' . $indice . ':' . $tempo_name . ' segun getimagesize(), NO es una imagen!, Tipo: ' . $_FILES['fotoArr']['type'][$indice];
        $files_to_skip[$indice] = $files_to_skip[$indice] . '::' . $error_texto;
    }elseif( 0 === stripos($es_imagen['mime'],  'image')   &&   strpos($_FILES['fotoArr']['type'][$indice], 'image') === 0 ){
        //if $error_texto has been added for this file
        if( strlen($files_to_skip[$indice]) > strlen('') ){
            $error_texto = 'Skiping file:' . $indice . ':' . $tempo_name . ', es imagen, tipo:' . $_FILES['fotoArr']['type'][$indice] . ', pero parece ser not uploaded.';
            $files_to_skip[$indice] = $files_to_skip[$indice] . '::' . $error_texto;
        }else{
            //image and ... no $error_texto has been added for this file
            $files_to_skip[$indice] = $files_to_skip[$indice] . '' ;
            //$urls_prox_index is initialized with returned array
            $urls_prox_index = queryGetOrInsertUrlsAndProxIndice($cnx, $nepe_id);
            $urls_array_ondb = $urls_prox_index['urls'];
            $prox_indice_ondb = $urls_prox_index['prox_indice'];
            //naming filename 
            $toLetter = array(0=>"a", 1=>"b", 2=>"c", 3=>"d", 4=>"e", 5=>"f", 6=>"g", 7=>"h");
            $tipo = str_replace("image/", "", $_FILES['fotoArr']['type'][$indice]);  //convierte 'mime/png' en 'png'
            $filename = $nepe_id . $toLetter[$prox_indice_ondb] . '.' . $tipo;
                
            if( array_key_exists( $prox_indice_ondb, $urls_array_ondb) ) backPossibleExistingImage( $filename, $fotos_subidas_dir );
            moveImage($indice, $_FILES['fotoArr'], $filename, $fotos_subidas_dir);
            if( array_key_exists( $prox_indice_ondb, $urls_array_ondb) ) erasePossibleBackedImage( $filename, $fotos_subidas_dir);
            //the previous array_key_exists must be done before, the next query update
            $filename_ondb = $toLetter[$prox_indice_ondb] . '.' . $tipo;
            $urls_array_ondb[$prox_indice_ondb] = $filename_ondb;
            $prox_indice_ondb = (1 + $prox_indice_ondb) % count($toLetter);
            queryUpdateUrlsAndProxIndice( $cnx, $nepe_id, implode(',', $urls_array_ondb), $prox_indice_ondb );
        }		
    }
}

/////////////////////////////////////////////////////////////////
//print_r($files_to_skip);
$respuesta->filesToSkip = $files_to_skip;
//$respuesta = json_decode('{"actualizado":true, "feedback":"Nepe actualizado, incluyendo fotos.", "nepeId":' . $nepe_id . '}');
//pg_close($cnx);
//echo json_encode ($respuesta);
$respuesta->fotoUpdated = true;
?>

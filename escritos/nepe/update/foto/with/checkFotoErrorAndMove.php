<?php
for($indice = 0; $indice < count($_FILES['fotoArr']['tmp_name']); $indice++){
	$files_to_skip = array();
	
	/////////////////////////////////////////////////////////////////
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
	$error_value = $_FILES['fotoArr']['error'][$indice];
	if($error_value > 0) {
		$error_texto = $phpFileUploadErrors[$error_value];
		$files_to_skip[$indice] = $error_texto;
	}else{
		$files_to_skip[$indice] = '';
	}
	
	/////////////////////////////////////////////////////////////////
	$tempo_name = $_FILES['fotoArr']['tmp_name'][$indice];
	if(!is_uploaded_file($tempo_name)){ // si el file no es uploaded file
		$error_texto = $tempo_name . ' no es un uploaded file.';
		$files_to_skip[$indice] = $files_to_skip[$indice] . '::' . $error_texto;
	}else{
		$files_to_skip[$indice] = $files_to_skip[$indice] . '' ;
	}
	
	/////////////////////////////////////////////////////////////////
	//returns false when $tempo_name is not an image, 
	//returns an array with image info otherwise (was printed on elseif)
	$es_imagen = getimagesize($tempo_name); 
	$no_es_imagen = ! $es_imagen;
	if( $no_es_imagen ){
		$error_texto = $tempo_name . ' segun getimagesize(), NO es una imagen!, Tipo: ' . $_FILES['fotoArr']['type'][$indice];
		$files_to_skip[$indice] = $files_to_skip[$indice] . '::' . $error_texto;
	}elseif( 0 === stripos($es_imagen['mime'],  'image')   &&   strpos($_FILES['fotoArr']['type'][$indice], 'image') === 0 ){
		$files_to_skip[$indice] = $files_to_skip[$indice] . '';
		
		$urlsYProxIndex = array();
		if( strlen($files_to_skip[$indice]) === strlen('') ){
			$urlsYProxIndex = queryGetOrInsertFotoUrls($cnx, $nepe_id);
			$urlsArray = $urlsYProxIndex['urls'];
			$prox_indice_db = $urlsYProxIndex['prox_indice'];
					
			$toLetter = array(0=>"a", 1=>"b", 2=>"c", 3=>"d", 4=>"e", 5=>"f", 5=>"g", 7=>"h");
			$tipo = str_replace("image/", "", $_FILES['fotoArr']['type'][$indice]);  //convierte 'mime/png' en 'png'
			$filename = $nepe_id . $toLetter[$prox_indice_db] . '.' . $tipo;
					
			if( array_key_exists( $prox_indice_db, $urlsArray) ) backPossibleExistingImage( $urlsArray[$prox_indice_db], $fotos_subidas_dir );
			moveImage($indice, $_FILES['fotoArr'], $filename, $fotos_subidas_dir);
			if( array_key_exists( $prox_indice_db, $urlsArray) ) erasePossibleBackedImage( $urlsArray[$prox_indice_db], $fotos_subidas_dir);
			
			$urlsArray[$prox_indice_db] = $filename;
			$prox_indice_db = (1 + $prox_indice_db) % count($toLetter);
			queryUpdateUrlsAndProxIndice( $cnx, $nepe_id, implode(',', $urlsArray), $prox_indice_db );
		}		
	}
	
	/////////////////////////////////////////////////////////////////
	echo '<br>';
	print_r($files_to_skip);
}
?>

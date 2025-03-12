<?php
//are there errors loading any of the files ?
foreach ($_FILES['fotoArr']['error'] as $key => $error) {
	if($error > 0){
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
		throw new Exception('Error subiendo foto. Foto: ' . $key . '  Codigo: ' . $error . '.    Mensaje (Razon): ' . $phpFileUploadErrors[$error] .  ' en '  .  __FILE__ );
	}
}


//is any of the uploaded files targeting a system file ? ; @ suppresses errors
//is any of the uploaded files NOT an image ? ; @ suppresses errors
foreach ($_FILES['fotoArr']['tmp_name'] as $key => $tmpn) {
	if(!is_uploaded_file($tmpn)){ // si el file no es uploaded file
		echo print_r( $_FILES['fotoArr'] );
		throw new Exception('Error subiendo foto. Foto: ' . $key . '.  Esta NO es uploaded file!, tmp_name es: ' . $tmpn .  '.  En '  .  __FILE__ );
	}

	//returns false when $tmpn is not an image, 
	//returns an array with image info otherwise (was printed on elseif)
	$es_imagen = getimagesize($tmpn); 
	$no_es_imagen = ! $es_imagen;
	//echo 'es imagen: [' . $es_imagen . ']';
	//echo ' ! es imagen: [' .  $no_es_imagen . ']';
	if( $no_es_imagen ){
		echo print_r( $_FILES['fotoArr'] );
		throw new Exception('Error subiendo foto. Foto: ' . $key . '.  Esta file, segun getimagesize($tmpn), NO es una imagen!, tmp_name es: ' . $tmpn . ', tipo de file es: ' . $_FILES['fotoArr']['type'][$key] .  '.  En '  . __FILE__ );
	}elseif(stripos($es_imagen['mime'],  'image') === 0   &&   strpos($_FILES['fotoArr']['type'][$key], 'image') === 0){
		//print_r( $es_imagen ); // [mime] => image/jpeg
		//echo '$_FILES[fotoArr][type]  :' . $_FILES['fotoArr']['type'][$key]; // 
	}	
}


/*
//creando no haria falta borrar...
//erase all pic with same $foto = $fotos_subidas_dir . $nepe_id 
require_once '../configConstants/constants.php';
$fotoTargetPath = $fotos_subidas_dir . $nepe_id . '[abcde].*';
$targets = glob( $fotoTargetPath );
foreach($targets as $fotoToErase){
	if(file_exists ($fotoToErase)) unlink($fotoToErase);
}
*/


$fotoFilenameArray = array();
//can we move the files successly ?
foreach ($_FILES['fotoArr']['tmp_name'] as $key => $tmpn) {	
	$toLetter = array(0=>"a", 1=>"b", 2=>"c", 3=>"d", 4=>"e");
	//$tipo = str_replace("image/", "", getimagesize($tmpn)['mime']);  //convierte 'mime/png' en 'png'
	$tipo = str_replace("image/", "", $_FILES['fotoArr']['type'][$key]);  //convierte 'mime/png' en 'png'
	$filename = $nepe_id . $toLetter[$key] . '.' . $tipo;

	$fotoFullPath = $fotos_subidas_dir . $filename;  // filesystem path
	if(!move_uploaded_file($tmpn, $fotoFullPath )){ // si el file no se pudo mover
		throw new Exception('Error moviendo foto. Foto: ' . $key . '.  No se pudo mover la imagen!, tmp_name es: ' . $tmpn . '.' . ' En ' . __FILE__ );
	}
	//building $fotoFilenameArray
	array_push( $fotoFilenameArray, $filename );
}
?>
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
		throw new Exception('Error subiendo foto. Foto: ' . $key . '  Codigo: ' . $error . '.    Mensaje (Razon): ' . $phpFileUploadErrors[$error] . ' en ' . __FILE__ );
	}
}


//is any of the uploaded files targeting a system file ? ; @ suppresses errors
//is any of the uploaded files NOT an image ? ; @ suppresses errors
foreach ($_FILES['fotoArr']['tmp_name'] as $key => $tmpn) {
	if(!is_uploaded_file($tmpn)){ // si el file no es uploaded file
		throw new Exception('Error subiendo foto. Foto: ' . $key . '.  Esta NO es uploaded file!, tmp_name es: ' . $tmpn . '.' . ' En ' . __FILE__ );
	}
	/*
	//inspecting getimagesize() array response ; curiosity and debugging
	foreach (getimagesize($tmpn) as $key => $value) {
		echo $key . ':' . $value . ' ';
		//example of response when argument IS an image ; response contains WARNING INVALID ARGUMENT... when $tmpn is not an image
		// 0:32  1:32  2:3  3:width="32" height="32"  bits:8  mime:image/png
	}
	*/
	if( stripos(getimagesize($tmpn)['mime'],  'image') !== 0 ) { // si getimagesize no devuelve 'image/blahblah' en la posicion cero del index 'mime'
		throw new Exception('Error subiendo foto. Foto: ' . $key . '.  Esta file, segun getimagesize($tmpn), NO es una imagen!, tmp_name es: ' . $tmpn . ', tipo de file es: ' . $_FILES['fotoArr']['type'][$key] . '.' . ' En ' . __FILE__ );
	}
}


$mediaFotoUrlPosgreArray = '';
//can we move the files successly ?
foreach ($_FILES['fotoArr']['tmp_name'] as $key => $tmpn) {	
	require_once 'configConstants/constants.php';
	$toLetter = array(0=>"a", 1=>"b", 2=>"c", 3=>"d", 4=>"e");
	//$tipo = str_replace("image/", "", getimagesize($tmpn)['mime']);  //convierte 'mime/png' en 'png'
	$tipo = str_replace("image/", "", $_FILES['fotoArr']['type'][$key]);  //convierte 'mime/png' en 'png'
	$foto = $fotos_subidas_dir . $nepe_id . $toLetter[$key] . '.' . $tipo;  // filesystem path
   
	if(!move_uploaded_file($tmpn, $foto )){ // si el file no se pudo mover
		throw new Exception('Error moviendo foto. Foto: ' . $key . '.  No se pudo mover la imagen!, tmp_name es: ' . $tmpn . '.' . ' En ' . __FILE__ );
	}
	//building $mediaFotoUrlPosgreArray
	if($key > 0) $mediaFotoUrlPosgreArray = $mediaFotoUrlPosgreArray . ',';
	$mediaFotoUrlPosgreArray = $mediaFotoUrlPosgreArray . $nepe_id . $toLetter[$key] . '.' . $tipo;
}
$mediaFotoUrlPosgreArray = '{' . $mediaFotoUrlPosgreArray . '}';


?>

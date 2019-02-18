<?php

foreach ($_FILES['fotoArr']['error'] as $key => $error) {
	if($error > 0){
		throw new Exception('Error subiendo foto. Foto: ' . $key . '  Codigo: ' . $error . '.');
	}
}



//if there are no foto errors, prepare to move the images
require_once 'configConstants/constants.php';
$fotos_subidas_dir = MAQUINA_PATH . SITE_PATH_APPEND . '\\imagenes\\profile\\subidas\\';
?>

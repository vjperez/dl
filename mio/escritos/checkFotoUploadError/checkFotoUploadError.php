<?php
if($_FILES['foto1']['error'] > 0){
	throw new Exception('Error subiendo foto. Codigo:' . $_FILES['foto1']['error'] . '.');
}




//if there are no foto errors, prepare to move the images
require_once 'configConstants/constants.php';
$fotos_subidas_dir = MAQUINA_PATH . SITE_PATH_APPEND . '\\imagenes\\profile\\subidas\\';
?>

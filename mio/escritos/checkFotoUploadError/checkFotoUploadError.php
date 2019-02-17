<?php
if($_FILES['foto1']['error'] > 0){
	throw new Exception('Error subiendo foto. Codigo:' . $_FILES['foto1']['error'] . '.');
}
?>

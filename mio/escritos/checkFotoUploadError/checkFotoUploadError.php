<?php
if($_FILES['foto1']['error'] > 0){
	echo json_encode ($_FILES['foto1']['error']);
}
?>
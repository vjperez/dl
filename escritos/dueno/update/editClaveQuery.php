<?php
$queryEditClave = "UPDATE 
	dueno
SET clave = $1
WHERE id = $2";

pg_prepare($cnx, "preparadoQueryEditClave", $queryEditClave);
?>

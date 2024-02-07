<?php
//update clave using id
$queryClave = "UPDATE 
	dueno
SET clave = $1
WHERE id = $2";

pg_prepare($cnx, "preparadoQueryClave", $queryClave);
?>

<?php
$queryEditDuenoPassword = "UPDATE 
	dueno
SET password = $1
WHERE id = $2";

pg_prepare($cnx, "preparadoQueryEditDuenoPassword", $queryEditDuenoPassword);
?>

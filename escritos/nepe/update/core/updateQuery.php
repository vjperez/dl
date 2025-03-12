<?php
//updates nepe core parts
$queryUpdateNepe = "UPDATE nepe SET
 	nombre=$2, cuando=$3, su_casa=$4, desde_casa=$5, revisado=NOW()::date
	WHERE id=$1";
pg_prepare($cnx, "preparadoQueryUpdateNepe", $queryUpdateNepe);
?>